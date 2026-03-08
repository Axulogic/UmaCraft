"use client";

import { createContext, useContext } from "react";

import { getLocaleDefinition, type AppLocaleCode } from "@/lib/locale";
import type { LocaleSchema } from "@/types/locale";

type LocaleContextValue = {
  locale: LocaleSchema;
  localeCode: AppLocaleCode;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  localeCode,
}: {
  children: React.ReactNode;
  localeCode: AppLocaleCode;
}) {
  return (
    <LocaleContext.Provider
      value={{
        locale: getLocaleDefinition(localeCode),
        localeCode,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const value = useContext(LocaleContext);

  if (!value) {
    throw new Error("useLocaleContext must be used within LocaleProvider.");
  }

  return value;
}
