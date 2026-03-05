"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  COOKIE_CONSENT_UPDATED_EVENT,
  type CookieConsentState,
  getStoredCookieConsent,
} from "@/lib/cookie-consent";
import { COOKIE_CONSENT_KEY } from "@/lib/storage-keys";

const TELEMETRY_ENABLED = process.env.NEXT_PUBLIC_CF_TELEMETRY_ENABLED === "true";

function sendPageView(pathname: string): void {
  const payload = JSON.stringify({
    event: "page_view",
    path: pathname,
    ts: Date.now(),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/telemetry",
      new Blob([payload], { type: "application/json" })
    );
    return;
  }

  void fetch("/api/telemetry", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
    credentials: "omit",
    cache: "no-store",
  });
}

export function CloudflareTelemetry() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);
  const consentRef = useRef<CookieConsentState>(getStoredCookieConsent());

  useEffect(() => {
    const updateFromStorage = () => {
      consentRef.current = getStoredCookieConsent();
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== COOKIE_CONSENT_KEY) return;
      updateFromStorage();
    };

    const onConsentUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<CookieConsentState>;
      if (!customEvent.detail) {
        updateFromStorage();
        return;
      }
      consentRef.current = customEvent.detail;
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, onConsentUpdated as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, onConsentUpdated as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!TELEMETRY_ENABLED) return;
    if (!consentRef.current.performance) return;
    if (!pathname || lastPathRef.current === pathname) return;

    lastPathRef.current = pathname;
    sendPageView(pathname);
  }, [pathname]);

  return null;
}
