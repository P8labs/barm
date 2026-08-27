import { z } from "zod";
import type { BooleanSchema, DateSchema, NumberSchema, SchemaMetadata, StringSchema } from "./types.js";
export declare function getSchemaMetadata(schema: z.ZodType): SchemaMetadata;
export declare const schema: {
    string(): StringSchema;
    number(): NumberSchema;
    boolean(): BooleanSchema;
    date(): DateSchema;
    object<T extends z.ZodRawShape>(shape: T): z.ZodObject<{ -readonly [P in keyof T]: T[P]; }, z.core.$strip> & {
        table(name: string): z.ZodObject<{ -readonly [P in keyof T]: T[P]; }, z.core.$strip>;
    };
};
//# sourceMappingURL=index.d.ts.map