import { z } from "zod";
import type { SchemaMetadata } from "./types.js";

const metadataStore = new WeakMap<z.ZodType, SchemaMetadata>();

export function getSchemaMetadata(schema: z.ZodType): SchemaMetadata {
  return metadataStore.get(schema) ?? {};
}

export function setSchemaMetadata(
  schema: z.ZodType,
  metadata: SchemaMetadata,
): void {
  const current = metadataStore.get(schema) ?? {};

  metadataStore.set(schema, {
    ...current,
    ...metadata,
  });
}
