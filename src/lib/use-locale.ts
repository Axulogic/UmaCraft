"use client";

import { useMemo } from "react";

import { useLocaleContext } from "@/components/providers/locale-provider";
import { localizePath } from "@/lib/locale";

export function useLocale() {
  return useLocaleContext().locale;
}

export function useLocaleCode() {
  return useLocaleContext().localeCode;
}

export function useLocalizedPath(href: string) {
  const { localeCode } = useLocaleContext();

  return useMemo(() => localizePath(href, localeCode), [href, localeCode]);
}
