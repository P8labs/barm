import { z } from "zod";
const metadataStore = new WeakMap();
export function getSchemaMetadata(schema) {
    return metadataStore.get(schema) ?? {};
}
function withMetadata(schema, metadata) {
    const current = metadataStore.get(schema) ?? {};
    metadataStore.set(schema, {
        ...current,
        ...metadata,
    });
    return schema;
}
const DEFAULT_AUTOFILL_MODE = "create";
export const schema = {
    string() {
        const value = z.string();
        return Object.assign(value, {
            input(mode) {
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
            references(reference) {
                const separator = reference.indexOf(".");
                if (separator === -1) {
                    throw new Error(`Invalid reference "${reference}". Expected "resource.field".`);
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
            autofill(generate, mode = DEFAULT_AUTOFILL_MODE) {
                return withMetadata(value, {
                    autofill: {
                        mode,
                        generate,
                    },
                });
            },
        });
    },
    number() {
        const value = z.number();
        return Object.assign(value, {
            input(mode) {
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
            autofill(generate, mode = DEFAULT_AUTOFILL_MODE) {
                return withMetadata(value, {
                    autofill: {
                        mode,
                        generate,
                    },
                });
            },
        });
    },
    boolean() {
        const value = z.boolean();
        return Object.assign(value, {
            input(mode) {
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
            autofill(generate, mode = DEFAULT_AUTOFILL_MODE) {
                return withMetadata(value, {
                    autofill: {
                        mode,
                        generate,
                    },
                });
            },
        });
    },
    date() {
        const value = z.date();
        return Object.assign(value, {
            input(mode) {
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
            autofill(generate, mode = DEFAULT_AUTOFILL_MODE) {
                return withMetadata(value, {
                    autofill: {
                        mode,
                        generate,
                    },
                });
            },
        });
    },
    object(shape) {
        const value = z.object(shape);
        return Object.assign(value, {
            table(name) {
                return withMetadata(value, {
                    table: name,
                });
            },
        });
    },
};
//# sourceMappingURL=index.js.map