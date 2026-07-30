"use client";

import { hasAnalyticsConsent } from "@/features/legal/lib/cookie-consent";

/**
 * Initializes optional analytics scripts only when the user has accepted
 * analytics cookies. Provider integration is TODO until ANALYTICS_* env is set.
 */
export function initAnalyticsIfConsented() {
  if (!hasAnalyticsConsent()) {
    return;
  }

  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  if (!analyticsId) {
    return;
  }

  // TODO: Load analytics provider (e.g. Plausible, PostHog, GA4) when configured.
  if (process.env.NODE_ENV === "development") {
    console.info("[analytics] Consent granted; provider not configured yet.");
  }
}
