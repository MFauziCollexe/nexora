import { authApiDocsModule } from "../auth";
import { productsApiDocsModule } from "../products";
import { usersApiDocsModule } from "../users";

export const dashboardNavigation = [
    {
        key: "main",
        label: "Main",
        defaultOpen: true,
        items: [
            { label: "Dashboard", routeName: "dashboard" },
            { label: "Overview", routeName: "dashboard.page", page: "overview" },
            { label: "Analytics", routeName: "dashboard.page", page: "analytics" },
        ],
    },
    {
        key: "api",
        label: "API Endpoints",
        items: [
            authApiDocsModule.navigation,
            usersApiDocsModule.navigation,
            productsApiDocsModule.navigation,
            { label: "Orders", routeName: "dashboard.page", page: "orders" },
            { label: "Categories", routeName: "dashboard.page", page: "categories" },
            { label: "Dashboard", routeName: "dashboard.page", page: "dashboard-endpoint" },
            { label: "Notifications", routeName: "dashboard.page", page: "notifications" },
            { label: "Settings", routeName: "dashboard.page", page: "settings" },
        ],
    },
    {
        key: "system",
        label: "System",
        items: [
            { label: "API Keys", routeName: "dashboard.page", page: "api-keys" },
            { label: "Rate Limits", routeName: "dashboard.page", page: "rate-limits" },
            { label: "Logs", routeName: "dashboard.page", page: "logs" },
            { label: "Webhooks", routeName: "dashboard.page", page: "webhooks" },
        ],
    },
];
