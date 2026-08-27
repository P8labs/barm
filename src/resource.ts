import type { ZodType } from "zod";
import type { Resource, ResourceAccess } from "./types.js";

export type CrudResourceOptions<TSchema extends ZodType> = {
  schema: TSchema;
  access?: ResourceAccess<TSchema["_output"], TSchema["_input"]>;
};

export function resource<TSchema extends ZodType>(
  options: CrudResourceOptions<TSchema>,
): Resource<TSchema> {
  return Object.freeze({
    schema: options.schema,
    ...(options.access !== undefined
      ? {
          access: options.access,
        }
      : {}),
  });
}
