import type { BetterAuthPlugin } from "better-auth";
import type {
  ResourceManagerConstraint,
  ResourceOperation,
  ResourceOptions,
} from "./types.js";
import { createAuthEndpoint } from "better-auth/api";
import { toBetterAuthSchema } from "./schema/converter.js";
import { capitalize, getPagination } from "./utils.js";
import { endpointDefinitions } from "./core/endpoints.js";
import {
  createResource,
  deleteResource,
  getResource,
  listResource,
  updateResource,
} from "./operations/index.js";

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

          return ctx.json(result.data, {
            status: result.status,
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
