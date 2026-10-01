import type { Metadata } from "next";
import { SitemapPage } from "@/components/site/sitemap-page";

export const metadata: Metadata = {
  title: "Site Index & Sitemap — ABWcurious | Engineering A Better World",
  description:
    "Comprehensive directory of all sections, service practices, SaaS platforms, company channels, and resources across ABWcurious.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <SitemapPage />
    </main>
  );
}
