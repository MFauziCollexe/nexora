<?php

namespace App\Http\Middleware;

use App\Models\ApiActivityLog;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class RecordApiActivity
{
    public function handle(Request $request, Closure $next): Response
    {
        $request->attributes->set('api_activity_started_at', microtime(true));

        $response = $next($request);

        $this->record($request, $response);

        return $response;
    }

    private function record(Request $request, Response $response): void
    {
        if (! $request->is('api/*')) {
            return;
        }

        try {
            $user = $request->user();
            $startedAt = (float) $request->attributes->get('api_activity_started_at', microtime(true));

            ApiActivityLog::create([
                'user_id' => $user?->id,
                'user_name' => $user?->name ?? ($user ? null : 'guest'),
                'method' => strtoupper($request->method()),
                'endpoint' => '/'.$request->path(),
                'route_name' => $request->route()?->getName(),
                'status_code' => $response->getStatusCode(),
                'ip_address' => $request->ip(),
                'response_time_ms' => max(0, (int) round((microtime(true) - $startedAt) * 1000)),
                'user_agent' => $request->userAgent(),
                'request_payload' => $this->safeRequestPayload($request),
                'response_payload' => $this->safeResponsePayload($response),
            ]);
        } catch (Throwable) {
            report(new \RuntimeException('Failed to record API activity log.'));
        }
    }

    /**
     * @return array<string, mixed>|null
     */
    private function safeRequestPayload(Request $request): ?array
    {
        $payload = $request->except([
            'password',
            'password_confirmation',
            'current_password',
            'token',
            'access_token',
        ]);

        return $payload === [] ? null : $payload;
    }

    /**
     * @return mixed
     */
    private function safeResponsePayload(Response $response): mixed
    {
        $content = $response->getContent();

        if (! is_string($content) || $content === '') {
            return null;
        }

        $decoded = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return null;
        }

        if (is_array($decoded)) {
            unset($decoded['access_token'], $decoded['token']);

            if (isset($decoded['user']) && is_array($decoded['user'])) {
                unset($decoded['user']['password'], $decoded['user']['remember_token']);
            }

            if (isset($decoded['message']) && is_string($decoded['message'])) {
                $decoded['message'] = $this->shortenModelNamespace($decoded['message']);

                if ($response->getStatusCode() === 404 || array_key_exists('exception', $decoded)) {
                    return ['message' => $decoded['message']];
                }
            }
        }

        return $decoded;
    }

    private function shortenModelNamespace(string $message): string
    {
        $message = preg_replace_callback('/\[([A-Za-z_\\\\][A-Za-z0-9_\\\\]*)\]/', function (array $matches) {
            $segments = explode('\\', $matches[1]);

            return '['.end($segments).']';
        }, $message) ?? $message;

        if (str_starts_with($message, 'No query results for model') && ! str_ends_with($message, '.')) {
            return $message.'.';
        }

        return $message;
    }
}
