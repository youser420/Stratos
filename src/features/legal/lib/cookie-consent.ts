export const COOKIE_CONSENT_STORAGE_KEY = "stratos-cookie-consent";

export type CookieConsentPreference = {
  analytics: boolean;
  updatedAt: string;
};

export function getCookieConsentPreference(): CookieConsentPreference | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as CookieConsentPreference;

    if (typeof parsed.analytics !== "boolean" || typeof parsed.updatedAt !== "string") {
      return null;
    }

    return parsed;
  } catch {
    if (raw === "accepted") {
      return { analytics: true, updatedAt: new Date(0).toISOString() };
    }

    return null;
  }
}

export function setCookieConsentPreference(preference: CookieConsentPreference) {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(preference));
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsentPreference()?.analytics === true;
}

export function hasStoredCookieConsent(): boolean {
  return getCookieConsentPreference() !== null;
}
