import type { Metadata } from "next";

import { LegalShell } from "@/components/layout/legal-shell";

export const metadata: Metadata = {
  title: "Termos | UmaCraft Umamusume Minecraft Server",
  description:
    "Termos de uso do UmaCraft, servidor Minecraft inspirado em Umamusume Pretty Derby.",
};

export default function TermsPage() {
  return <LegalShell sectionKey="terms" />;
}
