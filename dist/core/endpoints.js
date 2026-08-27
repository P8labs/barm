export const endpointDefinitions = {
    list: {
        method: "GET",
        path: (name) => `/resource/${name}`,
    },
    get: {
        method: "GET",
        path: (name) => `/resource/${name}/:id`,
    },
    create: {
        method: "POST",
        path: (name) => `/resource/${name}`,
    },
    update: {
        method: "PATCH",
        path: (name) => `/resource/${name}/:id`,
    },
    delete: {
        method: "DELETE",
        path: (name) => `/resource/${name}/:id`,
    },
};
//# sourceMappingURL=endpoints.js.map