import type { BetterAuthClientPlugin } from "better-auth/client";
import type { ResourceManagerConstraint } from "../types.js";
type ResourceManagerClientOptions<TResources extends Record<string, ResourceManagerConstraint>> = {
    resources: TResources;
};
type ResourceClientResponse<T> = {
    data: T;
    error: null;
} | {
    data: null;
    error: {
        message?: string;
        status: number;
        statusText: string;
    };
};
type ResourceList<T> = {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};
type ResourceClient<TResource extends ResourceManagerConstraint> = {
    list: (params?: {
        page?: number;
        limit?: number;
    }) => Promise<ResourceClientResponse<ResourceList<TResource["schema"]["_output"]>>>;
    get: (params: {
        id: string;
    }) => Promise<ResourceClientResponse<TResource["schema"]["_output"]>>;
    create: (data: TResource["schema"]["_input"]) => Promise<ResourceClientResponse<TResource["schema"]["_output"]>>;
    update: (params: {
        id: string;
        data: TResource["schema"]["_input"];
    }) => Promise<ResourceClientResponse<TResource["schema"]["_output"]>>;
    delete: (params: {
        id: string;
    }) => Promise<ResourceClientResponse<unknown>>;
};
type ResourceManagerActions<TResources extends Record<string, ResourceManagerConstraint>> = {
    resourceManager: {
        [K in keyof TResources]: ResourceClient<TResources[K]>;
    };
};
type BetterAuthGetActions = NonNullable<BetterAuthClientPlugin["getActions"]>;
type ResourceManagerGetActions<TResources extends Record<string, ResourceManagerConstraint>> = (...args: Parameters<BetterAuthGetActions>) => ResourceManagerActions<TResources>;
export declare function resourceManagerClient<TResources extends Record<string, ResourceManagerConstraint>>(options: ResourceManagerClientOptions<TResources>): {
    id: "p8labs-better-auth-resource-manager";
    getActions: ResourceManagerGetActions<TResources>;
};
export {};
//# sourceMappingURL=plugin.d.ts.map