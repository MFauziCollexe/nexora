export const usersModels = [
    {
        name: "User",
        fields: [
            { name: "id", type: "integer($int64)", open: true },
            { name: "name", type: "string", open: true },
            { name: "email", type: "string($email)", open: true },
            { name: "is_active", type: "boolean", open: true },
            {
                name: "email_verified_at",
                type: "string($date-time) | null",
                open: true,
            },
            { name: "created_at", type: "string($date-time)", open: true },
            { name: "updated_at", type: "string($date-time)", open: true },
        ],
    },
    {
        name: "UserCollection",
        fields: [
            { name: "data", type: "User[]", open: true },
            { name: "meta", type: "[...]", open: false },
        ],
    },
];
