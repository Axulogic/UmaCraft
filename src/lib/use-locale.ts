"use client";

import { useEffect, useState } from "react";

import { initializeClientLocale, LOCALE_CHANGE_EVENT } from "@/lib/client-locale";
import { getLocale } from "@/lib/locale";

export function useLocale() {
  const [, setLocaleRevision] = useState(0);

  useEffect(() => {
    if (initializeClientLocale()) {
      setLocaleRevision((current) => current + 1);
    }

    const onLocaleChange = () => {
      setLocaleRevision((current) => current + 1);
    };

    window.addEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
    return () => {
      window.removeEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
    };
  }, []);

  return getLocale();
}

