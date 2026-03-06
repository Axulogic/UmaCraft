import type { Metadata } from "next";

import { FeaturesPageContent } from "@/components/pages/features-page";

export const metadata: Metadata = {
  title: "Recursos | UmaCraft — Minecraft Umamusume Server",
  description:
    "Veja todos os recursos do UmaCraft: servidor Minecraft temático de Umamusume Pretty Derby com sistemas exclusivos para fãs.",
};

export default function FeaturesPage() {
  return <FeaturesPageContent />;
}
