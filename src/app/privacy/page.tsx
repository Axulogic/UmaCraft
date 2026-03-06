import type { Metadata } from "next";

import { LegalShell } from "@/components/layout/legal-shell";

export const metadata: Metadata = {
  title: "Privacidade | UmaCraft Umamusume Minecraft Server",
  description:
    "Política de privacidade do UmaCraft, servidor Minecraft temático de Umamusume Pretty Derby.",
};

export default function PrivacyPage() {
  return <LegalShell sectionKey="privacy" />;
}
