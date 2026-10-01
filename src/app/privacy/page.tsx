import type { Metadata } from "next";
import { PrivacyPage } from "@/components/site/privacy-page";

export const metadata: Metadata = {
  title: "Privacy Policy — ABWcurious OPC Pvt. Ltd. | Engineering A Better World",
  description:
    "Official Privacy Policy of ABWcurious OPC Pvt. Ltd. outlining our data protection practices, DPDP Act compliance, client confidentiality, and data subject rights.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <PrivacyPage />
    </main>
  );
}
