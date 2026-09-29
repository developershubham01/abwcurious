import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, CATEGORY_BY_SLUG } from "@/lib/catalog";
import { CategoryPage } from "@/components/site/category-page";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) return {};
  return {
    title: `${category.name} — ABWcurious Practice`,
    description: category.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) notFound();

  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <CategoryPage category={category} />
    </main>
  );
}
