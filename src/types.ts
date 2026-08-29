import type { ZodObject } from "zod";
import type { AuthContext, EndpointContext } from "better-auth";

export type ResourceEndpointContext = EndpointContext<
  string,
  {
    method: "GET" | "POST" | "PATCH" | "DELETE";
  },
  AuthContext,
  Record<string, string | undefined> | undefined
>;

export type ResourceResult<T = unknown> = {
  data: T;
  status: number;
  error?: string;
};

export type ResourceOperation = "list" | "get" | "create" | "update" | "delete";

export type ResourceManagerConstraint = {
  schema: ZodObject<any>;
  access?: object;
};

export type ResourceOptions<
  TResources extends Record<string, ResourceManagerConstraint>,
> = {
  resources: TResources;
};
