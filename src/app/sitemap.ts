import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

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
    url: `${SITE_URL}${route}`,
    lastModified,
  }));
}
