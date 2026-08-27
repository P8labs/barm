import { validateCreate } from "../schema/validation.js";
import { getBody } from "../utils.js";
export async function createResource(ctx, resource, name) {
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
    }));
    return {
        data: record,
        status: 201,
    };
}
//# sourceMappingURL=create.js.map