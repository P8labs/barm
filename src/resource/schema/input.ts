import { z } from "zod";
import { getSchemaMetadata } from "./meta.js";

export function createInputSchema<T extends z.ZodObject<any>>(schema: T) {
  const shape: Record<string, z.ZodType> = {};

  for (const [name, field] of Object.entries(
    schema.shape as Record<string, z.ZodType>,
  )) {
    const metadata = getSchemaMetadata(field);

    if (metadata.owner || metadata.autofill) {
      continue;
    }

    shape[name] = field;
  }

  return z.object(shape);
}

export function updateInputSchema<T extends z.ZodObject<any>>(schema: T) {
  return createInputSchema(schema).partial();
}
