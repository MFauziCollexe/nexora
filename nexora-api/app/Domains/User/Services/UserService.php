<?php

namespace App\Domains\User\Services;

use App\Domains\User\Models\User;
use App\Domains\User\Resources\UserResource;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserService
{
    public function __construct(
        private readonly Hasher $hash,
    ) {}

    /**
     * Get all users.
     */
    public function index(): AnonymousResourceCollection
    {
        $users = User::latest()->get();

        return UserResource::collection($users);
    }

    /**
     * Get a single user by ID.
     *
     * @return array<string, mixed>
     */
    public function show(int $id): array
    {
        $user = User::findOrFail($id);

        return ['user' => UserResource::make($user)->resolve()];
    }

    /**
     * Update a user by ID.
     *
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     */
    public function update(int $id, array $data): array
    {
        $user = User::findOrFail($id);

        if (isset($data['password'])) {
            $data['password'] = $this->hash->make($data['password']);
        }

        $user->update($data);

        return ['user' => UserResource::make($user->fresh())->resolve()];
    }

    /**
     * Delete a user by ID.
     *
     * @return array<string, string>
     */
    public function destroy(int $id): array
    {
        $user = User::findOrFail($id);
        $user->delete();

        return ['message' => 'User deleted successfully.'];
    }
}
