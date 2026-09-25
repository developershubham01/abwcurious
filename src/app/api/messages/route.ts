import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { guardConsole } from "@/lib/console-auth";

export const dynamic = "force-dynamic";

/**
 * GET   /api/messages — full contact inbox for the Studio Console admin view.
 * PATCH /api/messages — update a message's inbox status (new | read | archived).
 * Both passcode-gated via /lib/console-auth (x-console-key header or ?key= param,
 * CONSOLE_PASSCODE env to configure).
 */

const STATUSES = ["new", "read", "archived"] as const;

const patchSchema = z.object({
  id: z.string().trim().min(6).max(64),
  status: z.enum(STATUSES),
});

export async function GET(request: Request) {
  const denied = guardConsole(request);
  if (denied) return denied;

  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        service: true,
        message: true,
        status: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ ok: true, total: messages.length, messages }, { status: 200 });
  } catch (error) {
    console.error("[/api/messages GET] failed:", error);
    return NextResponse.json({ ok: false, error: "Could not load messages" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const denied = guardConsole(request);
  if (denied) return denied;

  try {
    const body = await request.json().catch(() => null);
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message || "id and status (new|read|archived) are required" },
        { status: 400 }
      );
    }

    const existing = await db.contactMessage.findUnique({ where: { id: parsed.data.id } });
    if (!existing) {
      return NextResponse.json({ ok: false, error: "Message not found" }, { status: 404 });
    }

    const updated = await db.contactMessage.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
      select: { id: true, status: true },
    });
    return NextResponse.json({ ok: true, message: updated }, { status: 200 });
  } catch (error) {
    console.error("[/api/messages PATCH] failed:", error);
    return NextResponse.json({ ok: false, error: "Could not update message" }, { status: 500 });
  }
}
