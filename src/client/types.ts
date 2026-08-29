import type { BetterAuthClientPlugin } from "better-auth";
import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from "../resource/schema/types.js";
import type { ResourceManagerConstraint } from "../types.js";

type ResourceClientResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: {
        message?: string;
        status: number;
        statusText: string;
      };
    };

type ResourceList<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ResourceClient<TResource extends ResourceManagerConstraint> = {
  list: (params?: {
    page?: number;
    limit?: number;
  }) => Promise<
    ResourceClientResponse<ResourceList<TResource["schema"]["_output"]>>
  >;

  get: (params: {
    id: string;
  }) => Promise<ResourceClientResponse<TResource["schema"]["_output"]>>;

  create: (
    data: ResourceCreateInput<TResource["schema"]>,
  ) => Promise<ResourceClientResponse<TResource["schema"]["_output"]>>;

  update: (params: {
    id: string;
    data: ResourceUpdateInput<TResource["schema"]>;
  }) => Promise<ResourceClientResponse<TResource["schema"]["_output"]>>;

  delete: (params: { id: string }) => Promise<ResourceClientResponse<unknown>>;
};

type BetterAuthGetActions = NonNullable<BetterAuthClientPlugin["getActions"]>;

export type ResourceManagerActions<
  TResources extends Record<string, ResourceManagerConstraint>,
> = {
  resourceManager: {
    [K in keyof TResources]: ResourceClient<TResources[K]>;
  };
};

export type ResourceManagerGetActions<
  TResources extends Record<string, ResourceManagerConstraint>,
> = (
  ...args: Parameters<BetterAuthGetActions>
) => ResourceManagerActions<TResources>;

export type ResourceManagerClientOptions<
  TResources extends Record<string, ResourceManagerConstraint>,
> = {
  resources: TResources;
};
