import { z } from "zod";
export function getCreateSchema(schema) {
    if (!(schema instanceof z.ZodObject)) {
        throw new Error("Resource schema must use schema.object(...)");
    }
    return schema;
}
export function getUpdateSchema(schema) {
    if (!(schema instanceof z.ZodObject)) {
        throw new Error("Resource schema must use schema.object(...)");
    }
    return schema.partial();
}
//# sourceMappingURL=input.js.map