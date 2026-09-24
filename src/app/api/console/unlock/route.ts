import { NextResponse } from "next/server";
import { z } from "zod";
import {
  expectedConsoleKey,
  issueSessionToken,
  rateLimited,
  recordAuthFailure,
  safeEqual,
} from "@/lib/console-auth";

export const dynamic = "force-dynamic";

/**
 * POST /api/console/unlock — exchange the console passcode for a
 * signed session token (8h TTL). Rate-limited: 8 failures per IP per
 * 5 minutes -> 429 with Retry-After. The passcode itself is compared
 * timing-safely and never echoed back or stored client-side beyond
 * this request.
 */

const NO_STORE = { "Cache-Control": "no-store" } as const;

const bodySchema = z.object({ key: z.string().min(1).max(200) });

export async function POST(request: Request) {
  const blocked = rateLimited(request);
  if (blocked !== null) {
    return NextResponse.json(
      { ok: false, error: "Too many failed attempts — try again later." },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(blocked) } }
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400, headers: NO_STORE }
    );
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Expected { key: string }." },
      { status: 400, headers: NO_STORE }
    );
  }

  if (!safeEqual(parsed.data.key, expectedConsoleKey())) {
    const retry = recordAuthFailure(request);
    const headers =
      retry !== null ? { ...NO_STORE, "Retry-After": String(retry) } : NO_STORE;
    return NextResponse.json(
      { ok: false, error: "Invalid console key." },
      { status: 401, headers }
    );
  }

  const { token, expiresAt } = issueSessionToken();
  return NextResponse.json({ ok: true, token, expiresAt }, { headers: NO_STORE });
}
