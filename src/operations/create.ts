import { validateCreate } from "../schema/validation.js";
import { getBody } from "../utils.js";
import type {
  ResourceEndpointContext,
  ResourceManagerConstraint,
  ResourceResult,
} from "./../types.js";

export async function createResource(
  ctx: ResourceEndpointContext,
  resource: ResourceManagerConstraint,
  name: string,
): Promise<ResourceResult<Record<string, unknown>>> {
  const data = getBody(ctx.body);

  const result = validateCreate(resource.schema, ctx.body);

  if (!result.success) {
    return {
      data: {
        error: "Invalid input",
        issues: result.error.issues,
      },
      status: 400,
    };
  }

  const record = (await ctx.context.adapter.create({
    model: name,
    data,
  })) as Record<string, unknown>;

  return {
    data: record,
    status: 201,
  };
}
