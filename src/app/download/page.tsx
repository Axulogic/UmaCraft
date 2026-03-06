import type { Metadata } from "next";

import { DownloadPageContent } from "@/components/pages/download-page";

export const metadata: Metadata = {
  title: "Download | UmaCraft - Umamusume Minecraft Server",
  description:
    "Baixe os arquivos e versões do UmaCraft, servidor Minecraft inspirado em Umamusume Pretty Derby para jogar com a comunidade.",
};

export default function DownloadPage() {
  return <DownloadPageContent />;
}
