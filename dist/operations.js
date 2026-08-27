const operations = {
    list: {
        method: "GET",
        path: (name) => `/resources/${name}`,
    },
    get: {
        method: "GET",
        path: (name) => `/resources/${name}/:id`,
    },
    create: {
        method: "POST",
        path: (name) => `/resources/${name}`,
    },
    update: {
        method: "PATCH",
        path: (name) => `/resources/${name}/:id`,
    },
    delete: {
        method: "DELETE",
        path: (name) => `/resources/${name}/:id`,
    },
};
export {};
//# sourceMappingURL=operations.js.map