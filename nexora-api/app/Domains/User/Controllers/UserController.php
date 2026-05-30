<?php

namespace App\Domains\User\Controllers;

use App\Domains\User\Requests\UpdateUserRequest;
use App\Domains\User\Services\UserService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService,
    ) {}

    #[OA\Get(
        path: '/users',
        tags: ['Users'],
        summary: 'List all users',
        description: 'Returns a paginated list of all users. Requires authentication.',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(name: 'per_page', in: 'query', required: false, schema: new OA\Schema(type: 'integer', example: 15)),
            new OA\Parameter(name: 'page', in: 'query', required: false, schema: new OA\Schema(type: 'integer', example: 1)),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'List of users',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'data', type: 'array', items: new OA\Items(ref: '#/components/schemas/UserItem')),
                        new OA\Property(property: 'meta', type: 'object', properties: [
                            new OA\Property(property: 'current_page', type: 'integer', example: 1),
                            new OA\Property(property: 'last_page', type: 'integer', example: 5),
                            new OA\Property(property: 'per_page', type: 'integer', example: 15),
                            new OA\Property(property: 'total', type: 'integer', example: 72),
                        ]),
                    ]
                )
            ),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 15);

        return response()->json(
            $this->userService->index($perPage)
        );
    }

    #[OA\Get(
        path: '/users/{id}',
        tags: ['Users'],
        summary: 'Get user detail',
        description: 'Returns a single user by ID.',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer', example: 1)),
        ],
        responses: [
            new OA\Response(response: 200, description: 'User detail', content: new OA\JsonContent(ref: '#/components/schemas/UserItem')),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'User not found'),
        ]
    )]
    public function show(int $id): JsonResponse
    {
        return response()->json(
            $this->userService->show($id)
        );
    }

    #[OA\Put(
        path: '/users/{id}',
        tags: ['Users'],
        summary: 'Update user',
        description: 'Update one or more fields of a user. All fields are optional.',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer', example: 1)),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'John Doe'),
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'john@nexora.com'),
                    new OA\Property(property: 'password', type: 'string', format: 'password', example: 'newpassword123'),
                    new OA\Property(property: 'password_confirmation', type: 'string', format: 'password', example: 'newpassword123'),
                    new OA\Property(property: 'is_active', type: 'boolean', example: true),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'User updated', content: new OA\JsonContent(ref: '#/components/schemas/UserItem')),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'User not found'),
            new OA\Response(response: 422, description: 'Validation error'),
        ]
    )]
    public function update(UpdateUserRequest $request, int $id): JsonResponse
    {
        return response()->json(
            $this->userService->update($id, $request->validated())
        );
    }

    #[OA\Delete(
        path: '/users/{id}',
        tags: ['Users'],
        summary: 'Delete user',
        description: 'Permanently delete a user by ID.',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer', example: 1)),
        ],
        responses: [
            new OA\Response(response: 200, description: 'User deleted', content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'message', type: 'string', example: 'User deleted successfully.'),
                ]
            )),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'User not found'),
        ]
    )]
    public function destroy(int $id): JsonResponse
    {
        return response()->json(
            $this->userService->destroy($id)
        );
    }
}
