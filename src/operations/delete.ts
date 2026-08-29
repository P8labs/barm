import type { ResourceEndpointContext, ResourceResult } from "../types.js";

export async function deleteResource(
  ctx: ResourceEndpointContext,
  resource: string,
): Promise<ResourceResult<Record<string, unknown>>> {
  const id = ctx.params?.id;

  if (!id) {
    return {
      data: {},
      error: "Missing resource id",
      status: 400,
    };
  }

  await ctx.context.adapter.delete({
    model: resource,
    where: [
      {
        field: "id",
        operator: "eq",
        value: id,
      },
    ],
  });

  return {
    data: {
      success: true,
    },
    status: 200,
  };
}
