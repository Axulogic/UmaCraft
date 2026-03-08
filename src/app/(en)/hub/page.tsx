import { HubPageContent } from "@/components/pages/hub-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("hub", "en-US");

export default function HubPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("hub", "en-US")} />
      <HubPageContent />
    </>
  );
}
