import type { Metadata } from "next";
import { EventsPage } from "@/components/site/events-page";

export const metadata: Metadata = {
  title: "Events — ABWcurious | Engineering a Better Future",
  description:
    "Summits, workshops, launches, and tech community meetups hosted and attended by the ABWcurious studio.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <EventsPage />
    </main>
  );
}
