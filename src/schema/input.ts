import { z } from "zod";

export function getCreateSchema(schema: z.ZodType) {
  if (!(schema instanceof z.ZodObject)) {
    throw new Error("Resource schema must use schema.object(...)");
  }

  return schema;
}

export function getUpdateSchema(schema: z.ZodType) {
  if (!(schema instanceof z.ZodObject)) {
    throw new Error("Resource schema must use schema.object(...)");
  }

  return schema.partial();
}
