import { listMenusEndpoint } from "./endpoints/list";
import { menusNavigation } from "./navigation";
import { menusModels } from "./schemas/menus.schema";

export const menusEndpoints = [listMenusEndpoint];

export const menusApiDocsModule = {
    key: "menus",
    title: "Menus",
    description:
        "Application menus with role-based access control. Each menu item has a unique code (M00-M12 for main menus, S01-S06 for submenus, C01-C06 for child menus) that maps to user permissions.",
    helpUrl: "#",
    navigation: menusNavigation,
    endpoints: menusEndpoints,
    models: menusModels,
};
