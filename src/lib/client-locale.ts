import { LOCALE_LANG_KEY } from "@/lib/storage-keys";

export type SupportedLocaleLang = "en" | "pt";

export const LOCALE_CHANGE_EVENT = "umacraft:locale:changed";

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

export function initializeClientLocale(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const storedLang = window.localStorage.getItem(LOCALE_LANG_KEY);
  if (!storedLang) {
    return false;
  }

  const normalizedStoredLang = normalizeLocaleLang(storedLang);
  if (document.documentElement.lang === normalizedStoredLang) {
    return false;
  }

  document.documentElement.lang = normalizedStoredLang;
  return true;
}

export function setClientLocaleLang(nextLang: SupportedLocaleLang): void {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedLang = normalizeLocaleLang(nextLang);
  document.documentElement.lang = normalizedLang;
  window.localStorage.setItem(LOCALE_LANG_KEY, normalizedLang);
  window.dispatchEvent(
    new CustomEvent<{ lang: SupportedLocaleLang }>(LOCALE_CHANGE_EVENT, {
      detail: { lang: normalizedLang },
    }),
  );
}

