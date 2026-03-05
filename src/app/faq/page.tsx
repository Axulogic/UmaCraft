import type { Metadata } from "next";

import FAQContent from "./faq-content";

export const metadata: Metadata = {
  title: "FAQ | UmaCraft - Servidor Minecraft de Umamusume Pretty Derby",
  description:
    "Perguntas frequentes sobre o UmaCraft, servidor Minecraft temático de Umamusume. Saiba como jogar, recursos e comunidade do Minecraft server.",
};

export default function FAQPage() {
  return <FAQContent />;
}
