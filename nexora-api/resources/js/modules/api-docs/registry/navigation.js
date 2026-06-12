import { authApiDocsModule } from "../auth";
import { menusApiDocsModule } from "../menus";
import { usersApiDocsModule } from "../users";

export const dashboardNavigation = [
    {
        key: "main",
        label: "Main",
        defaultOpen: true,
        items: [
            { label: "Dashboard", routeName: "dashboard" },

            { label: "Overview", routeName: "docs.page", page: "overview" },
            { label: "Analytics", routeName: "docs.page", page: "analytics" },
        ],
    },
    {
        key: "api",
        label: "API Endpoints",
        items: [
            {
                label: authApiDocsModule.navigation.label,
                routeName: "docs.page",
                page: authApiDocsModule.navigation.page,
            },
            {
                label: usersApiDocsModule.navigation.label,
                routeName: "docs.page",
                page: usersApiDocsModule.navigation.page,
            },
            {
                label: menusApiDocsModule.navigation.label,
                routeName: "docs.page",
                page: menusApiDocsModule.navigation.page,
            },
        ],
    },
    {
        key: "system",
        label: "System",
        items: [
            {
                label: "Rate Limits",
                routeName: "docs.page",
                page: "rate-limits",
            },
            { label: "Logs", routeName: "docs.page", page: "logs" },
            {
                label: "Settings",
                routeName: "system.settings",
            },
        ],
    },
];
