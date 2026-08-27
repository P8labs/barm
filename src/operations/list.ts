import type { ResourceEndpointContext, ResourceResult } from "./../types.js";

export type ListResourceOptions = {
  page: number;
  limit: number;
};

export async function listResource(
  ctx: ResourceEndpointContext,
  resourceName: string,
  options: ListResourceOptions,
): Promise<
  ResourceResult<{
    data: Record<string, unknown>[];
    pagination: {
      page: number;
      limit: number;
      hasMore: boolean;
    };
  }>
> {
  const offset = (options.page - 1) * options.limit;

  const records = (await ctx.context.adapter.findMany({
    model: resourceName,
    limit: options.limit + 1,
    join: {},
    offset,
  })) as Record<string, unknown>[];

  const hasMore = records.length > options.limit;

  if (hasMore) {
    records.pop();
  }

  return {
    data: {
      data: records,
      pagination: {
        page: options.page,
        limit: options.limit,
        hasMore,
      },
    },
    status: 200,
  };
}
