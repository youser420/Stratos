import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().optional(),
});

function createEnv() {
  const server = serverEnvSchema.safeParse(process.env);

  if (!server.success) {
    throw new Error(
      `Invalid server environment variables: ${server.error.message}`,
    );
  }

  const client = clientEnvSchema.safeParse(process.env);

  if (!client.success) {
    throw new Error(
      `Invalid client environment variables: ${client.error.message}`,
    );
  }

  return {
    ...server.data,
    ...client.data,
    appUrl: client.data.NEXT_PUBLIC_APP_URL ?? server.data.BETTER_AUTH_URL,
  };
}

export const env = createEnv();

export type Env = ReturnType<typeof createEnv>;
