import { z } from "zod";
import type { SchemaMetadata } from "./types.js";
export declare function getSchemaMetadata(schema: z.ZodType): SchemaMetadata;
export declare function getObjectFields(schema: z.ZodType): Record<string, z.ZodType>;
//# sourceMappingURL=metadata.d.ts.map