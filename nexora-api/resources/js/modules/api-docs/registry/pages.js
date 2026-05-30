import { authApiDocsModule } from "../auth";
import { usersApiDocsModule } from "../users";

export const apiEndpointPages = {
    [authApiDocsModule.key]: authApiDocsModule,
    [usersApiDocsModule.key]: usersApiDocsModule,
};
