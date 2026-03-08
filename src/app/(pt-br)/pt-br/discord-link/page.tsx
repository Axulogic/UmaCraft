import { DiscordLinkPageContent } from "@/components/pages/discord-link-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("discord-link", "pt-BR");

export default function DiscordLinkPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("discord-link", "pt-BR")} />
      <DiscordLinkPageContent />
    </>
  );
}
