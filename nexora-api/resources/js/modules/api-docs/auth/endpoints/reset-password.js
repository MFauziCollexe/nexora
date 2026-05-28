export const resetPasswordEndpoint = {
    method: "POST",
    path: "/api/v1/auth/reset-password",
    name: "Reset Password",
    auth: false,
    description: "Reset the user's password using a valid reset token.",
    payload: "token, email, password, password_confirmation",
    response: "200 Password reset",
    methodClass: "bg-emerald-100 text-emerald-700",
    parameters: [],
    requestExample: {
        token: "reset-token-from-email",
        email: "demo@nexora.com",
        password: "new-password123",
        password_confirmation: "new-password123",
    },
    schemaExample: {
        token: "string",
        email: "string",
        password: "string",
        password_confirmation: "string",
    },
    responses: [
        {
            code: 200,
            description: "Password reset",
            example: {
                message: "Your password has been reset.",
                status: "passwords.reset",
            },
        },
        {
            code: 422,
            description: "Validation error",
            example: {
                message: "This password reset token is invalid.",
            },
        },
    ],
};
