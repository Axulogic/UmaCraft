import { HeroSection } from "@/components/layout/hero-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { Topbar } from "@/components/layout/topbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <main>
        <HeroSection />
      </main>
      <SiteFooter />
    </div>
  );
}
