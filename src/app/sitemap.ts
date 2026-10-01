import type { MetadataRoute } from "next";
import { SEO_CONFIG, DETAILED_SERVICES } from "@/lib/seo-config";
import { PRODUCTS } from "@/lib/products";
import { ALL_INDUSTRIES } from "@/lib/industries";
import { LOCATIONS_DATA } from "@/lib/locations";
import { JOBS_DATABASE } from "@/lib/jobs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseUrl = SEO_CONFIG.canonicalBase;

  const entry = (
    path: string,
    priority: number,
    changeFreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly"
  ): MetadataRoute.Sitemap[number] => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  });

  const routes: MetadataRoute.Sitemap = [
    // Primary Landing & Corporate Pages
    entry("/", 1.0, "daily"),
    entry("/about", 0.9),
    entry("/contact", 0.95, "daily"),
    entry("/careers", 0.85, "daily"),
    entry("/careers/apply", 0.8),
    entry("/careers/submit-resume", 0.8),
    ...JOBS_DATABASE.map((j) => entry(`/careers/${j.slug}`, 0.8, "daily")),
    entry("/events", 0.8),
    entry("/gallery", 0.8),
    entry("/achievements", 0.8),
    entry("/blogs", 0.85, "daily"),
    entry("/sitemap", 0.5),
    entry("/terms", 0.5, "monthly"),
    entry("/privacy", 0.5, "monthly"),

    // Services Landing & Individual Service Detail Pages
    entry("/services", 0.95),
    ...DETAILED_SERVICES.map((s) => entry(`/services/${s.slug}`, 0.9)),

    // Locations Landing & Individual Location Pages
    entry("/locations", 0.9),
    ...LOCATIONS_DATA.map((loc) => entry(`/locations/${loc.slug}`, 0.85)),

    // Industries Landing & Individual Industry Pages
    entry("/industries", 0.9),
    ...ALL_INDUSTRIES.map((ind) => entry(`/industries/${ind.slug}`, 0.85)),

    // Products Landing & Individual Product Detail Pages
    entry("/products", 0.9),
    ...PRODUCTS.map((p) => entry(`/products/${p.slug}`, 0.85)),
  ];

  return routes;
}

