import { z } from "zod";
export declare function getCreateSchema(schema: z.ZodType): z.ZodObject<z.core.$ZodLooseShape, z.core.$strip>;
export declare function getUpdateSchema(schema: z.ZodType): z.ZodObject<{
    [x: string]: z.ZodOptional<any>;
}, z.core.$strip>;
//# sourceMappingURL=input.d.ts.map