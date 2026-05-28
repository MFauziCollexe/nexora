export const logoutEndpoint = {
    method: "POST",
    path: "/api/v1/auth/logout",
    name: "Logout",
    auth: true,
    description: "Revoke the current access token.",
    payload: "None",
    response: "200 Logged out",
    methodClass: "bg-emerald-100 text-emerald-700",
    parameters: [],
    requestExample: null,
    schemaExample: null,
    responses: [
        {
            code: 200,
            description: "Logged out",
            example: {
                message: "Logged out successfully.",
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
