import { z } from "zod";
import type {
  BooleanSchema,
  DateSchema,
  InputMode,
  NumberSchema,
  SchemaMetadata,
  StringSchema,
  AutofillMode,
} from "./types.js";

const metadataStore = new WeakMap<z.ZodType, SchemaMetadata>();

export function getSchemaMetadata(schema: z.ZodType): SchemaMetadata {
  return metadataStore.get(schema) ?? {};
}

function withMetadata<T extends z.ZodType>(
  schema: T,
  metadata: SchemaMetadata,
): T {
  const current = metadataStore.get(schema) ?? {};

  metadataStore.set(schema, {
    ...current,
    ...metadata,
  });

  return schema;
}

const DEFAULT_AUTOFILL_MODE: AutofillMode = "create";

export const schema = {
  string(): StringSchema {
    const value = z.string();

    return Object.assign(value, {
      input(mode: InputMode) {
        return withMetadata(value, {
          input: mode,
        });
      },

      primaryKey() {
        return withMetadata(value, {
          primaryKey: true,
        });
      },

      unique() {
        return withMetadata(value, {
          unique: true,
        });
      },

      index() {
        return withMetadata(value, {
          index: true,
        });
      },

      references(reference: `${string}.${string}`) {
        const separator = reference.indexOf(".");

        if (separator === -1) {
          throw new Error(
            `Invalid reference "${reference}". Expected "resource.field".`,
          );
        }

        return withMetadata(value, {
          references: {
            resource: reference.slice(0, separator),
            field: reference.slice(separator + 1),
          },
        });
      },

      owner() {
        return withMetadata(value, {
          owner: true,
        });
      },

      autofill(
        generate: () => string,
        mode: AutofillMode = DEFAULT_AUTOFILL_MODE,
      ) {
        return withMetadata(value, {
          autofill: {
            mode,
            generate,
          },
        });
      },
    }) as StringSchema;
  },

  number(): NumberSchema {
    const value = z.number();

    return Object.assign(value, {
      input(mode: InputMode) {
        return withMetadata(value, {
          input: mode,
        });
      },

      unique() {
        return withMetadata(value, {
          unique: true,
        });
      },

      index() {
        return withMetadata(value, {
          index: true,
        });
      },

      owner() {
        return withMetadata(value, {
          owner: true,
        });
      },

      autofill(
        generate: () => number,
        mode: AutofillMode = DEFAULT_AUTOFILL_MODE,
      ) {
        return withMetadata(value, {
          autofill: {
            mode,
            generate,
          },
        });
      },
    }) as NumberSchema;
  },

  boolean(): BooleanSchema {
    const value = z.boolean();

    return Object.assign(value, {
      input(mode: InputMode) {
        return withMetadata(value, {
          input: mode,
        });
      },

      index() {
        return withMetadata(value, {
          index: true,
        });
      },

      owner() {
        return withMetadata(value, {
          owner: true,
        });
      },

      autofill(
        generate: () => boolean,
        mode: AutofillMode = DEFAULT_AUTOFILL_MODE,
      ) {
        return withMetadata(value, {
          autofill: {
            mode,
            generate,
          },
        });
      },
    }) as BooleanSchema;
  },

  date(): DateSchema {
    const value = z.date();

    return Object.assign(value, {
      input(mode: InputMode) {
        return withMetadata(value, {
          input: mode,
        });
      },

      index() {
        return withMetadata(value, {
          index: true,
        });
      },

      owner() {
        return withMetadata(value, {
          owner: true,
        });
      },

      autofill(
        generate: () => Date,
        mode: AutofillMode = DEFAULT_AUTOFILL_MODE,
      ) {
        return withMetadata(value, {
          autofill: {
            mode,
            generate,
          },
        });
      },
    }) as DateSchema;
  },

  object<T extends z.ZodRawShape>(shape: T) {
    const value = z.object(shape);

    return Object.assign(value, {
      table(name: string) {
        return withMetadata(value, {
          table: name,
        });
      },
    });
  },
};
