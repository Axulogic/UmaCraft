import { HomePageContent } from "@/components/pages/home-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("home", "pt-BR");

export default function HomePage() {
  return (
    <>
      <StructuredData items={buildStructuredData("home", "pt-BR")} />
      <HomePageContent />
    </>
  );
}
