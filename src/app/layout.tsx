import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope, Syne } from "next/font/google";

import { SiteProviders } from "@/components/providers/site-providers";
import { CloudflareTelemetry } from "@/components/analytics/cloudflare-telemetry";
import { enUSLocale } from "@/Locale/en-US";
import { SITE_URL } from "@/lib/site-url";

import "./globals.css";

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

const locale = enUSLocale;
const socialImagePath = "/assets/icons/logo_and_watermarks/Umacraft_Logo_Orange.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: locale.meta.title,
  description: locale.meta.description,
  keywords: locale.meta.keywords,
  applicationName: locale.brand.projectName,
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
  openGraph: {
    title: locale.meta.openGraphTitle,
    description: locale.meta.openGraphDescription,
    url: SITE_URL,
    siteName: locale.brand.projectName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialImagePath,
        alt: `${locale.brand.projectName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: locale.meta.openGraphTitle,
    description: locale.meta.openGraphDescription,
    images: [socialImagePath],
  },
};

export const viewport: Viewport = {
  themeColor: "#f15025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={locale.lang}>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${brandFont.variable} antialiased`}
      >
        <CloudflareTelemetry />
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
