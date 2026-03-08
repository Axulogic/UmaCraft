import { FeaturesPageContent } from "@/components/pages/features-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("features", "pt-BR");

export default function FeaturesPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("features", "pt-BR")} />
      <FeaturesPageContent />
    </>
  );
}
