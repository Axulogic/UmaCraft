import { LegalShell } from "@/components/layout/legal-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("terms", "pt-BR");

export default function TermsPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("terms", "pt-BR")} />
      <LegalShell sectionKey="terms" />
    </>
  );
}
