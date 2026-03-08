import { LegalShell } from "@/components/layout/legal-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("terms", "en-US");

export default function TermsPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("terms", "en-US")} />
      <LegalShell sectionKey="terms" />
    </>
  );
}
