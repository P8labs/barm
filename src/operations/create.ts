import { z } from "zod";
import { getBody } from "../utils.js";

import type {
  ResourceEndpointContext,
  ResourceManagerConstraint,
  ResourceResult,
} from "../types.js";
import { getSchemaMetadata } from "../resource/schema/meta.js";

function applyCreateDefaults(
  schema: z.ZodObject,
  data: Record<string, unknown>,
  userId: string | undefined,
): Record<string, unknown> {
  const result = {
    ...data,
  };

  for (const [fieldName, field] of Object.entries(
    schema.shape as Record<string, z.ZodType>,
  )) {
    const metadata = getSchemaMetadata(field);
    if (metadata.owner) {
      if (!userId) {
        throw new Error("Authentication required");
      }

      result[fieldName] = userId;
      continue;
    }

    if (
      metadata.autofill &&
      (metadata.autofill.mode === "create" ||
        metadata.autofill.mode === "createOrUpdate")
    ) {
      result[fieldName] = metadata.autofill.generate();
    }
  }

  return result;
}

export async function createResource(
  ctx: ResourceEndpointContext,
  resource: ResourceManagerConstraint,
  name: string,
): Promise<ResourceResult<Record<string, unknown>>> {
  const body = getBody(ctx.body);

  if (!(resource.schema instanceof z.ZodObject)) {
    throw new Error(`Resource "${name}" must use schema.object(...)`);
  }

  console.log("body", ctx.context.session);
  const data = applyCreateDefaults(
    resource.schema,
    body,
    ctx.context.session?.user.id,
  );

  const result = resource.schema.safeParse(data);

  if (!result.success) {
    return {
      data: {
        issues: result.error.issues,
      },
      error: "Invalid input",
      status: 400,
    };
  }

  const record = (await ctx.context.adapter.create({
    model: name,
    data: result.data,
  })) as Record<string, unknown>;

  return {
    data: record,
    status: 201,
  };
}
