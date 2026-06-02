<?php

namespace App\Http\Controllers;

use App\Models\ApiActivityLog;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ApiActivityLogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $logs = $this->query($request)
            ->latest('created_at')
            ->paginate(10)
            ->through(fn (ApiActivityLog $log) => $this->transform($log));

        return response()->json([
            'data' => $logs->items(),
            'meta' => [
                'current_page' => $logs->currentPage(),
                'from' => $logs->firstItem(),
                'last_page' => $logs->lastPage(),
                'per_page' => $logs->perPage(),
                'to' => $logs->lastItem(),
                'total' => $logs->total(),
            ],
            'filters' => [
                'methods' => ApiActivityLog::query()->distinct()->orderBy('method')->pluck('method')->values(),
                'statuses' => ApiActivityLog::query()->distinct()->orderBy('status_code')->pluck('status_code')->values(),
                'users' => ApiActivityLog::query()
                    ->whereNotNull('user_name')
                    ->distinct()
                    ->orderBy('user_name')
                    ->pluck('user_name')
                    ->values(),
            ],
        ]);
    }

    public function show(ApiActivityLog $apiActivityLog): JsonResponse
    {
        return response()->json([
            'data' => $this->transform($apiActivityLog, detailed: true),
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $filename = 'api-activity-logs-'.now()->format('Ymd-His').'.csv';

        return response()->streamDownload(function () use ($request) {
            $output = fopen('php://output', 'w');
            fputcsv($output, ['Time', 'User', 'Method', 'Endpoint', 'Status', 'IP Address', 'Response Time', 'User Agent']);

            $this->query($request)
                ->latest('created_at')
                ->limit(1000)
                ->each(function (ApiActivityLog $log) use ($output) {
                    fputcsv($output, [
                        optional($log->created_at)->format('Y-m-d H:i:s'),
                        $log->user_name ?? 'guest',
                        $log->method,
                        $log->endpoint,
                        $log->status_code,
                        $log->ip_address,
                        $log->response_time_ms.' ms',
                        $log->user_agent,
                    ]);
                });

            fclose($output);
        }, $filename, [
            'Content-Type' => 'text/csv',
        ]);
    }

    private function query(Request $request): Builder
    {
        return ApiActivityLog::query()
            ->when($request->filled('from'), fn (Builder $query) => $query->whereDate('created_at', '>=', (string) $request->string('from')))
            ->when($request->filled('to'), fn (Builder $query) => $query->whereDate('created_at', '<=', (string) $request->string('to')))
            ->when($request->filled('method'), fn (Builder $query) => $query->where('method', (string) $request->string('method')))
            ->when($request->filled('status'), fn (Builder $query) => $query->where('status_code', $request->integer('status')))
            ->when($request->filled('user'), fn (Builder $query) => $query->where('user_name', (string) $request->string('user')))
            ->when($request->filled('search'), function (Builder $query) use ($request) {
                $search = '%'.(string) $request->string('search').'%';

                $query->where(function (Builder $query) use ($search) {
                    $query
                        ->where('endpoint', 'like', $search)
                        ->orWhere('ip_address', 'like', $search)
                        ->orWhere('user_name', 'like', $search)
                        ->orWhere('user_agent', 'like', $search);
                });
            });
    }

    /**
     * @return array<string, mixed>
     */
    private function transform(ApiActivityLog $log, bool $detailed = false): array
    {
        $data = [
            'id' => $log->id,
            'time' => optional($log->created_at)->format('Y-m-d H:i:s'),
            'user' => $log->user_name ?? 'guest',
            'method' => $log->method,
            'endpoint' => $log->endpoint,
            'status' => $log->status_code,
            'ip_address' => $log->ip_address,
            'response_time' => $log->response_time_ms,
            'user_agent' => $log->user_agent,
            'route_name' => $log->route_name,
        ];

        if ($detailed) {
            $data['request_payload'] = $log->request_payload;
            $data['response_payload'] = $log->response_payload;
        }

        return $data;
    }
}
