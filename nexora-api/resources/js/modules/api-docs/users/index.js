import { listUsersEndpoint } from "./endpoints/list";
import { showUserEndpoint } from "./endpoints/show";
import { updateUserEndpoint } from "./endpoints/update";
import { deleteUserEndpoint } from "./endpoints/delete";
import { usersNavigation } from "./navigation";
import { usersModels } from "./schemas/users.schema";

export const usersEndpoints = [
    listUsersEndpoint,
    showUserEndpoint,
    updateUserEndpoint,
    deleteUserEndpoint,
];

export const usersApiDocsModule = {
    key: "users",
    title: "Users",
    description: "Manage user accounts — list, view, update, and delete users.",
    helpUrl: "#",
    navigation: usersNavigation,
    endpoints: usersEndpoints,
    models: usersModels,
};
