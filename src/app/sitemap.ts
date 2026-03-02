import type { MetadataRoute } from "next";

import { getLocale } from "@/lib/locale";

export const dynamic = "force-static";

const locale = getLocale();
const baseUrl = `https://${locale.brand.websiteDomain}`;
const STATIC_ROUTES = [
  "",
  "/about",
  "/changelog",
  "/credits",
  "/discord-link",
  "/download",
  "/faq",
  "/features",
  "/hub",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));
}
