import { HubPageContent } from "@/components/pages/hub-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("hub", "pt-BR");

export default function HubPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("hub", "pt-BR")} />
      <HubPageContent />
    </>
  );
}
