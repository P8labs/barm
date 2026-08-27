import type { ResourceOperation } from "../types.js";
type EndpointDefinition = {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    path: (name: string) => string;
};
export declare const endpointDefinitions: Record<ResourceOperation, EndpointDefinition>;
export {};
//# sourceMappingURL=endpoints.d.ts.map