<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'User',
    type: 'object',
    properties: [
        new OA\Property(property: 'user', type: 'object', properties: [
            new OA\Property(property: 'id', type: 'integer', example: 1),
            new OA\Property(property: 'name', type: 'string', example: 'Demo User'),
            new OA\Property(property: 'email', type: 'string', format: 'email', example: 'demo@nexora.com'),
            new OA\Property(property: 'email_verified_at', type: 'string', format: 'date-time', nullable: true),
            new OA\Property(property: 'created_at', type: 'string', format: 'date-time', nullable: true),
        ]),
    ]
)]
#[OA\Schema(
    schema: 'AuthTokenResponse',
    type: 'object',
    properties: [
        new OA\Property(property: 'token_type', type: 'string', example: 'Bearer'),
        new OA\Property(property: 'access_token', type: 'string', example: '1|plain-text-token'),
        new OA\Property(property: 'user', type: 'object', properties: [
            new OA\Property(property: 'id', type: 'integer', example: 1),
            new OA\Property(property: 'name', type: 'string', example: 'Demo User'),
            new OA\Property(property: 'email', type: 'string', format: 'email', example: 'demo@nexora.com'),
            new OA\Property(property: 'email_verified_at', type: 'string', format: 'date-time', nullable: true),
            new OA\Property(property: 'created_at', type: 'string', format: 'date-time', nullable: true),
        ]),
    ]
)]
final class AuthSchemas
{
}
