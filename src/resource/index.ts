import type { ZodType } from "zod";
import type { Resource, ResourceAccess } from "./types.js";
export { schema } from "./schema/index.js";

export function resource<TSchema extends ZodType>(options: {
  schema: TSchema;
  access?: ResourceAccess<TSchema["_output"], TSchema["_input"]>;
}): Resource<TSchema> {
  return Object.freeze({
    schema: options.schema,
    ...(options.access !== undefined
      ? {
          access: options.access,
        }
      : {}),
  });
}
