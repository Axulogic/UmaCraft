import { NotFoundPageContent } from "@/components/pages/not-found-page";
import { RootDocument } from "@/components/layout/root-document";

export default function GlobalNotFound() {
  return (
    <RootDocument localeCode="en-US">
      <NotFoundPageContent />
    </RootDocument>
  );
}
