<?php

namespace App\Domains\Auth\Controllers;

use App\Domains\Auth\Requests\ApiTokenRequest;
use App\Domains\Auth\Requests\ForgotPasswordRequest;
use App\Domains\Auth\Requests\LoginRequest;
use App\Domains\Auth\Requests\RegisterRequest;
use App\Domains\Auth\Requests\ResetPasswordRequest;
use App\Domains\Auth\Services\AuthService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Info(version: '1.0.0', title: 'Nexora API')]
#[OA\Server(url: '/api/v1', description: 'API v1')]
#[OA\SecurityScheme(
    securityScheme: 'bearerAuth',
    type: 'http',
    description: 'Use a Sanctum token in the format: Bearer {token}',
    bearerFormat: 'Sanctum',
    scheme: 'bearer'
)]
class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService,
    ) {}

    #[OA\Post(
        path: '/auth/register',
        tags: ['Auth'],
        summary: 'Register',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name', 'email', 'password', 'password_confirmation'],
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'Demo User'),
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'demo@nexora.com'),
                    new OA\Property(property: 'password', type: 'string', format: 'password', example: 'password123'),
                    new OA\Property(property: 'password_confirmation', type: 'string', format: 'password', example: 'password123'),
                    new OA\Property(property: 'device_name', type: 'string', example: 'mobile-app'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Registered', content: new OA\JsonContent(ref: '#/components/schemas/AuthTokenResponse')),
            new OA\Response(response: 422, description: 'Validation error'),
        ]
    )]
    public function register(RegisterRequest $request): JsonResponse
    {
        return response()->json(
            $this->authService->register($request->validated()),
            201
        );
    }

    #[OA\Post(
        path: '/auth/login',
        tags: ['Auth'],
        summary: 'Login',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email', 'password'],
                properties: [
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'demo@nexora.com'),
                    new OA\Property(property: 'password', type: 'string', format: 'password', example: 'password123'),
                    new OA\Property(property: 'device_name', type: 'string', example: 'mobile-app'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Logged in', content: new OA\JsonContent(ref: '#/components/schemas/AuthTokenResponse')),
            new OA\Response(response: 422, description: 'Invalid credentials'),
        ]
    )]
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());

        return response()->json($result['payload'], $result['status']);
    }

    #[OA\Post(
        path: '/auth/logout',
        tags: ['Auth'],
        summary: 'Logout',
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'Logged out'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function logout(Request $request): JsonResponse
    {
        return response()->json(
            $this->authService->logout($request->user())
        );
    }

    #[OA\Post(
        path: '/auth/forgot-password',
        tags: ['Auth'],
        summary: 'Forgot Password',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email'],
                properties: [
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'demo@nexora.com'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Reset link status'),
            new OA\Response(response: 422, description: 'Validation error'),
        ]
    )]
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $result = $this->authService->forgotPassword($request->validated());

        return response()->json($result['payload'], $result['status']);
    }

    #[OA\Post(
        path: '/auth/reset-password',
        tags: ['Auth'],
        summary: 'Reset Password',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['token', 'email', 'password', 'password_confirmation'],
                properties: [
                    new OA\Property(property: 'token', type: 'string', example: 'reset-token-from-email'),
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'demo@nexora.com'),
                    new OA\Property(property: 'password', type: 'string', format: 'password', example: 'new-password123'),
                    new OA\Property(property: 'password_confirmation', type: 'string', format: 'password', example: 'new-password123'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Password reset'),
            new OA\Response(response: 422, description: 'Validation error'),
        ]
    )]
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $result = $this->authService->resetPassword($request->validated());

        return response()->json($result['payload'], $result['status']);
    }

    #[OA\Get(
        path: '/auth/me',
        tags: ['Auth'],
        summary: 'Me',
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'Authenticated user', content: new OA\JsonContent(ref: '#/components/schemas/User')),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function me(Request $request): JsonResponse
    {
        return response()->json(
            $this->authService->me($request->user())
        );
    }

    #[OA\Post(
        path: '/auth/refresh-token',
        tags: ['Auth'],
        summary: 'Refresh Token',
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'New token', content: new OA\JsonContent(ref: '#/components/schemas/AuthTokenResponse')),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function refreshToken(Request $request): JsonResponse
    {
        return response()->json(
            $this->authService->refreshToken($request->user())
        );
    }

    #[OA\Post(
        path: '/auth/api-token',
        tags: ['Auth'],
        summary: 'API Token',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: false,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'server-token'),
                    new OA\Property(property: 'abilities', type: 'array', items: new OA\Items(type: 'string'), example: ['*']),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Token created', content: new OA\JsonContent(ref: '#/components/schemas/AuthTokenResponse')),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function apiToken(ApiTokenRequest $request): JsonResponse
    {
        return response()->json(
            $this->authService->apiToken($request->user(), $request->validated()),
            201
        );
    }
}
