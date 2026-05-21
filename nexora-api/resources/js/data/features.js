export const features = [
    {
        icon: "ShieldCheck",
        title: "Secure Authentication",
        description:
            "JWT & sanctum-based authentication with role-based access control and token refresh.",
    },
    {
        icon: "Database",
        title: "Optimized Database",
        description:
            "PostgreSQL & MySQL with query optimization, indexing, and automated backups.",
    },
    {
        icon: "Activity",
        title: "Realtime Services",
        description:
            "Live monitoring, webhooks, and realtime operational analytics via pusher/echo.",
    },
    {
        icon: "Layers3",
        title: "Modular Architecture",
        description:
            "Scalable module-based API structure supporting inventory, HR, finance, and more.",
    },
];

export function getFeatures() {
    return features;
}
