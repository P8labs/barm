import type { ResourceOperation } from "../types.js";

type EndpointDefinition = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: (name: string) => string;
};

export const endpointDefinitions: Record<
  ResourceOperation,
  EndpointDefinition
> = {
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
