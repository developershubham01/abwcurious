import type { MetadataRoute } from "next";

/**
 * /sitemap.xml — single-page site; the canonical entry plus the hash
 * sections search engines treat as one document. RSS + vCard are APIs,
 * not crawlable documents, so they stay out.
 */

const SITE = "https://abwcurious.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
