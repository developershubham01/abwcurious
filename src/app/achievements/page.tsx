import type { Metadata } from "next";
import { AchievementsPage } from "@/components/site/achievements-page";

export const metadata: Metadata = {
  title: "Achievements & Milestones — ABWcurious | Track Record of Innovation",
  description:
    "Explore the timeline of milestones, technical breakthroughs, industry awards, and key achievements at ABWcurious.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <AchievementsPage />
    </main>
  );
}
