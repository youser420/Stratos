"use client";

import dynamic from "next/dynamic";

export const CookieConsentBanner = dynamic(
  () =>
    import("@/features/legal/components/cookie-consent-banner").then(
      (module) => module.CookieConsentBanner,
    ),
  { ssr: false },
);
