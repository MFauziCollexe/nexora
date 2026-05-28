export const authModels = [
    {
        name: "AuthTokenResponse",
        fields: [
            { name: "token_type", type: "string", open: true },
            { name: "access_token", type: "string", open: true },
            { name: "user", type: "[...]", open: false },
        ],
    },
    {
        name: "User",
        fields: [
            { name: "id", type: "integer($int64)", open: true },
            { name: "name", type: "string", open: true },
            { name: "email", type: "string", open: true },
            { name: "email_verified_at", type: "[...]", open: false },
            { name: "created_at", type: "string($date-time)", open: true },
        ],
    },
    {
        name: "ValidationError",
        fields: [
            { name: "message", type: "string", open: true },
            { name: "errors", type: "[...]", open: false },
        ],
    },
];
