<?php

namespace App\Domains\Auth\Services;

use App\Domains\Auth\Resources\UserResource;
use App\Domains\User\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthService
{
    public function __construct(
        private readonly Hasher $hash,
    ) {}

    /**
     * @param array{name: string, email: string, password: string, device_name?: string|null} $data
     * @return array<string, mixed>
     */
    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $this->hash->make($data['password']),
        ]);

        return $this->tokenPayload($user, $data['device_name'] ?? 'api-client');
    }

    /**
     * @param array{email: string, password: string, device_name?: string|null} $data
     * @return array{payload: array<string, mixed>, status: int}
     */
    public function login(array $data): array
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user || !$this->hash->check($data['password'], $user->password)) {
            return [
                'payload' => ['message' => 'Invalid email or password.'],
                'status' => 422,
            ];
        }

        return [
            'payload' => $this->tokenPayload($user, $data['device_name'] ?? 'api-client'),
            'status' => 200,
        ];
    }

    /**
     * @return array<string, string>
     */
    public function logout(User $user): array
    {
        $user->currentAccessToken()?->delete();

        return ['message' => 'Logged out successfully.'];
    }

    /**
     * @param array{email: string} $data
     * @return array{payload: array<string, string>, status: int}
     */
    public function forgotPassword(array $data): array
    {
        $status = Password::sendResetLink(['email' => $data['email']]);

        return [
            'payload' => [
                'message' => __($status),
                'status' => $status,
            ],
            'status' => $status === Password::RESET_LINK_SENT ? 200 : 422,
        ];
    }

    /**
     * @param array{token: string, email: string, password: string} $data
     * @return array{payload: array<string, string>, status: int}
     */
    public function resetPassword(array $data): array
    {
        $status = Password::reset(
            $data,
            function (User $user) use ($data) {
                $user->forceFill([
                    'password' => $this->hash->make($data['password']),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return [
            'payload' => [
                'message' => __($status),
                'status' => $status,
            ],
            'status' => $status === Password::PASSWORD_RESET ? 200 : 422,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function me(User $user): array
    {
        return ['user' => $this->userPayload($user)];
    }

    /**
     * @return array<string, mixed>
     */
    public function refreshToken(User $user): array
    {
        $tokenName = $user->currentAccessToken()?->name ?: 'api-client';

        $user->currentAccessToken()?->delete();

        return $this->tokenPayload($user, $tokenName);
    }

    /**
     * @param array{name?: string|null, abilities?: array<int, string>|null} $data
     * @return array<string, mixed>
     */
    public function apiToken(User $user, array $data): array
    {
        $token = $user->createToken(
            $data['name'] ?? 'api-token',
            $data['abilities'] ?? ['*']
        );

        return [
            'token_type' => 'Bearer',
            'access_token' => $token->plainTextToken,
            'user' => $this->userPayload($user),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function tokenPayload(User $user, string $tokenName): array
    {
        $token = $user->createToken($tokenName);

        return [
            'token_type' => 'Bearer',
            'access_token' => $token->plainTextToken,
            'user' => $this->userPayload($user),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function userPayload(User $user): array
    {
        return UserResource::make($user)->resolve();
    }
}
