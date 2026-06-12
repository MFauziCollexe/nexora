import { authApiDocsModule } from "../auth";
import { menusApiDocsModule } from "../menus";
import { usersApiDocsModule } from "../users";

export const apiEndpointPages = {
    [authApiDocsModule.key]: authApiDocsModule,
    [usersApiDocsModule.key]: usersApiDocsModule,
    [menusApiDocsModule.key]: menusApiDocsModule,
};
