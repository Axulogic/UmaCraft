import type { Metadata } from "next";

import { CreditsPageContent } from "@/components/pages/credits-page";

export const metadata: Metadata = {
  title: "Créditos | UmaCraft Umamusume Minecraft Server",
  description:
    "Veja créditos, parceiros e referências do UmaCraft, servidor Minecraft temático de Umamusume Pretty Derby.",
};

export default function CreditsPage() {
  return <CreditsPageContent />;
}
