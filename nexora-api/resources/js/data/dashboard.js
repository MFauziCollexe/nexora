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
