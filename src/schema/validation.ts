import { z } from "zod";
import { getSchemaMetadata } from "./metadata.js";

function getWritableFields(schema: z.ZodType) {
  if (!(schema instanceof z.ZodObject)) {
    throw new Error("Resource schema must use schema.object(...)");
  }

  const shape: Record<string, z.ZodType> = {};

  for (const [name, field] of Object.entries(schema.shape)) {
    const metadata = getSchemaMetadata(field);

    // Never allow server-managed fields from the client.
    if (metadata.input === "readonly" || metadata.owner || metadata.autofill) {
      continue;
    }

    shape[name] = field;
  }

  return shape;
}

export function getCreateSchema(schema: z.ZodType): z.ZodObject {
  return z.object(getWritableFields(schema));
}

export function getUpdateSchema(schema: z.ZodType): z.ZodObject {
  return getCreateSchema(schema).partial();
}

export function validateCreate(schema: z.ZodType, data: unknown) {
  return getCreateSchema(schema).safeParse(data);
}

export function validateUpdate(schema: z.ZodType, data: unknown) {
  return getUpdateSchema(schema).safeParse(data);
}
