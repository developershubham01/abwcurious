import type { Metadata } from "next";
import { CareersPage } from "@/components/site/careers-page";

export const metadata: Metadata = {
  title: "Careers — ABWcurious | Build With Curious Minds",
  description:
    "Explore open roles in AI, Full-Stack engineering, UI/UX product design, and Cloud DevOps at ABWcurious in Nerul, Navi Mumbai, India.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <CareersPage />
    </main>
  );
}
