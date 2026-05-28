export const refreshTokenEndpoint = {
    method: "POST",
    path: "/api/v1/auth/refresh-token",
    name: "Refresh Token",
    auth: true,
    description: "Revoke the current token and issue a fresh bearer token.",
    payload: "None",
    response: "200 AuthTokenResponse",
    methodClass: "bg-emerald-100 text-emerald-700",
    parameters: [],
    requestExample: null,
    schemaExample: null,
    responses: [
        {
            code: 200,
            description: "New token",
            example: {
                token_type: "Bearer",
                access_token: "2|fresh-sanctum-token",
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
