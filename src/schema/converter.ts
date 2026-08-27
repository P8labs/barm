import { z } from "zod";
import type {
  BetterAuthPlugin,
  DBFieldAttribute,
  DBFieldType,
} from "better-auth";
import type { SchemaMetadata } from "./types.js";
import { getSchemaMetadata } from "./metadata.js";

type BetterAuthSchema = NonNullable<BetterAuthPlugin["schema"]>;

type ResourceWithSchema = {
  schema: z.ZodType;
};

function getFieldType(field: z.ZodType): DBFieldType {
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

function toFieldSchema(field: z.ZodType): DBFieldAttribute {
  const metadata = getSchemaMetadata(field);

  const result: DBFieldAttribute = {
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

function toResourceSchema(resource: ResourceWithSchema, name: string) {
  if (!(resource.schema instanceof z.ZodObject)) {
    throw new Error(`Resource "${name}" must use schema.object(...)`);
  }

  const fields: Record<string, ReturnType<typeof toFieldSchema>> = {};

  for (const [fieldName, field] of Object.entries(resource.schema.shape)) {
    fields[fieldName] = toFieldSchema(field);
  }

  const metadata = getSchemaMetadata(resource.schema);

  const modelName = typeof metadata.table === "string" ? metadata.table : name;

  return {
    fields,
    modelName,
  };
}

export function toBetterAuthSchema(
  resources: Record<string, ResourceWithSchema>,
): BetterAuthSchema {
  const schema: BetterAuthSchema = {};

  for (const [name, resource] of Object.entries(resources)) {
    schema[name] = toResourceSchema(resource, name);
  }

  return schema;
}
