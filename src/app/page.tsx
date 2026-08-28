import { Navbar } from "@/components/sections/navbar";
import { ScrollProgress } from "@/components/sections/scroll-progress";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { FaqJsonLd } from "@/components/sections/faq-jsonld";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-clip bg-background">
      {/* SEO: FAQ structured data for rich results */}
      <FaqJsonLd />

      {/* Accessibility: skip to main content */}
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:shadow-xl"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <WhyUs />
        <Process />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
