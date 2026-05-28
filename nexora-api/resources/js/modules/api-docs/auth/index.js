import { apiTokenEndpoint } from "./endpoints/api-token";
import { forgotPasswordEndpoint } from "./endpoints/forgot-password";
import { loginEndpoint } from "./endpoints/login";
import { logoutEndpoint } from "./endpoints/logout";
import { meEndpoint } from "./endpoints/me";
import { refreshTokenEndpoint } from "./endpoints/refresh-token";
import { registerEndpoint } from "./endpoints/register";
import { resetPasswordEndpoint } from "./endpoints/reset-password";
import { authNavigation } from "./navigation";
import { authModels } from "./schemas/auth.schema";

export const authEndpoints = [
    registerEndpoint,
    loginEndpoint,
    forgotPasswordEndpoint,
    resetPasswordEndpoint,
    logoutEndpoint,
    meEndpoint,
    refreshTokenEndpoint,
    apiTokenEndpoint,
];

export const authApiDocsModule = {
    key: "auth",
    title: "Auth",
    description: "Operations about authentication.",
    helpUrl: "#",
    navigation: authNavigation,
    endpoints: authEndpoints,
    models: authModels,
};
