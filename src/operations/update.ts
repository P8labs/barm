import { z } from "zod";
import type {
  ResourceEndpointContext,
  ResourceManagerConstraint,
  ResourceResult,
} from "../types.js";
import { getBody } from "../utils.js";
import { getSchemaMetadata } from "../resource/schema/meta.js";

function applyUpdateDefaults(
  schema: z.ZodObject,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const result = {
    ...data,
  };

  for (const [fieldName, field] of Object.entries(
    schema.shape as Record<string, z.ZodType>,
  )) {
    const metadata = getSchemaMetadata(field);

    if (
      metadata.autofill &&
      (metadata.autofill.mode === "update" ||
        metadata.autofill.mode === "createOrUpdate")
    ) {
      result[fieldName] = metadata.autofill.generate();
    }
  }

  return result;
}

export async function updateResource(
  ctx: ResourceEndpointContext,
  resource: ResourceManagerConstraint,
  name: string,
): Promise<ResourceResult<Record<string, unknown>>> {
  const id = ctx.params?.id;

  if (!id) {
    return {
      data: {},
      error: "Missing resource id",
      status: 400,
    };
  }

  const body = getBody(ctx.body);

  if (!(resource.schema instanceof z.ZodObject)) {
    throw new Error(`Resource "${name}" must use schema.object(...)`);
  }

  const data = applyUpdateDefaults(resource.schema, body);

  const result = resource.schema.partial().safeParse(data);

  if (!result.success) {
    return {
      data: {
        issues: result.error.issues,
      },
      error: "Invalid input",
      status: 400,
    };
  }

  const record = (await ctx.context.adapter.update({
    model: name,
    where: [
      {
        field: "id",
        operator: "eq",
        value: id,
      },
    ],
    update: result.data,
  })) as Record<string, unknown>;

  return {
    data: record,
    status: 200,
  };
}
