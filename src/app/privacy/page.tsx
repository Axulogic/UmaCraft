import { LegalShell } from "@/components/layout/legal-shell";
import { getLocale } from "@/lib/locale";

export default function PrivacyPage() {
  const locale = getLocale();

  return <LegalShell section={locale.legal.privacy} />;
}
