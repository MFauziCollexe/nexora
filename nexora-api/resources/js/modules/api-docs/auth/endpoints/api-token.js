export const apiTokenEndpoint = {
    method: "POST",
    path: "/api/v1/auth/api-token",
    name: "API Token",
    auth: true,
    description: "Create a named API token with optional abilities.",
    payload: "name, abilities",
    response: "201 AuthTokenResponse",
    methodClass: "bg-emerald-100 text-emerald-700",
    parameters: [],
    requestExample: {
        name: "server-token",
        abilities: ["*"],
    },
    schemaExample: {
        name: "string",
        abilities: ["string"],
    },
    responses: [
        {
            code: 201,
            description: "Token created",
            example: {
                token_type: "Bearer",
                access_token: "3|server-sanctum-token",
                user: {
                    id: 1,
                    name: "Demo User",
                    email: "demo@nexora.com",
                },
            },
        },
        {
            code: 401,
            description: "Unauthenticated",
            example: {
                message: "Unauthenticated.",
            },
        },
    ],
};
