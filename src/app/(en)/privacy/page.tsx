import { LegalShell } from "@/components/layout/legal-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("privacy", "en-US");

export default function PrivacyPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("privacy", "en-US")} />
      <LegalShell sectionKey="privacy" />
    </>
  );
}
