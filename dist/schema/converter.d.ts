import { z } from "zod";
import type { BetterAuthPlugin } from "better-auth";
type BetterAuthSchema = NonNullable<BetterAuthPlugin["schema"]>;
type ResourceWithSchema = {
    schema: z.ZodType;
};
export declare function toBetterAuthSchema(resources: Record<string, ResourceWithSchema>): BetterAuthSchema;
export {};
//# sourceMappingURL=converter.d.ts.map