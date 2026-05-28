export const loginEndpoint = {
    method: "POST",
    path: "/api/v1/auth/login",
    name: "Login",
    auth: false,
    description: "Authenticate an existing user and return a Sanctum bearer token.",
    payload: "email, password, device_name",
    response: "200 AuthTokenResponse",
    methodClass: "bg-emerald-100 text-emerald-700",
    parameters: [],
    requestExample: {
        email: "demo@nexora.com",
        password: "password123",
        device_name: "mobile-app",
    },
    schemaExample: {
        email: "string",
        password: "string",
        device_name: "string",
    },
    responses: [
        {
            code: 200,
            description: "Logged in",
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
            description: "Invalid credentials",
            example: {
                message: "Invalid email or password.",
            },
        },
    ],
};
