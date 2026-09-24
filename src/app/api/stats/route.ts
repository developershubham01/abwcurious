import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/stats
 * Aggregated studio activity for the in-page Studio Console (admin view).
 * Read-only; intentionally unauthenticated in this sandbox demo —
 * swap in auth middleware before exposing real production data.
 */
export async function GET() {
  try {
    const [contacts, subscribers, byServiceRaw, recentContacts, recentSubscribers, bySourceRaw] =
      await Promise.all([
        db.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
        db.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } }),
        db.contactMessage.groupBy({ by: ["service"], _count: { _all: true } }),
        db.contactMessage.findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
          select: { id: true, name: true, email: true, service: true, message: true, createdAt: true },
        }),
        db.newsletterSubscriber.findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
          select: { id: true, email: true, source: true, createdAt: true },
        }),
        db.newsletterSubscriber.groupBy({ by: ["source"], _count: { _all: true } }),
      ]);

    // last 7 days daily counts (contacts + subscribers)
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const days = Array.from({ length: 7 }, (_, i) => {
      const start = new Date(now - (6 - i) * dayMs);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start.getTime() + dayMs);
      return {
        date: start.toISOString().slice(0, 10),
        label: start.toLocaleDateString("en-US", { weekday: "short" }),
        contacts: contacts.filter((c) => c.createdAt >= start && c.createdAt < end).length,
        subscribers: subscribers.filter((s) => s.createdAt >= start && s.createdAt < end).length,
      };
    });

    const byService = byServiceRaw
      .map((g) => ({ service: g.service, count: g._count._all }))
      .sort((a, b) => b.count - a.count);

    const bySource = bySourceRaw
      .map((g) => ({ source: g.source, count: g._count._all }))
      .sort((a, b) => b.count - a.count);

    const last7 = days.reduce((acc, d) => acc + d.contacts + d.subscribers, 0);

    return NextResponse.json(
      {
        ok: true,
        totals: {
          contacts: contacts.length,
          subscribers: subscribers.length,
          activity7d: last7,
          services: byService.length,
        },
        byService,
        bySource,
        days,
        recentContacts,
        recentSubscribers,
        generatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[/api/stats] failed:", error);
    return NextResponse.json({ ok: false, error: "Could not load stats" }, { status: 500 });
  }
}
