import { PageTransitionTemplate } from "@/components/layout/page-transition-template";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransitionTemplate>{children}</PageTransitionTemplate>;
}
