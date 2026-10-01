import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/vcard
 * Downloadable vCard (.vcf) for the studio — powers the
 * "Save contact card" button in the contact section.
 * Phone number is still the placeholder until real details are provided.
 */
export async function GET() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;ABWcurious;;;",
    "FN:ABWcurious",
    "ORG:ABWcurious — AI Software Studio",
    "TITLE:AI Software Development · AI Solutions · Web · Design",
    "EMAIL;TYPE=WORK,INTERNET:info@abwcurious.com",
    "TEL;TYPE=WORK,VOICE:+919930338504",
    "URL:https://abwcurious.com",
    "ADR;TYPE=WORK:;;S07-05, Haware's Centurion, Sector 19A, Nerul (East);Navi Mumbai;Maharashtra;400706;India",
    "NOTE:ABWcurious (OPC) Private Limited — Engineering A Better World. Mon–Sat 9:00–19:00 IST.",
    "REV:" + new Date().toISOString(),
    "END:VCARD",
  ].join("\r\n");

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="abwcurious.vcf"',
      "Cache-Control": "no-store",
    },
  });
}
