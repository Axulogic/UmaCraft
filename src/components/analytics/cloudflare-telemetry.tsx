"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

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

  useEffect(() => {
    if (!TELEMETRY_ENABLED) return;
    if (!pathname || lastPathRef.current === pathname) return;

    lastPathRef.current = pathname;
    sendPageView(pathname);
  }, [pathname]);

  return null;
}
