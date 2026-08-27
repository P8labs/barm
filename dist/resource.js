export function resource(options) {
    return Object.freeze({
        schema: options.schema,
        ...(options.access !== undefined
            ? {
                access: options.access,
            }
            : {}),
    });
}
//# sourceMappingURL=resource.js.map