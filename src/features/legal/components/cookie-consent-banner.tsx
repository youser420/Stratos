"use client";

import Link from "next/link";
import { useState } from "react";

import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import {
  hasStoredCookieConsent,
  setCookieConsentPreference,
} from "@/features/legal/lib/cookie-consent";
import { initAnalyticsIfConsented } from "@/features/legal/lib/analytics";
import { cn } from "@/utils/cn";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(() => !hasStoredCookieConsent());

  function acceptConsent() {
    setCookieConsentPreference({
      analytics: true,
      updatedAt: new Date().toISOString(),
    });
    setVisible(false);
    initAnalyticsIfConsented();
  }

  function rejectOptionalCookies() {
    setCookieConsentPreference({
      analytics: false,
      updatedAt: new Date().toISOString(),
    });
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-4 shadow-lg"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Typography variant="muted" className="max-w-3xl">
          We use essential cookies for authentication and security. Optional analytics
          cookies help us improve the site only if you accept. See our{" "}
          <Link href="/cookies" className="text-foreground hover:underline">
            Cookie Policy
          </Link>
          .
        </Typography>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={rejectOptionalCookies}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={acceptConsent}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
