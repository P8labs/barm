import { validateUpdate } from "../schema/validation.js";
export async function updateResource(ctx, resource, name) {
    const id = ctx.params?.id;
    if (!id) {
        return {
            data: {
                error: "Missing resource id",
            },
            status: 400,
        };
    }
    const result = validateUpdate(resource.schema, ctx.body);
    if (!result.success) {
        return {
            data: {
                error: "Invalid input",
                issues: result.error.issues,
            },
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
    }));
    return {
        data: record,
        status: 200,
    };
}
//# sourceMappingURL=update.js.map