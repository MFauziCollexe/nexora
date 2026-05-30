export const listUsersEndpoint = {
    method: "GET",
    path: "/api/v1/users",
    name: "List Users",
    auth: true,
    description:
        "Returns a paginated list of all users. Requires authentication.",
    payload: "None",
    response: "200 UserCollection",
    methodClass: "bg-sky-100 text-sky-700",
    parameters: [
        {
            name: "per_page",
            in: "query",
            type: "integer",
            required: false,
            description: "Number of results per page (default: 15)",
        },
        {
            name: "page",
            in: "query",
            type: "integer",
            required: false,
            description: "Page number (default: 1)",
        },
    ],
    requestExample: null,
    schemaExample: null,
    responses: [
        {
            code: 200,
            description: "Paginated list of users",
            example: {
                data: [
                    {
                        id: 1,
                        name: "Demo User",
                        email: "demo@nexora.com",
                        is_active: true,
                        email_verified_at: null,
                        created_at: "2026-05-26T08:00:00.000000Z",
                        updated_at: "2026-05-26T08:00:00.000000Z",
                    },
                ],
                meta: {
                    current_page: 1,
                    last_page: 5,
                    per_page: 15,
                    total: 72,
                },
            },
        },
        {
            code: 401,
            description: "Unauthenticated",
            example: { message: "Unauthenticated." },
        },
    ],
};
