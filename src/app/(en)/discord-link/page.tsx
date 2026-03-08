import { DiscordLinkPageContent } from "@/components/pages/discord-link-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("discord-link", "en-US");

export default function DiscordLinkPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("discord-link", "en-US")} />
      <DiscordLinkPageContent />
    </>
  );
}
