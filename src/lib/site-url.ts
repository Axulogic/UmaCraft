export const SITE_HOST = "umacraft.xyz";
export const SITE_URL = `https://${SITE_HOST}`;

export function buildAbsoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
