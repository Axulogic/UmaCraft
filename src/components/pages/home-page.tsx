import { HomeSmoothScroll } from "@/components/layout/home-smooth-scroll";
import { HeroSection } from "@/components/layout/hero-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { Topbar } from "@/components/layout/topbar";

export function HomePageContent() {
  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <HomeSmoothScroll>
        <main>
          <HeroSection />
        </main>
        <SiteFooter />
      </HomeSmoothScroll>
    </div>
  );
}
