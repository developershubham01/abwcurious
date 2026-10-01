import { Hero } from "@/components/site/hero";
import { MotionVideoSection } from "@/components/site/motion-video";
import { TechLogoLoopSection } from "@/components/site/tech-logo-loop";
import { Transforming } from "@/components/site/transforming";
import { Capabilities } from "@/components/site/capabilities";
import { ProductsShowcase } from "@/components/site/products-showcase";
import { TrainingSection } from "@/components/site/training-section";
import { Approach } from "@/components/site/approach";
import { WhyAbw } from "@/components/site/why-abw";
import { Testimonials } from "@/components/site/testimonials";
import { Industries } from "@/components/site/industries";
import { VisionMission } from "@/components/site/vision-mission";
import { JourneyTimeline } from "@/components/site/journey-timeline";
import { Events } from "@/components/site/events";
import { Gallery } from "@/components/site/gallery";
import { JourneySocial } from "@/components/site/journey-social";

/**
 * Landing composition — "ABWcurious Website.docx" structure:
 * hero → who we are → capabilities → products → training for what's next
 * → approach → why → industries → vision/mission, followed by the company-profile
 * chapters (journey, events, gallery) and the closing CTA banner.
 * Contact is a separate dedicated page on #/contact and /contact.
 */
export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <Hero />
      <MotionVideoSection />
      <Transforming />
      <Capabilities />
      <ProductsShowcase />
      <TrainingSection />
      <Approach />
      <WhyAbw />
      <Testimonials />
      <TechLogoLoopSection />
      <Industries />
      <VisionMission />
      <JourneyTimeline />
      <Events />
      <Gallery />
      <JourneySocial />
    </main>
  );
}
