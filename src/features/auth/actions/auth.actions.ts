"use server";

import { cookies } from "next/headers";

import { ONBOARDING_COMPLETE_COOKIE } from "@/config/onboarding";
import { getPostAuthRedirectPath, isOnboardingComplete } from "@/server/auth/onboarding-gate";
import { getServerSession } from "@/server/auth/session";

const onboardingCompleteCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

function isSafeRelativePath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//");
}

export async function syncOnboardingCompleteCookie() {
  const session = await getServerSession();
  const cookieStore = await cookies();

  if (!session?.user) {
    cookieStore.delete(ONBOARDING_COMPLETE_COOKIE);
    return;
  }

  const complete = await isOnboardingComplete(session.user.id);

  if (complete) {
    cookieStore.set(ONBOARDING_COMPLETE_COOKIE, "1", onboardingCompleteCookieOptions);
  } else {
    cookieStore.delete(ONBOARDING_COMPLETE_COOKIE);
  }
}

export async function clearOnboardingCompleteCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ONBOARDING_COMPLETE_COOKIE);
}

export async function resolvePostAuthRedirect(
  callbackUrl?: string | null,
): Promise<string> {
  const session = await getServerSession();

  if (!session?.user) {
    return "/login";
  }

  await syncOnboardingCompleteCookie();

  const defaultPath = await getPostAuthRedirectPath(session.user.id);

  if (!callbackUrl || !isSafeRelativePath(callbackUrl)) {
    return defaultPath;
  }

  const onboardingComplete = defaultPath === "/home";

  if (onboardingComplete && callbackUrl.startsWith("/onboarding")) {
    return "/home";
  }

  return callbackUrl;
}
