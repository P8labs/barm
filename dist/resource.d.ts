import type { ZodType } from "zod";
import type { Resource, ResourceAccess } from "./types.js";
export type CrudResourceOptions<TSchema extends ZodType> = {
    schema: TSchema;
    access?: ResourceAccess<TSchema["_output"], TSchema["_input"]>;
};
export declare function resource<TSchema extends ZodType>(options: CrudResourceOptions<TSchema>): Resource<TSchema>;
//# sourceMappingURL=resource.d.ts.map