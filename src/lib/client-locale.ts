import { LOCALE_LANG_COOKIE, LOCALE_LANG_KEY } from "@/lib/storage-keys";

export type SupportedLocaleLang = "en" | "pt";

export const LOCALE_CHANGE_EVENT = "umacraft:locale:changed";
const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function normalizeLocaleLang(rawLang: string | null | undefined): SupportedLocaleLang {
  const normalizedLang = rawLang?.toLowerCase() ?? "en";
  return normalizedLang.startsWith("pt") ? "pt" : "en";
}

export function getCurrentClientLocaleLang(): SupportedLocaleLang {
  if (typeof document === "undefined") {
    return "en";
  }

  return normalizeLocaleLang(document.documentElement.lang);
}

function persistLocaleCookie(nextLang: SupportedLocaleLang): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie =
    `${LOCALE_LANG_COOKIE}=${nextLang}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function initializeClientLocale(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const storedLang = window.localStorage.getItem(LOCALE_LANG_KEY);
  if (!storedLang) {
    return false;
  }

  const normalizedStoredLang = normalizeLocaleLang(storedLang);
  const hasChanged = document.documentElement.lang !== normalizedStoredLang;

  document.documentElement.lang = normalizedStoredLang;
  persistLocaleCookie(normalizedStoredLang);
  return hasChanged;
}

export function setClientLocaleLang(nextLang: SupportedLocaleLang): void {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedLang = normalizeLocaleLang(nextLang);
  document.documentElement.lang = normalizedLang;
  window.localStorage.setItem(LOCALE_LANG_KEY, normalizedLang);
  persistLocaleCookie(normalizedLang);
  window.dispatchEvent(
    new CustomEvent<{ lang: SupportedLocaleLang }>(LOCALE_CHANGE_EVENT, {
      detail: { lang: normalizedLang },
    }),
  );
}
