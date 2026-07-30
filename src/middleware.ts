import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import {
  ONBOARDING_COMPLETE_COOKIE,
  ONBOARDING_COMPLETE_PATH,
} from "@/config/onboarding";

const GUEST_ONLY_ROUTES = ["/login", "/signup", "/forgot-password"] as const;
const PATHNAME_HEADER = "x-pathname";

function isGuestOnlyRoute(pathname: string) {
  return GUEST_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isOnboardingRoute(pathname: string) {
  return pathname === "/onboarding" || pathname.startsWith("/onboarding/");
}

function redirectTo(request: NextRequest, pathname: string, search?: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = search ?? "";
  return NextResponse.redirect(url);
}

function continueWithPathname(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(PATHNAME_HEADER, request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(getSessionCookie(request));
  const onboardingComplete =
    request.cookies.get(ONBOARDING_COMPLETE_COOKIE)?.value === "1";

  if (!hasSession && isOnboardingRoute(pathname)) {
    const callbackUrl = encodeURIComponent(`${pathname}${request.nextUrl.search}`);
    return redirectTo(request, "/login", `callbackUrl=${callbackUrl}`);
  }

  if (hasSession && isGuestOnlyRoute(pathname)) {
    return continueWithPathname(request);
  }

  if (
    hasSession &&
    onboardingComplete &&
    isOnboardingRoute(pathname) &&
    pathname !== ONBOARDING_COMPLETE_PATH
  ) {
    return redirectTo(request, "/dashboard");
  }

  return continueWithPathname(request);
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-email",
    "/onboarding",
    "/onboarding/:path*",
  ],
};
