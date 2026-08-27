import type z from "zod";
export type AutofillMode = "create" | "update" | "createOrUpdate";
export type SchemaMetadata = {
    primaryKey?: boolean;
    unique?: boolean;
    table?: string;
    input?: "required" | "optional" | "readonly";
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
export type InputMode = "required" | "optional" | "readonly";
export type StringSchema = z.ZodString & {
    input(mode: InputMode): StringSchema;
    primaryKey(): StringSchema;
    unique(): StringSchema;
    index(): StringSchema;
    references(reference: `${string}.${string}`): StringSchema;
    owner(): StringSchema;
    autofill(generate: () => string, mode?: AutofillMode): StringSchema;
};
export type NumberSchema = z.ZodNumber & {
    input(mode: InputMode): NumberSchema;
    unique(): NumberSchema;
    index(): NumberSchema;
    owner(): NumberSchema;
    autofill(generate: () => number, mode?: AutofillMode): NumberSchema;
};
export type BooleanSchema = z.ZodBoolean & {
    input(mode: InputMode): BooleanSchema;
    index(): BooleanSchema;
    owner(): BooleanSchema;
    autofill(generate: () => boolean, mode?: AutofillMode): BooleanSchema;
};
export type DateSchema = z.ZodDate & {
    input(mode: InputMode): DateSchema;
    index(): DateSchema;
    owner(): DateSchema;
    autofill(generate: () => Date, mode?: AutofillMode): DateSchema;
};
//# sourceMappingURL=types.d.ts.map