import { LegalShell } from "@/components/layout/legal-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("privacy", "pt-BR");

export default function PrivacyPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("privacy", "pt-BR")} />
      <LegalShell sectionKey="privacy" />
    </>
  );
}
