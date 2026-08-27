import { z } from "zod";
export type ResourceReference = {
    field: string;
    resource: string;
    referenceField: string;
};
export declare function getResourceReferences(schema: z.ZodType): ResourceReference[];
//# sourceMappingURL=references.d.ts.map