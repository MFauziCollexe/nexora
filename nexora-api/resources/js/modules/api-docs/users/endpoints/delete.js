export const deleteUserEndpoint = {
    method: "DELETE",
    path: "/api/v1/users/{id}",
    name: "Delete User",
    auth: true,
    description: "Permanently delete a user by ID.",
    payload: "None",
    response: "200 Message",
    methodClass: "bg-red-100 text-red-700",
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
            description: "User deleted",
            example: { message: "User deleted successfully." },
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
