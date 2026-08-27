import { resource, schema } from "@p8labs/better-auth-resource-manager";
/**
  required
    Client must provide it.

  optional
    Client may provide it.
*/

const todoSchema = schema
  .object({
    id: schema
      .string()
      .primaryKey()
      .autofill(() => crypto.randomUUID()),
    title: schema.string().input("required").index(),

    completed: schema.boolean().input("required"),

    userId: schema.string().references("user.id").owner(),

    createdAt: schema.date().autofill(() => new Date()),
    updatedAt: schema.date().autofill(() => new Date(), "createOrUpdate"),
  })
  .table("todo");

const todo = resource({
  schema: todoSchema,
  access: {
    create: ({ data, session }) => {
      return true;
    },
  },
});

export const resources = {
  todo: todo,
};
