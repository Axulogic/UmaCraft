import { enUSLocale } from "@/Locale/en-US";
import { ptBRLocale } from "@/Locale/pt-BR";
import type { LocaleSchema } from "@/types/locale";

export type AppLocaleCode = "en-US" | "pt-BR";

export const DEFAULT_LOCALE_CODE: AppLocaleCode = "en-US";
const PT_BR_PREFIX = "/pt-br";
const NON_LOCALIZED_PATH_PREFIXES = ["/partner/"] as const;

const LOCALE_CONFIG = {
  "en-US": {
    htmlLang: "en",
    openGraphLocale: "en_US",
    pathPrefix: "",
    locale: enUSLocale,
  },
  "pt-BR": {
    htmlLang: "pt-BR",
    openGraphLocale: "pt_BR",
    pathPrefix: PT_BR_PREFIX,
    locale: ptBRLocale,
  },
} as const;

function splitHref(href: string) {
  const match = href.match(/^([^?#]*)(.*)$/);
  return {
    pathname: match?.[1] || "/",
    suffix: match?.[2] || "",
  };
}

function normalizePathname(pathname: string) {
  if (!pathname || pathname === PT_BR_PREFIX) {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocaleDefinition(localeCode: AppLocaleCode): LocaleSchema {
  return LOCALE_CONFIG[localeCode].locale;
}

export function getHtmlLang(localeCode: AppLocaleCode) {
  return LOCALE_CONFIG[localeCode].htmlLang;
}

export function getOpenGraphLocale(localeCode: AppLocaleCode) {
  return LOCALE_CONFIG[localeCode].openGraphLocale;
}

export function getLocalePathPrefix(localeCode: AppLocaleCode) {
  return LOCALE_CONFIG[localeCode].pathPrefix;
}

export function stripLocalePrefix(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === PT_BR_PREFIX) {
    return "/";
  }

  if (normalizedPathname.startsWith(`${PT_BR_PREFIX}/`)) {
    return normalizedPathname.slice(PT_BR_PREFIX.length) || "/";
  }

  return normalizedPathname;
}

export function localizePath(href: string, localeCode: AppLocaleCode) {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const { pathname, suffix } = splitHref(href);
  if (NON_LOCALIZED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return href;
  }
  const normalizedPathname = stripLocalePrefix(pathname);

  if (localeCode === "pt-BR") {
    return normalizedPathname === "/"
      ? `${PT_BR_PREFIX}${suffix}`
      : `${PT_BR_PREFIX}${normalizedPathname}${suffix}`;
  }

  return `${normalizedPathname}${suffix}`;
}

export function switchLocalePath(pathname: string | null, localeCode: AppLocaleCode) {
  return localizePath(stripLocalePrefix(pathname ?? "/"), localeCode);
}

export function getAlternateLocaleCode(localeCode: AppLocaleCode): AppLocaleCode {
  return localeCode === "en-US" ? "pt-BR" : "en-US";
}
