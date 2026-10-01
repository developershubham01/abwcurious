import type { Metadata } from "next";
import { BlogsPage } from "@/components/site/blogs-page";

export const metadata: Metadata = {
  title: "Engineering Notes & Blog — ABWcurious | Engineering A Better World",
  description:
    "Production engineering playbooks, architecture tear-downs, AI evaluations, and studio dispatches from the ABWcurious team.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <BlogsPage />
    </main>
  );
}
