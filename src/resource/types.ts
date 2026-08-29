import type { Session } from "better-auth";
import type { ZodType } from "zod";

export type ResourceAccess<TRecord = unknown, TData = unknown> = {
  list?: boolean | ((ctx: ListAccessContext) => boolean | Promise<boolean>);
  get?:
    | boolean
    | ((ctx: GetAccessContext<TRecord>) => boolean | Promise<boolean>);
  create?:
    | boolean
    | ((ctx: CreateAccessContext<TData>) => boolean | Promise<boolean>);
  update?:
    | boolean
    | ((
        ctx: UpdateAccessContext<TRecord, TData>,
      ) => boolean | Promise<boolean>);
  delete?:
    | boolean
    | ((ctx: DeleteAccessContext<TRecord>) => boolean | Promise<boolean>);
};

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

export type Resource<TSchema extends ZodType> = {
  schema: TSchema;
  access?: ResourceAccess<TSchema["_output"], TSchema["_input"]>;
};
