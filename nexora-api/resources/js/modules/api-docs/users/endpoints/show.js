export const showUserEndpoint = {
    method: "GET",
    path: "/api/v1/users/{id}",
    name: "Get User",
    auth: true,
    description: "Returns a single user by ID.",
    payload: "None",
    response: "200 User",
    methodClass: "bg-sky-100 text-sky-700",
    parameters: [
        {
            name: "id",
            in: "path",
            type: "integer",
            required: true,
            description: "The user ID",
        },
    ],
    requestExample: null,
    schemaExample: null,
    responses: [
        {
            code: 200,
            description: "User detail",
            example: {
                user: {
                    id: 1,
                    name: "Demo User",
                    email: "demo@nexora.com",
                    is_active: true,
                    email_verified_at: null,
                    created_at: "2026-05-26T08:00:00.000000Z",
                    updated_at: "2026-05-26T08:00:00.000000Z",
                },
            },
        },
        {
            code: 401,
            description: "Unauthenticated",
            example: { message: "Unauthenticated." },
        },
        {
            code: 404,
            description: "User not found",
            example: { message: "No query results for model [User] 99." },
        },
    ],
};
