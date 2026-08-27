export function resourceManagerClient(options) {
    const getActions = ($fetch) => {
        const resourceManager = {};
        for (const name of Object.keys(options.resources)) {
            const resourceName = String(name);
            resourceManager[name] = {
                list: async (params) => $fetch(`/resource/${resourceName}`, {
                    method: "GET",
                    query: params,
                }),
                get: async ({ id }) => $fetch(`/resource/${resourceName}/${id}`, {
                    method: "GET",
                }),
                create: async (data) => $fetch(`/resource/${resourceName}`, {
                    method: "POST",
                    body: data,
                }),
                update: async ({ id, data }) => $fetch(`/resource/${resourceName}/${id}`, {
                    method: "PATCH",
                    params: {
                        id,
                    },
                    body: data,
                }),
                delete: async ({ id }) => $fetch(`/resource/${resourceName}/${id}`, {
                    method: "DELETE",
                }),
            };
        }
        return {
            resourceManager,
        };
    };
    return {
        id: "p8labs-better-auth-resource-manager",
        getActions,
    };
}
//# sourceMappingURL=plugin.js.map