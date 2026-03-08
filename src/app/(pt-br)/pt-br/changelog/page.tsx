import { ChangelogPageContent } from "@/components/pages/changelog-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("changelog", "pt-BR");

export default function ChangelogPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("changelog", "pt-BR")} />
      <ChangelogPageContent />
    </>
  );
}
