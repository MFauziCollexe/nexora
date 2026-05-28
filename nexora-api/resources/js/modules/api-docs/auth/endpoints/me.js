export const meEndpoint = {
    method: "GET",
    path: "/api/v1/auth/me",
    name: "Me",
    auth: true,
    description: "Return the authenticated user's profile.",
    payload: "None",
    response: "200 User",
    methodClass: "bg-sky-100 text-sky-700",
    parameters: [],
    requestExample: null,
    schemaExample: null,
    responses: [
        {
            code: 200,
            description: "Authenticated user",
            example: {
                user: {
                    id: 1,
                    name: "Demo User",
                    email: "demo@nexora.com",
                    email_verified_at: null,
                    created_at: "2026-05-26T08:00:00.000000Z",
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
