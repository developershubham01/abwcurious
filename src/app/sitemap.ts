import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { CATEGORIES } from "@/lib/catalog";

/**
 * /sitemap.xml — an index of EVERY page on the site.
 *
 * The app intentionally stays a single Next.js route (`/`), so the
 * "pages" are fragment URLs: landing sections live on `#section`,
 * while products / product details / service categories / blog /
 * sitemap live on `#/...` hash routes rendered by the client portals.
 * Crawlers treat fragments as one document, but they are listed here
 * (and mirrored in the footer sitemap band + #/sitemap page) so every
 * destination has a canonical, shareable URL.
 *
 * RSS + vCard are APIs, not crawlable documents, so they stay out.
 */

const SITE = "https://abwcurious.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  });

  return [
    // canonical entry
    page("/", 1),

    // landing sections
    page("/#about", 0.9),
    page("/#leadership", 0.9),
    page("/#achievements", 0.8),
    page("/#events", 0.9),
    page("/#gallery", 0.8),
    page("/#follow", 0.6),
    page("/#contact", 0.9),

    // hash-route pages — products
    page("/#/products", 0.9),
    ...PRODUCTS.map((p) => page(`/#/products/${p.slug}`, 0.8)),

    // hash-route pages — service categories
    ...CATEGORIES.map((c) => page(`/#/services/${c.slug}`, 0.8)),

    // hash-route pages — resources
    page("/#/blogs", 0.7),
    page("/#/sitemap", 0.5),
  ];
}
