import { LoadingPageContent } from "@/components/pages/loading-page";
import { getLocaleDefinition } from "@/lib/locale";

export default function Loading() {
  return <LoadingPageContent label={getLocaleDefinition("pt-BR").pages.loading.label} />;
}
