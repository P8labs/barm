import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { resourceManager } from "@p8labs/better-auth-resource-manager";
import { resources } from "./resources";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [
    resourceManager({
      resources,
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
