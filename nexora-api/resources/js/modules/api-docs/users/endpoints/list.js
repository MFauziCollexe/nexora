export const listUsersEndpoint = {
    method: "GET",
    path: "/api/v1/users",
    name: "List Users",
    auth: true,
    description: "Returns all users. Requires authentication.",
    payload: "None",
    response: "200 UserCollection",
    methodClass: "bg-sky-100 text-sky-700",
    parameters: [],
    requestExample: null,
    schemaExample: null,
    responses: [
        {
            code: 200,
            description: "List of users",
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
            },
        },
        {
            code: 401,
            description: "Unauthenticated",
            example: { message: "Unauthenticated." },
        },
    ],
};
