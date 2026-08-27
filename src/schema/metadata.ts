import { z } from "zod";
import type { SchemaMetadata } from "./types.js";

export function getSchemaMetadata(schema: z.ZodType): SchemaMetadata {
  return (schema.meta() ?? {}) as SchemaMetadata;
}

export function getObjectFields(schema: z.ZodType): Record<string, z.ZodType> {
  if (!(schema instanceof z.ZodObject)) {
    throw new Error("Expected a schema.object(...) schema.");
  }

  return schema.shape;
}
