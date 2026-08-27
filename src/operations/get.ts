import type { ResourceEndpointContext, ResourceResult } from "../types.js";

export async function getResource(
  ctx: ResourceEndpointContext,
  resource: string,
): Promise<ResourceResult<Record<string, unknown> | null>> {
  const id = ctx.params?.id;

  if (!id) {
    return {
      data: {
        error: "Missing resource id",
      },
      status: 400,
    };
  }

  const record = (await ctx.context.adapter.findOne({
    model: resource,
    where: [
      {
        field: "id",
        operator: "eq",
        value: id,
      },
    ],
  })) as Record<string, unknown> | null;

  if (!record) {
    return {
      data: null,
      status: 404,
    };
  }

  return {
    data: record,
    status: 200,
  };
}
