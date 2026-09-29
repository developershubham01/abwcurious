import type { Metadata } from "next";
import { SocialMediaPage } from "@/components/site/social-page";

export const metadata: Metadata = {
  title: "Social Media & Community — ABWcurious | Follow the Journey",
  description:
    "Connect with ABWcurious across LinkedIn, GitHub, X (Twitter), Instagram, YouTube, and Discord. Official handles and community updates.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <SocialMediaPage />
    </main>
  );
}
