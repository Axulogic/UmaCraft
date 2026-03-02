import { enUSLocale } from "@/Locale/en-US";
import { ptBRLocale } from "@/Locale/pt-BR";
import type { LocaleSchema } from "@/types/locale";

function resolveLocaleFromLang(rawLang: string | null | undefined): LocaleSchema {
  const normalizedLang = rawLang?.toLowerCase() ?? "en";
  return normalizedLang.startsWith("pt") ? ptBRLocale : enUSLocale;
}

export function getLocale(): LocaleSchema {
  if (typeof document !== "undefined") {
    return resolveLocaleFromLang(document.documentElement.lang);
  }

  return resolveLocaleFromLang("en");
}
