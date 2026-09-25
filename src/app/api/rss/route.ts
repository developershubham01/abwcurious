import { NOTES } from "@/lib/content-notes";

export const dynamic = "force-static";

/**
 * GET /api/rss — RSS 2.0 feed for the Field Notes blog.
 * Linked from the footer and advertised via <link rel="alternate"> in <head>.
 * Links point at the production domain; on-page deep links use #note/<slug>.
 */

const SITE = "https://abwcurious.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateIso: string): string {
  return new Date(dateIso).toUTCString();
}

export async function GET() {
  const items = NOTES.map(
    (n) => `    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${SITE}/#note/${n.slug}</link>
      <guid isPermaLink="false">abwcurious-note-${n.slug}</guid>
      <pubDate>${toRfc822(n.date)}</pubDate>
      <category>${escapeXml(n.tag)}</category>
      <description>${escapeXml(n.excerpt)}</description>
    </item>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ABWcurious — Field Notes</title>
    <link>${SITE}</link>
    <description>Short, practical essays on AI engineering, retrieval and design systems from the ABWcurious studio.</description>
    <language>en-us</language>
    <lastBuildDate>${toRfc822(NOTES[0].date)}</lastBuildDate>
    <atom:link href="${SITE}/api/rss" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
