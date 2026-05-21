export const endpoints = [
    {
        method: "GET",
        path: "/api/inventory/items",
        module: "Inventory",
        description: "List all inventory items with filters and pagination.",
    },
    {
        method: "POST",
        path: "/api/procurement/request",
        module: "Procurement",
        description: "Create a new procurement request.",
    },
    {
        method: "PUT",
        path: "/api/user/profile",
        module: "Users",
        description: "Update current user profile information.",
    },
    {
        method: "DELETE",
        path: "/api/user/profile",
        module: "Users",
        description: "Delete authenticated user account.",
    },
];

export function getEndpointsByModule() {
    const map = {};
    for (const ep of endpoints) {
        if (!map[ep.module]) map[ep.module] = [];
        map[ep.module].push(ep);
    }
    return map;
}
