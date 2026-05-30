export const updateUserEndpoint = {
    method: "PUT",
    path: "/api/v1/users/{id}",
    name: "Update User",
    auth: true,
    description:
        "Update one or more fields of a user. All fields are optional.",
    payload: "name, email, password, password_confirmation, is_active",
    response: "200 User",
    methodClass: "bg-amber-500 text-white",
    parameters: [
        {
            name: "id",
            in: "path",
            type: "integer",
            required: true,
            description: "The user ID",
        },
    ],
    requestExample: {
        name: "John Doe",
        email: "john@nexora.com",
        password: "newpassword123",
        password_confirmation: "newpassword123",
        is_active: true,
    },
    schemaExample: {
        name: "string",
        email: "string",
        password: "string",
        password_confirmation: "string",
        is_active: "boolean",
    },
    responses: [
        {
            code: 200,
            description: "User updated",
            example: {
                user: {
                    id: 1,
                    name: "John Doe",
                    email: "john@nexora.com",
                    is_active: true,
                    email_verified_at: null,
                    created_at: "2026-05-26T08:00:00.000000Z",
                    updated_at: "2026-05-26T09:00:00.000000Z",
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
        {
            code: 422,
            description: "Validation error",
            example: {
                message: "The email has already been taken.",
                errors: { email: ["The email has already been taken."] },
            },
        },
    ],
};
