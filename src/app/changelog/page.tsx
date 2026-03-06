import type { Metadata } from "next";

import { ChangelogPageContent } from "@/components/pages/changelog-page";

export const metadata: Metadata = {
  title: "Changelog | UmaCraft Umamusume Minecraft Server",
  description:
    "Acompanhe atualizações do UmaCraft, servidor Minecraft temático de Umamusume Pretty Derby com melhorias e novos recursos.",
};

export default function ChangelogPage() {
  return <ChangelogPageContent />;
}
