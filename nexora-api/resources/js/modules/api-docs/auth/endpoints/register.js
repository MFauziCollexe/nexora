export const registerEndpoint = {
    method: "POST",
    path: "/api/v1/auth/register",
    name: "Register",
    auth: false,
    description: "Create a new user account and return a Sanctum bearer token.",
    payload: "name, email, password, password_confirmation, device_name",
    response: "201 AuthTokenResponse",
    methodClass: "bg-emerald-100 text-emerald-700",
    parameters: [],
    requestExample: {
        name: "Demo User",
        email: "demo@nexora.com",
        password: "password123",
        password_confirmation: "password123",
        device_name: "mobile-app",
    },
    schemaExample: {
        name: "string",
        email: "string",
        password: "string",
        password_confirmation: "string",
        device_name: "string",
    },
    responses: [
        {
            code: 201,
            description: "Registered",
            example: {
                token_type: "Bearer",
                access_token: "1|sanctum-token",
                user: {
                    id: 1,
                    name: "Demo User",
                    email: "demo@nexora.com",
                },
            },
        },
        {
            code: 422,
            description: "Validation error",
            example: {
                message: "The email has already been taken.",
                errors: {
                    email: ["The email has already been taken."],
                },
            },
        },
    ],
};
