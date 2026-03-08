export type SitePageKey =
  | "home"
  | "about"
  | "changelog"
  | "credits"
  | "discord-link"
  | "download"
  | "faq"
  | "features"
  | "hub"
  | "privacy"
  | "terms";

export const SITE_PAGE_PATHS: Record<SitePageKey, string> = {
  home: "/",
  about: "/about",
  changelog: "/changelog",
  credits: "/credits",
  "discord-link": "/discord-link",
  download: "/download",
  faq: "/faq",
  features: "/features",
  hub: "/hub",
  privacy: "/privacy",
  terms: "/terms",
};

export const PUBLIC_SITE_PAGE_KEYS = Object.keys(SITE_PAGE_PATHS) as SitePageKey[];
