import { RootDocument, rootMetadata, rootViewport } from "@/components/layout/root-document";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function PortugueseRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument localeCode="pt-BR">{children}</RootDocument>;
}
