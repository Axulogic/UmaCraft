import { FeaturesPageContent } from "@/components/pages/features-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("features", "en-US");

export default function FeaturesPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("features", "en-US")} />
      <FeaturesPageContent />
    </>
  );
}
