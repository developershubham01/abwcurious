import type { Metadata } from "next";
import { ProductsIndexPage } from "@/components/site/product-page";

export const metadata: Metadata = {
  title: "Products & Platforms — ABWcurious | Engineering a Better Future",
  description:
    "Explore the ABWcurious SaaS line: intelligent, production-ready platforms built for enterprise scale, modern operations, and rapid deployment.",
};

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <ProductsIndexPage />
    </main>
  );
}
