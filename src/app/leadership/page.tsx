import type { Metadata } from "next";
import { LeadershipPage } from "@/components/site/leadership-page";

export const metadata: Metadata = {
  title: "Leadership Team — ABWcurious | The People Behind the Products",
  description:
    "Meet the founders, executive leaders, and architects driving technical innovation, design systems, and client growth at ABWcurious.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <LeadershipPage />
    </main>
  );
}
