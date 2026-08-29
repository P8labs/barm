import {
  resource,
  schema,
} from "@p8labs/better-auth-resource-manager/resource";
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

    title: schema.string().index(),
    completed: schema.boolean(),

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

    update: ({ record, session }) => {
      if (record.userId !== session.userId) {
        // throw new Error("You are not authorized to update this todo.");
        return false;
      }
      return true;
    },
  },
});

export const resources = {
  todo: todo,
};
