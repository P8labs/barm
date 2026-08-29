import type z from "zod";

export type AutofillMode = "create" | "update" | "createOrUpdate";

export type OwnedSchema<T extends z.ZodType> = T & {
  readonly __resourceOwner: true;
};

export type AutofilledSchema<T extends z.ZodType> = T & {
  readonly __resourceAutofill: true;
};

export type SchemaMetadata = {
  primaryKey?: boolean;
  unique?: boolean;
  table?: string;
  index?: boolean;

  references?: {
    resource: string;
    field: string;
  };

  owner?: boolean;

  autofill?: {
    mode: AutofillMode;
    generate: () => unknown;
  };
};

export type StringSchema = z.ZodString & {
  primaryKey(): StringSchema;
  unique(): StringSchema;
  index(): StringSchema;

  references(reference: `${string}.${string}`): StringSchema;

  owner(): OwnedSchema<StringSchema>;

  autofill(
    generate: () => string,
    mode?: AutofillMode,
  ): AutofilledSchema<StringSchema>;
};

export type NumberSchema = z.ZodNumber & {
  unique(): NumberSchema;
  index(): NumberSchema;

  owner(): OwnedSchema<NumberSchema>;

  autofill(
    generate: () => number,
    mode?: AutofillMode,
  ): AutofilledSchema<NumberSchema>;
};

export type BooleanSchema = z.ZodBoolean & {
  index(): BooleanSchema;

  owner(): OwnedSchema<BooleanSchema>;

  autofill(
    generate: () => boolean,
    mode?: AutofillMode,
  ): AutofilledSchema<BooleanSchema>;
};

export type DateSchema = z.ZodDate & {
  index(): DateSchema;

  owner(): OwnedSchema<DateSchema>;

  autofill(
    generate: () => Date,
    mode?: AutofillMode,
  ): AutofilledSchema<DateSchema>;
};

type ResourceSchema = z.ZodObject<any>;

type IsServerManaged<T> = T extends { readonly __resourceOwner: true }
  ? true
  : T extends { readonly __resourceAutofill: true }
    ? true
    : false;

type ResourceInputKeys<TShape> = {
  [K in keyof TShape]: IsServerManaged<TShape[K]> extends true ? never : K;
}[keyof TShape];

export type ResourceCreateInput<TSchema extends ResourceSchema> = z.input<
  z.ZodObject<{
    [K in ResourceInputKeys<TSchema["shape"]>]: TSchema["shape"][K];
  }>
>;

export type ResourceUpdateInput<TSchema extends ResourceSchema> = Partial<
  ResourceCreateInput<TSchema>
>;
