import type { Metadata } from "next";
import { TermsPage } from "@/components/site/terms-page";

export const metadata: Metadata = {
  title: "Terms & Conditions — ABWcurious OPC Pvt. Ltd. | Engineering a Better Future",
  description:
    "Official Terms and Conditions of ABWcurious OPC Pvt. Ltd. governing our cybersecurity consulting, software engineering, VAPT, AI solutions, and education platforms.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <TermsPage />
    </main>
  );
}
