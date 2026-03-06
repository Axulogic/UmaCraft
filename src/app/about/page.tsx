import type { Metadata } from "next";

import { AboutPageContent } from "@/components/pages/about-page";

export const metadata: Metadata = {
  title: "Sobre o UmaCraft | Servidor Minecraft de Umamusume",
  description:
    "Conheça o UmaCraft, servidor Minecraft temático de Umamusume Pretty Derby. Comunidade brasileira de fãs de Umamusume no Minecraft.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
