import { z } from "zod";
import { getSchemaMetadata } from "./metadata.js";
function getFieldType(field) {
    if (field instanceof z.ZodString) {
        return "string";
    }
    if (field instanceof z.ZodNumber) {
        return "number";
    }
    if (field instanceof z.ZodBoolean) {
        return "boolean";
    }
    if (field instanceof z.ZodDate) {
        return "date";
    }
    throw new Error(`Unsupported schema type: ${field.constructor.name}`);
}
function toFieldSchema(field) {
    const metadata = getSchemaMetadata(field);
    const result = {
        type: getFieldType(field),
    };
    if (metadata.primaryKey || metadata.unique) {
        result.unique = true;
    }
    if (metadata.references) {
        result.references = {
            model: metadata.references.resource,
            field: metadata.references.field,
        };
    }
    return result;
}
function toResourceSchema(resource, name) {
    if (!(resource.schema instanceof z.ZodObject)) {
        throw new Error(`Resource "${name}" must use schema.object(...)`);
    }
    const fields = {};
    for (const [fieldName, field] of Object.entries(resource.schema.shape)) {
        fields[fieldName] = toFieldSchema(field);
    }
    const metadata = (resource.schema.meta() ?? {});
    const modelName = typeof metadata.table === "string" ? metadata.table : name;
    return {
        fields,
        modelName,
    };
}
export function toBetterAuthSchema(resources) {
    const schema = {};
    for (const [name, resource] of Object.entries(resources)) {
        schema[name] = toResourceSchema(resource, name);
    }
    return schema;
}
//# sourceMappingURL=converter.js.map