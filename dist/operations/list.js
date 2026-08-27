export async function listResource(ctx, resourceName, options) {
    const offset = (options.page - 1) * options.limit;
    const records = (await ctx.context.adapter.findMany({
        model: resourceName,
        limit: options.limit + 1,
        join: {},
        offset,
    }));
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
//# sourceMappingURL=list.js.map