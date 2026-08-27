import type { ResourceManagerConstraint } from "../types.js";

export type ResourceClient<TResource extends ResourceManagerConstraint> = {
  list: (params?: {
    page?: number;
    limit?: number;
  }) => Promise<TResource["schema"]["_output"][]>;

  get: (params: { id: string }) => Promise<TResource["schema"]["_output"]>;

  create: (
    data: TResource["schema"]["_input"],
  ) => Promise<TResource["schema"]["_output"]>;

  update: (params: {
    id: string;
    data: TResource["schema"]["_input"];
  }) => Promise<TResource["schema"]["_output"]>;

  delete: (params: { id: string }) => Promise<void>;
};

export type ResourceManagerActions<
  TResources extends Record<string, ResourceManagerConstraint>,
> = {
  resourceManager: {
    [K in keyof TResources]: ResourceClient<TResources[K]>;
  };
};
