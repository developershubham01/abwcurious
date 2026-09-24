import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { guardConsole } from "@/lib/console-auth";

export const dynamic = "force-dynamic";

/**
 * GET   /api/subscribers — full newsletter list for the Studio Console admin view.
 * DELETE /api/subscribers — remove (unsubscribe) a subscriber by id.
 * Both passcode-gated via /lib/console-auth (x-console-key header or ?key= param,
 * CONSOLE_PASSCODE env to configure).
 */

const deleteSchema = z.object({
  id: z.string().trim().min(6).max(64),
});

export async function GET(request: Request) {
  const denied = guardConsole(request);
  if (denied) return denied;

  try {
    const subscribers = await db.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, source: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, total: subscribers.length, subscribers }, { status: 200 });
  } catch (error) {
    console.error("[/api/subscribers GET] failed:", error);
    return NextResponse.json({ ok: false, error: "Could not load subscribers" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const denied = guardConsole(request);
  if (denied) return denied;

  try {
    const body = await request.json().catch(() => null);
    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "A valid subscriber id is required" }, { status: 400 });
    }

    const existing = await db.newsletterSubscriber.findUnique({ where: { id: parsed.data.id } });
    if (!existing) {
      return NextResponse.json({ ok: false, error: "Subscriber not found" }, { status: 404 });
    }

    await db.newsletterSubscriber.delete({ where: { id: parsed.data.id } });
    const total = await db.newsletterSubscriber.count();
    return NextResponse.json({ ok: true, removed: existing.email, total }, { status: 200 });
  } catch (error) {
    console.error("[/api/subscribers DELETE] failed:", error);
    return NextResponse.json({ ok: false, error: "Could not remove subscriber" }, { status: 500 });
  }
}
