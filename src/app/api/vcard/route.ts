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
    "EMAIL;TYPE=WORK,INTERNET:hello@abwcurious.com",
    "TEL;TYPE=WORK,VOICE:+919999999999",
    "URL:https://abwcurious.com",
    "ADR;TYPE=WORK:;;Pune;Maharashtra;;;India",
    "NOTE:AI software, AI solutions, websites and design — engineered with curiosity. Mon–Sat 9:00–19:00 IST.",
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
