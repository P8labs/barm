export async function getResource(ctx, resource) {
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
    }));
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
//# sourceMappingURL=get.js.map