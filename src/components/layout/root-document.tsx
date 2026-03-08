import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope, Syne } from "next/font/google";

import { CloudflareTelemetry } from "@/components/analytics/cloudflare-telemetry";
import { SiteProviders } from "@/components/providers/site-providers";
import { getHtmlLang, type AppLocaleCode } from "@/lib/locale";
import { SITE_URL } from "@/lib/site-url";

import "@/app/globals.css";

const headingFont = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const brandFont = Bebas_Neue({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400"],
});

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "UmaCraft",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon-32x32.png"],
  },
};

export const rootViewport: Viewport = {
  themeColor: "#f15025",
};

export function RootDocument({
  children,
  localeCode,
}: Readonly<{
  children: React.ReactNode;
  localeCode: AppLocaleCode;
}>) {
  return (
    <html lang={getHtmlLang(localeCode)}>
      <body
        suppressHydrationWarning
        className={`${headingFont.variable} ${bodyFont.variable} ${brandFont.variable} antialiased`}
      >
        <CloudflareTelemetry />
        <SiteProviders localeCode={localeCode}>{children}</SiteProviders>
      </body>
    </html>
  );
}
