import type { Metadata } from "next";
import { AboutPage } from "@/components/site/about-page";

export const metadata: Metadata = {
  title: "About Us — ABWcurious | Engineering A Better World",
  description:
    "Learn about ABWcurious — our journey, core values, studio facts, and the engineering team delivering intelligent digital solutions.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <AboutPage />
    </main>
  );
}
