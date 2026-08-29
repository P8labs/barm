import type { BetterAuthPlugin } from "better-auth";
import type {
  ResourceManagerConstraint,
  ResourceOperation,
  ResourceOptions,
} from "./types.js";
import { createAuthEndpoint, sessionMiddleware } from "better-auth/api";
import { toBetterAuthSchema } from "./converter.js";
import { capitalize, getPagination } from "./utils.js";
import {
  createResource,
  deleteResource,
  getResource,
  listResource,
  updateResource,
} from "./operations/index.js";

type EndpointDefinition = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: (name: string) => string;
};

const endpointDefinitions: Record<ResourceOperation, EndpointDefinition> = {
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
    method: "POST",
    path: (name) => `/resource/${name}/:id`,
  },

  delete: {
    method: "DELETE",
    path: (name) => `/resource/${name}/:id`,
  },
};

export function resourceManager<
  TResources extends Record<string, ResourceManagerConstraint>,
>(options: ResourceOptions<TResources>): BetterAuthPlugin {
  const endpoints: BetterAuthPlugin["endpoints"] = {};

  for (const [name, resource] of Object.entries(options.resources)) {
    const access = {
      list: true,
      get: true,
      create: true,
      update: true,
      delete: true,
      ...(resource.access && typeof resource.access === "object"
        ? resource.access
        : {}),
    };

    for (const operation of Object.keys(
      endpointDefinitions,
    ) as ResourceOperation[]) {
      if (!access[operation]) {
        continue;
      }

      const definition = endpointDefinitions[operation];
      endpoints[`${name}${capitalize(operation)}`] = createAuthEndpoint(
        definition.path(name),
        {
          method: definition.method,
          use: [sessionMiddleware],
        },
        async (ctx) => {
          let result;

          switch (operation) {
            case "list":
              result = await listResource(ctx, name, getPagination(ctx.query));
              break;

            case "get":
              result = await getResource(ctx, name);
              break;

            case "create":
              result = await createResource(ctx, resource, name);
              break;

            case "update":
              result = await updateResource(ctx, resource, name);
              break;

            case "delete":
              result = await deleteResource(ctx, name);
              break;
          }

          if (result.status >= 400) {
            return ctx.error("BAD_REQUEST", {
              message: result?.error || "An error occurred",
            });
          }

          if (result.status == 200 || result.status == 201) {
            return ctx.json(result.data, {
              status: result.status,
            });
          }

          return ctx.error("INTERNAL_SERVER_ERROR", {
            message: result?.error || "An error occurred",
          });
        },
      );
    }
  }
  return {
    schema: toBetterAuthSchema(options.resources),
    id: "p8labs-better-auth-resource-manager",
    endpoints,
  } satisfies BetterAuthPlugin;
}
