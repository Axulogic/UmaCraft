import { AboutPageContent } from "@/components/pages/about-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("about", "en-US");

export default function AboutPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("about", "en-US")} />
      <AboutPageContent />
    </>
  );
}
