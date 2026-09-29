import type { Metadata } from "next";
import { GalleryPage } from "@/components/site/gallery-page";

export const metadata: Metadata = {
  title: "Studio Gallery — ABWcurious | Life at the Studio",
  description:
    "Explore moments, culture, events, and behind-the-scenes life at the ABWcurious studio in Nerul, Navi Mumbai, India.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <GalleryPage />
    </main>
  );
}
