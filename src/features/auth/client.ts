"use client";

import { createAuthClient } from "better-auth/react";

/**
 * NEXT_PUBLIC_APP_URL is inlined at build time, so it only helps when it's
 * explicitly set for that specific build (brittle on Vercel, where preview
 * deployments each get their own URL). Falling back to the browser's own
 * origin instead means sign-in/sign-up always hit the same host the page
 * was served from — same-origin, no CORS, no per-deployment env var to
 * keep in sync. The localhost fallback only applies during SSR/build,
 * before `window` exists.
 */
function resolveBaseURL() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: resolveBaseURL(),
});

export const { signIn, signUp, signOut, useSession, requestPasswordReset } =
  authClient;
