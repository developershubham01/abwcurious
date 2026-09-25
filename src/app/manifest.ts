import type { MetadataRoute } from "next";

/**
 * /manifest.webmanifest — installability + branded browser chrome.
 * Carbon white theme; the SVG logo mark scales to any maskable size.
 */

const SITE = "https://abwcurious.com";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ABWcurious — AI Software Development Studio",
    short_name: "ABWcurious",
    description:
      "Technology studio building AI software, intelligent AI solutions, high-performance websites and memorable digital design.",
    id: SITE,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0f62fe",
    categories: ["business", "technology", "productivity"],
    icons: [
      {
        src: "/logo-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/og-image.png",
        sizes: "1216x640",
        type: "image/png",
      },
    ],
  };
}
