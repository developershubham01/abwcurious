import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_INDUSTRIES, getIndustryBySlug } from "@/lib/industries";
import { IndustryPage } from "@/components/site/industry-page";

export async function generateStaticParams() {
  return ALL_INDUSTRIES.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.name} Engineering Solutions — ABWcurious`,
    description: industry.heroDescription,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <IndustryPage industry={industry} />
    </main>
  );
}
