export const forgotPasswordEndpoint = {
    method: "POST",
    path: "/api/v1/auth/forgot-password",
    name: "Forgot Password",
    auth: false,
    description: "Send a password reset link to the user's email address.",
    payload: "email",
    response: "200 Reset link status",
    methodClass: "bg-emerald-100 text-emerald-700",
    parameters: [],
    requestExample: {
        email: "demo@nexora.com",
    },
    schemaExample: {
        email: "string",
    },
    responses: [
        {
            code: 200,
            description: "Reset link status",
            example: {
                message: "We have emailed your password reset link.",
                status: "passwords.sent",
            },
        },
        {
            code: 422,
            description: "Validation error",
            example: {
                message: "The email field is required.",
            },
        },
    ],
};
