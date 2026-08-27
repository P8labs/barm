import { z } from "zod";
export declare function getCreateSchema(schema: z.ZodType): z.ZodObject;
export declare function getUpdateSchema(schema: z.ZodType): z.ZodObject;
export declare function validateCreate(schema: z.ZodType, data: unknown): z.ZodSafeParseResult<Record<string, unknown>>;
export declare function validateUpdate(schema: z.ZodType, data: unknown): z.ZodSafeParseResult<Record<string, unknown>>;
//# sourceMappingURL=validation.d.ts.map