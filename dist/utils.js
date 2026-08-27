export function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
export function getPagination(query) {
    const page = Math.max(1, Number(query?.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query?.limit ?? 20)));
    return {
        page,
        limit,
    };
}
export function getBody(body) {
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
        throw new Error("Request body must be an object");
    }
    return body;
}
//# sourceMappingURL=utils.js.map