import { ChangelogPageContent } from "@/components/pages/changelog-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("changelog", "en-US");

export default function ChangelogPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("changelog", "en-US")} />
      <ChangelogPageContent />
    </>
  );
}
