import type { Session } from "better-auth";
import type { ZodType } from "zod";
import type { AuthContext, EndpointContext } from "better-auth";
export type ResourceEndpointContext = EndpointContext<string, {
    method: "GET" | "POST" | "PATCH" | "DELETE";
}, AuthContext, Record<string, string | undefined> | undefined>;
export type ResourceResult<T = unknown> = {
    data: T;
    status: number;
};
export type ResourceOperation = "list" | "get" | "create" | "update" | "delete";
export type ListAccessContext = {
    session: Session;
};
export type GetAccessContext<TRecord> = {
    session: Session;
    record: TRecord;
};
export type CreateAccessContext<TData> = {
    session: Session;
    data: TData;
};
export type UpdateAccessContext<TRecord, TData> = {
    session: Session;
    record: TRecord;
    data: TData;
};
export type DeleteAccessContext<TRecord> = {
    session: Session;
    record: TRecord;
};
export type ResourceAccess<TRecord = unknown, TData = unknown> = {
    list?: boolean | ((ctx: ListAccessContext) => boolean | Promise<boolean>);
    get?: boolean | ((ctx: GetAccessContext<TRecord>) => boolean | Promise<boolean>);
    create?: boolean | ((ctx: CreateAccessContext<TData>) => boolean | Promise<boolean>);
    update?: boolean | ((ctx: UpdateAccessContext<TRecord, TData>) => boolean | Promise<boolean>);
    delete?: boolean | ((ctx: DeleteAccessContext<TRecord>) => boolean | Promise<boolean>);
};
export type Resource<TSchema extends ZodType> = {
    schema: TSchema;
    access?: ResourceAccess<TSchema["_output"], TSchema["_input"]>;
};
export type ResourceManagerConstraint = {
    schema: ZodType;
    access?: object;
};
export type ResourceOptions<TResources extends Record<string, ResourceManagerConstraint>> = {
    resources: TResources;
};
//# sourceMappingURL=types.d.ts.map