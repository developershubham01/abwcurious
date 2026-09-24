import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/export?type=contacts|subscribers
 * CSV export for the Studio Console admin view. Read-only.
 * NOTE: intentionally unauthenticated in this sandbox demo —
 * gate with auth middleware before real production use.
 */

function csvEscape(value: unknown): string {
  const str = value == null ? "" : String(value);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function toCsv(headers: string[], rows: unknown[][]): string {
  return [
    headers.join(","),
    ...rows.map((row) => row.map(csvEscape).join(",")),
  ].join("\r\n");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") === "subscribers" ? "subscribers" : "contacts";
  const stamp = new Date().toISOString().slice(0, 10);

  try {
    let csv: string;

    if (type === "subscribers") {
      const subs = await db.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
        select: { email: true, source: true, createdAt: true },
      });
      csv = toCsv(
        ["email", "source", "subscribedAt"],
        subs.map((s) => [s.email, s.source, s.createdAt.toISOString()])
      );
    } else {
      const msgs = await db.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        select: { name: true, email: true, phone: true, service: true, message: true, createdAt: true },
      });
      csv = toCsv(
        ["name", "email", "phone", "service", "message", "submittedAt"],
        msgs.map((m) => [
          m.name,
          m.email,
          m.phone ?? "",
          m.service,
          m.message,
          m.createdAt.toISOString(),
        ])
      );
    }

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="abwcurious-${type}-${stamp}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[/api/export] failed:", error);
    return NextResponse.json({ ok: false, error: "Export failed" }, { status: 500 });
  }
}
