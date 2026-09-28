import { Hero } from "@/components/site/hero";
import { Transforming } from "@/components/site/transforming";
import { Capabilities } from "@/components/site/capabilities";
import { ProductsShowcase } from "@/components/site/products-showcase";
import { Approach } from "@/components/site/approach";
import { WhyAbw } from "@/components/site/why-abw";
import { Industries } from "@/components/site/industries";
import { VisionMission } from "@/components/site/vision-mission";
import { Leaders } from "@/components/site/leaders";
import { JourneyTimeline } from "@/components/site/journey-timeline";
import { Events } from "@/components/site/events";
import { Gallery } from "@/components/site/gallery";
import { JourneySocial } from "@/components/site/journey-social";
import { Contact } from "@/components/site/contact";

/**
 * Landing composition — "ABWcurious Website.docx" structure (Infosys-style):
 * hero → who we are → capabilities → products → approach → why → industries
 * → vision/mission, followed by the company-profile chapters (leadership,
 * journey, events, gallery), the blue CTA banner and contact.
 * Band rhythm: white / #f4f4f4 alternating, one blue cta-banner, white contact.
 */
export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <Hero />
      <Transforming />
      <Capabilities />
      <ProductsShowcase />
      <Approach />
      <WhyAbw />
      <Industries />
      <VisionMission />
      <Leaders />
      <JourneyTimeline />
      <Events />
      <Gallery />
      <JourneySocial />
      <Contact />
    </main>
  );
}
