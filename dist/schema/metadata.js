import { z } from "zod";
export function getSchemaMetadata(schema) {
    return (schema.meta() ?? {});
}
export function getObjectFields(schema) {
    if (!(schema instanceof z.ZodObject)) {
        throw new Error("Expected a schema.object(...) schema.");
    }
    return schema.shape;
}
//# sourceMappingURL=metadata.js.map