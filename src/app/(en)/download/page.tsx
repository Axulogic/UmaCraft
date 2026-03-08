import { DownloadPageContent } from "@/components/pages/download-page";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";

export const metadata = buildPageMetadata("download", "en-US");

export default function DownloadPage() {
  return (
    <>
      <StructuredData items={buildStructuredData("download", "en-US")} />
      <DownloadPageContent />
    </>
  );
}
