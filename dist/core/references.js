import { z } from "zod";
import { getObjectFields, getSchemaMetadata } from "../schema/metadata.js";
export function getResourceReferences(schema) {
    const fields = getObjectFields(schema);
    const references = [];
    for (const [fieldName, field] of Object.entries(fields)) {
        const metadata = getSchemaMetadata(field);
        if (!metadata.references) {
            continue;
        }
        references.push({
            field: fieldName,
            resource: metadata.references.resource,
            referenceField: metadata.references.field,
        });
    }
    return references;
}
//# sourceMappingURL=references.js.map