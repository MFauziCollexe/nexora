export const stats = [
    {
        title: "Total Requests",
        value: "24,157",
        change: "+12.5%",
        positive: true,
        icon: "activity",
        color: "violet",
    },
    {
        title: "Successful Requests",
        value: "22,489",
        change: "+11.7%",
        positive: true,
        icon: "check",
        color: "emerald",
    },
    {
        title: "Error Requests",
        value: "1,668",
        change: "-4.3%",
        positive: false,
        icon: "alert",
        color: "red",
    },
    {
        title: "Avg. Response Time",
        value: "245 ms",
        change: "+8.2%",
        positive: true,
        icon: "timer",
        color: "blue",
    },
    {
        title: "Active Users",
        value: "342",
        change: "+15.3%",
        positive: true,
        icon: "users",
        color: "purple",
    },
];

export const topEndpoints = [
    {
        endpoint: "/api/v1/login",
        requests: "3,456",
        percentage: "68%",
        percentageClass: "bg-violet-500",
    },
    {
        endpoint: "/api/v1/products",
        requests: "2,890",
        percentage: "55%",
        percentageClass: "bg-sky-500",
    },
    {
        endpoint: "/api/v1/users",
        requests: "2,456",
        percentage: "42%",
        percentageClass: "bg-emerald-500",
    },
];

export const recentRequests = [
    {
        method: "POST",
        endpoint: "/api/v1/login",
        status: 200,
        response: "234 ms",
        time: "19 May 2024, 10:30:45",
        methodClass: "bg-emerald-100 text-emerald-700",
    },
    {
        method: "GET",
        endpoint: "/api/v1/products",
        status: 200,
        response: "145 ms",
        time: "19 May 2024, 10:30:40",
        methodClass: "bg-sky-100 text-sky-700",
    },
    {
        method: "GET",
        endpoint: "/api/v1/users",
        status: 200,
        response: "120 ms",
        time: "19 May 2024, 10:30:35",
        methodClass: "bg-sky-100 text-sky-700",
    },
    {
        method: "POST",
        endpoint: "/api/v1/orders",
        status: 201,
        response: "320 ms",
        time: "19 May 2024, 10:30:28",
        methodClass: "bg-emerald-100 text-emerald-700",
    },
    {
        method: "GET",
        endpoint: "/api/v1/categories",
        status: 200,
        response: "98 ms",
        time: "19 May 2024, 10:30:22",
        methodClass: "bg-sky-100 text-sky-700",
    },
    {
        method: "PUT",
        endpoint: "/api/v1/users/12",
        status: 200,
        response: "210 ms",
        time: "19 May 2024, 10:30:15",
        methodClass: "bg-amber-100 text-amber-700",
    },
];

export const authEndpoints = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
        method: "GET",
        path: "/api/v1/auth/me",
        name: "Me",
        auth: true,
        description: "Return the authenticated user's profile.",
        payload: "None",
        response: "200 User",
        methodClass: "bg-sky-100 text-sky-700",
        parameters: [],
        requestExample: null,
        schemaExample: null,
        responses: [
            {
                code: 200,
                description: "Authenticated user",
                example: {
                    user: {
                        id: 1,
                        name: "Demo User",
                        email: "demo@nexora.com",
                        email_verified_at: null,
                        created_at: "2026-05-26T08:00:00.000000Z",
                    },
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
    },
    {
        method: "POST",
        path: "/api/v1/auth/refresh-token",
        name: "Refresh Token",
        auth: true,
        description: "Revoke the current token and issue a fresh bearer token.",
        payload: "None",
        response: "200 AuthTokenResponse",
        methodClass: "bg-emerald-100 text-emerald-700",
        parameters: [],
        requestExample: null,
        schemaExample: null,
        responses: [
            {
                code: 200,
                description: "New token",
                example: {
                    token_type: "Bearer",
                    access_token: "2|fresh-sanctum-token",
                    user: {
                        id: 1,
                        name: "Demo User",
                        email: "demo@nexora.com",
                    },
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
    },
    {
        method: "POST",
        path: "/api/v1/auth/api-token",
        name: "API Token",
        auth: true,
        description: "Create a named API token with optional abilities.",
        payload: "name, abilities",
        response: "201 AuthTokenResponse",
        methodClass: "bg-emerald-100 text-emerald-700",
        parameters: [],
        requestExample: {
            name: "server-token",
            abilities: ["*"],
        },
        schemaExample: {
            name: "string",
            abilities: ["string"],
        },
        responses: [
            {
                code: 201,
                description: "Token created",
                example: {
                    token_type: "Bearer",
                    access_token: "3|server-sanctum-token",
                    user: {
                        id: 1,
                        name: "Demo User",
                        email: "demo@nexora.com",
                    },
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
    },
];
