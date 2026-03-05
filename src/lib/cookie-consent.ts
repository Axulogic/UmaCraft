import { COOKIE_CONSENT_KEY } from "@/lib/storage-keys";

export type CookieConsentState = {
  necessary: true;
  functional: boolean;
  performance: boolean;
  targeting: boolean;
};

export const COOKIE_CONSENT_UPDATED_EVENT = "umacraft:cookie-consent-updated";

export const DEFAULT_COOKIE_CONSENT: CookieConsentState = {
  necessary: true,
  functional: true,
  performance: true,
  targeting: true,
};

export function parseCookieConsent(raw: string | null): CookieConsentState {
  if (!raw) return DEFAULT_COOKIE_CONSENT;

  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsentState>;
    return {
      necessary: true,
      functional: parsed.functional !== false,
      performance: parsed.performance !== false,
      targeting: parsed.targeting !== false,
    };
  } catch {
    return DEFAULT_COOKIE_CONSENT;
  }
}

export function getStoredCookieConsent(): CookieConsentState {
  if (typeof window === "undefined") return DEFAULT_COOKIE_CONSENT;
  return parseCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_KEY));
}
