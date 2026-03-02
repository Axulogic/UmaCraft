import { LegalShell } from "@/components/layout/legal-shell";
import { getLocale } from "@/lib/locale";

export default function TermsPage() {
  const locale = getLocale();

  return <LegalShell section={locale.legal.terms} />;
}
