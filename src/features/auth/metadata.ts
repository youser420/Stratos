import "server-only";

import { buildPageMetadata } from "@/features/seo";

const noIndexDefaults = {
  noIndex: true,
} as const;

export const loginMetadata = buildPageMetadata({
  title: "Log In",
  description: "Log in to your Stratos account.",
  path: "/login",
  ...noIndexDefaults,
});

export const signUpMetadata = buildPageMetadata({
  title: "Sign Up",
  description: "Create your Stratos account and start onboarding.",
  path: "/signup",
  ...noIndexDefaults,
});

export const forgotPasswordMetadata = buildPageMetadata({
  title: "Forgot Password",
  description: "Reset your Stratos account password.",
  path: "/forgot-password",
  ...noIndexDefaults,
});

export const verifyEmailMetadata = buildPageMetadata({
  title: "Verify Email",
  description: "Verify your Stratos account email address.",
  path: "/verify-email",
  ...noIndexDefaults,
});
