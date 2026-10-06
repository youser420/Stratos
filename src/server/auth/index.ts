import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { env } from "@/config/env";
import { prisma } from "@/server/db/prisma";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  // Better Auth rejects any request whose Origin header isn't baseURL or
  // listed here ("Invalid origin", 403). Vercel deployments regularly get
  // served from a URL that doesn't match whatever BETTER_AUTH_URL happens
  // to be set to in the dashboard (production alias, per-deploy preview
  // hash, a stale localhost value copied from .env, ...), so the wildcard
  // keeps sign-in/sign-up working across all of them without needing that
  // env var to be kept perfectly in sync. env.appUrl is included too, for
  // whatever NEXT_PUBLIC_APP_URL/BETTER_AUTH_URL is actually configured.
  trustedOrigins: [env.appUrl, "https://*.vercel.app"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // TODO: Replace with production email provider
      if (process.env.NODE_ENV === "development") {
        console.info(`[auth] Password reset link for ${user.email}: ${url}`);
      }
    },
  },
  plugins: [nextCookies()],
});
