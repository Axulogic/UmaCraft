"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? "G-NFYTPGYVMX";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function trackPageView(url: string) {
  if (!window.gtag) return;

  window.gtag("config", GOOGLE_TAG_ID, {
    page_path: url,
  });
}

export function GoogleTag() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const url = `${pathname}${window.location.search}`;
    trackPageView(url);
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GOOGLE_TAG_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
