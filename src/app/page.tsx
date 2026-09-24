import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Services } from "@/components/site/services";
import { About } from "@/components/site/about";
import { Process } from "@/components/site/process";
import { TechStack } from "@/components/site/techstack";
import { Work } from "@/components/site/work";
import { CaseStudy } from "@/components/site/casestudy";
import { Testimonials } from "@/components/site/testimonials";
import { Pricing } from "@/components/site/pricing";
import { Faq } from "@/components/site/faq";
import { Notes } from "@/components/site/notes";
import { Careers } from "@/components/site/careers";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ScrollProgress, BackToTop } from "@/components/site/chrome";

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-background text-foreground">
      {/* IBM Carbon skip-to-content (visible on keyboard focus) */}
      <a
        href="#main"
        className="skip-link"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Process />
        <TechStack />
        <Work />
        <CaseStudy />
        <Testimonials />
        <Pricing />
        <Faq />
        <Notes />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
