import { z } from "zod";
import { getObjectFields, getSchemaMetadata } from "../schema/metadata.js";

export type ResourceReference = {
  field: string;
  resource: string;
  referenceField: string;
};

export function getResourceReferences(schema: z.ZodType): ResourceReference[] {
  const fields = getObjectFields(schema);
  const references: ResourceReference[] = [];

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
