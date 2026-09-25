import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Services } from "@/components/site/services";
import { Products } from "@/components/site/products";
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
import { CommandPalette } from "@/components/site/palette";
import { CategoryPortal } from "@/components/site/category-page";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <Hero />
      <Marquee />
      <Services />
      <Products />
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
      <CommandPalette />
      <CategoryPortal />
    </main>
  );
}
