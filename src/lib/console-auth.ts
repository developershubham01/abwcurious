import { NextResponse } from "next/server";

/**
 * Lightweight passcode gate for the Studio Console admin surface
 * (/api/stats + /api/export). Not real auth — a demo-grade lock that
 * keeps casual visitors and crawlers out of raw contact data.
 *
 * Key sources (either):
 *  - "x-console-key" request header (used by the console UI fetches)
 *  - "?key=" query parameter (used by direct-navigation CSV downloads)
 *
 * Configure via CONSOLE_PASSCODE env var; defaults to the demo key.
 */

export const CONSOLE_KEY_DEMO = "abw-2026";

export function expectedConsoleKey(): string {
  return process.env.CONSOLE_PASSCODE || CONSOLE_KEY_DEMO;
}

export function requestConsoleKey(request: Request): string | null {
  const header = request.headers.get("x-console-key");
  if (header) return header.trim();
  const param = new URL(request.url).searchParams.get("key");
  return param ? param.trim() : null;
}

/** Returns a 401 response when the presented key does not match. */
export function guardConsole(request: Request): NextResponse | null {
  const presented = requestConsoleKey(request);
  if (presented && presented === expectedConsoleKey()) return null;
  return NextResponse.json(
    { ok: false, error: "Console key required." },
    { status: 401, headers: { "Cache-Control": "no-store" } }
  );
}
