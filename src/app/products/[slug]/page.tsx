import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, PRODUCT_BY_SLUG } from "@/lib/products";
import { ProductDetailPage } from "@/components/site/product-page";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCT_BY_SLUG.get(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ABWcurious SaaS Platform`,
    description: product.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCT_BY_SLUG.get(slug);
  if (!product) notFound();

  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <ProductDetailPage product={product} />
    </main>
  );
}
