import { z } from "zod";
import { getSchemaMetadata } from "./metadata.js";
export function getCreateSchema(schema) {
    if (!(schema instanceof z.ZodObject)) {
        throw new Error("Resource schema must use schema.object(...)");
    }
    const shape = {};
    for (const [name, field] of Object.entries(schema.shape)) {
        const metadata = getSchemaMetadata(field);
        if (metadata.input === "readonly") {
            continue;
        }
        shape[name] = field;
    }
    return z.object(shape);
}
export function getUpdateSchema(schema) {
    return getCreateSchema(schema).partial();
}
export function validateCreate(schema, data) {
    return getCreateSchema(schema).safeParse(data);
}
export function validateUpdate(schema, data) {
    return getUpdateSchema(schema).safeParse(data);
}
//# sourceMappingURL=validation.js.map