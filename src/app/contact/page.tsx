import type { Metadata } from "next";
import { ContactPage } from "@/components/site/contact-page";

export const metadata: Metadata = {
  title: "Contact Us — ABWcurious | Engineering a Better Future",
  description:
    "Get in touch with ABWcurious. Direct technical inquiry, enterprise solutions advisory, and client onboarding. We reply within 24 hours.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <ContactPage />
    </main>
  );
}
