import type { Metadata } from "next";

import { LegalShell } from "@/components/layout/legal-shell";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Termos | UmaCraft Umamusume Minecraft Server",
  description:
    "Termos de uso do UmaCraft, servidor Minecraft inspirado em Umamusume Pretty Derby.",
};

export default function TermsPage() {
  const locale = getLocale();

  return <LegalShell section={locale.legal.terms} />;
}
