import type { MetadataRoute } from "next";

import { getLocale } from "@/lib/locale";

export const dynamic = "force-static";

const locale = getLocale();
const baseUrl = `https://${locale.brand.websiteDomain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
