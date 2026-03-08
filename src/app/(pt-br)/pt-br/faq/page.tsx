import FAQContent from "@/app/faq/faq-content";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("faq", "pt-BR");

export default function FAQPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("faq", "pt-BR")} />
      <FAQContent />
    </>
  );
}
