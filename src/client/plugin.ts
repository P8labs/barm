import type { BetterAuthClientPlugin } from "better-auth/client";
import type { ResourceManagerConstraint } from "../types.js";
import type {
  ResourceManagerActions,
  ResourceManagerClientOptions,
  ResourceManagerGetActions,
} from "./types.js";

export function resourceManagerClient<
  TResources extends Record<string, ResourceManagerConstraint>,
>(options: ResourceManagerClientOptions<TResources>) {
  const getActions: ResourceManagerGetActions<TResources> = ($fetch) => {
    const resourceManager =
      {} as ResourceManagerActions<TResources>["resourceManager"];

    for (const name of Object.keys(options.resources) as Array<
      keyof TResources
    >) {
      const resourceName = String(name);

      resourceManager[name] = {
        list: async (params) =>
          $fetch(`/resource/${resourceName}`, {
            method: "GET",
            query: params,
          }),

        get: async ({ id }) =>
          $fetch(`/resource/${resourceName}/${id}`, {
            method: "GET",
          }),

        create: async (data) =>
          $fetch(`/resource/${resourceName}`, {
            method: "POST",
            body: data,
          }),

        update: async ({ id, data }) =>
          $fetch(`/resource/${resourceName}/${id}`, {
            method: "POST",
            params: {
              id,
            },
            body: data,
          }),

        delete: async ({ id }) =>
          $fetch(`/resource/${resourceName}/${id}`, {
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
  } satisfies BetterAuthClientPlugin;
}
