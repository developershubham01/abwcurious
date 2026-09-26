import { Hero } from "@/components/site/hero";
import { AboutCompany } from "@/components/site/about-company";
import { Leaders } from "@/components/site/leaders";
import { JourneyTimeline } from "@/components/site/journey-timeline";
import { Events } from "@/components/site/events";
import { Gallery } from "@/components/site/gallery";
import { JourneySocial } from "@/components/site/journey-social";
import { Contact } from "@/components/site/contact";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <Hero />
      <AboutCompany />
      <Leaders />
      <JourneyTimeline />
      <Events />
      <Gallery />
      <JourneySocial />
      <Contact />
    </main>
  );
}
