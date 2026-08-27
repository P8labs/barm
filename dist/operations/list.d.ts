import type { ResourceEndpointContext, ResourceResult } from "./../types.js";
export type ListResourceOptions = {
    page: number;
    limit: number;
};
export declare function listResource(ctx: ResourceEndpointContext, resourceName: string, options: ListResourceOptions): Promise<ResourceResult<{
    data: Record<string, unknown>[];
    pagination: {
        page: number;
        limit: number;
        hasMore: boolean;
    };
}>>;
//# sourceMappingURL=list.d.ts.map