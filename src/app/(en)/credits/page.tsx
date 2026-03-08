import { CreditsPageContent } from "@/components/pages/credits-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("credits", "en-US");

export default function CreditsPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("credits", "en-US")} />
      <CreditsPageContent />
    </>
  );
}
