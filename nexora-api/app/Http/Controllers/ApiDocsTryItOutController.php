<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ApiDocsTryItOutController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'method' => ['required', 'string', 'in:GET,POST,PUT,PATCH,DELETE'],
            'url' => ['required', 'string', 'starts_with:/api/'],
            'data' => ['nullable'],
        ]);

        $method = strtoupper($validated['method']);
        $url = $validated['url'];
        $payload = $validated['data'] ?? null;

        $content = in_array($method, ['GET', 'DELETE'], true)
            ? null
            : json_encode($payload ?? [], JSON_THROW_ON_ERROR);

        $server = [
            'HTTP_ACCEPT' => 'application/json',
            'CONTENT_TYPE' => 'application/json',
        ];

        $subRequest = Request::create(
            $url,
            $method,
            [],
            $request->cookies->all(),
            [],
            $server,
            $content
        );

        $subRequest->setUserResolver(fn () => $request->user());
        $subRequest->setLaravelSession($request->session());

        $response = Route::dispatch($subRequest);
        $status = $response->getStatusCode();
        $body = $response->getContent();
        $decodedBody = json_decode($body, true);

        return response()->json([
            'status' => $status,
            'statusText' => SymfonyResponse::$statusTexts[$status] ?? '',
            'data' => $this->normalizeResponseData(
                json_last_error() === JSON_ERROR_NONE ? $decodedBody : $body,
                $status
            ),
            'headers' => $response->headers->all(),
        ]);
    }

    /**
     * @param mixed $data
     * @return mixed
     */
    private function normalizeResponseData(mixed $data, int $status): mixed
    {
        if (! is_array($data) || ! isset($data['message'])) {
            return $data;
        }

        $message = $this->shortenModelNamespace((string) $data['message']);

        if ($status === 404 || array_key_exists('exception', $data)) {
            return ['message' => $message];
        }

        $data['message'] = $message;

        return $data;
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
