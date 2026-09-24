import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * Studio Console auth — passcode exchange + HMAC-signed session tokens.
 *
 * Flow:
 *  1. Client POSTs the passcode to /api/console/unlock (rate-limited).
 *  2. Server validates it and issues a signed token (8h TTL).
 *  3. Client presents the token via the "x-console-token" header
 *     (or ?t= for direct-navigation CSV downloads). The passcode is
 *     never persisted in the browser — only the short-lived token.
 *
 * Legacy compatibility: "x-console-key" / "?key=" still authenticate
 * directly (scripted checks, curl), but every failed attempt feeds
 * the same per-IP rate-limit bucket (8 failures / 5 min -> 429).
 *
 * Configure via CONSOLE_PASSCODE (unlock credential) and
 * CONSOLE_SESSION_SECRET (token signing key; derived from the
 * passcode when unset). Tokens are stateless — rotating either env
 * var invalidates every outstanding session.
 */

export const CONSOLE_KEY_DEMO = "abw-2026";

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

/* ---------- passcode ---------- */

export function expectedConsoleKey(): string {
  return process.env.CONSOLE_PASSCODE || CONSOLE_KEY_DEMO;
}

function signingSecret(): string {
  return process.env.CONSOLE_SESSION_SECRET || `abw-console-v1:${expectedConsoleKey()}`;
}

/* ---------- timing-safe compare ---------- */

export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) {
    // burn comparable time so short/long guesses are indistinguishable
    createHmac("sha256", signingSecret()).update(ba).digest();
    return false;
  }
  return timingSafeEqual(ba, bb);
}

/* ---------- session tokens ---------- */

function sign(payload: string): string {
  return createHmac("sha256", signingSecret()).update(payload).digest("base64url");
}

export interface SessionClaims {
  v: 1;
  iat: number;
  exp: number;
}

export function issueSessionToken(now = Date.now()): { token: string; expiresAt: string } {
  const claims: SessionClaims = { v: 1, iat: now, exp: now + TOKEN_TTL_MS };
  const payload = Buffer.from(JSON.stringify(claims), "utf8").toString("base64url");
  return {
    token: `${payload}.${sign(payload)}`,
    expiresAt: new Date(claims.exp).toISOString(),
  };
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0 || dot === token.length - 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(sig, sign(payload))) return false;
  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionClaims;
    return claims.v === 1 && typeof claims.exp === "number" && claims.exp > Date.now();
  } catch {
    return false;
  }
}

/* ---------- request credentials ---------- */

/** Session token from the x-console-token header or the ?t= param. */
export function requestConsoleToken(request: Request): string | null {
  const header = request.headers.get("x-console-token");
  if (header) return header.trim();
  const param = new URL(request.url).searchParams.get("t");
  return param ? param.trim() : null;
}

/** Legacy passcode from the x-console-key header or the ?key= param. */
export function requestConsoleKey(request: Request): string | null {
  const header = request.headers.get("x-console-key");
  if (header) return header.trim();
  const param = new URL(request.url).searchParams.get("key");
  return param ? param.trim() : null;
}

/* ---------- rate limiting (in-memory, per IP) ---------- */

const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 8; // failed auth attempts per window

/* The bucket must be shared across every route that imports this module
   (Next.js can bundle per-route copies in dev), so it lives on globalThis. */
interface AttemptBucket {
  count: number;
  resetAt: number;
}
const globalRef = globalThis as typeof globalThis & {
  __abwConsoleRateBuckets?: Map<string, AttemptBucket>;
};
const attempts: Map<string, AttemptBucket> = (globalRef.__abwConsoleRateBuckets ??= new Map());
let lastSweep = 0;

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "local";
}

function sweep(): void {
  const now = Date.now();
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [ip, entry] of attempts) if (entry.resetAt <= now) attempts.delete(ip);
}

/** Seconds until the caller may retry, or null when not blocked. */
export function rateLimited(request: Request): number | null {
  sweep();
  const entry = attempts.get(clientIp(request));
  if (!entry) return null;
  if (entry.resetAt <= Date.now()) {
    attempts.delete(clientIp(request));
    return null;
  }
  return entry.count >= MAX_ATTEMPTS ? Math.ceil((entry.resetAt - Date.now()) / 1000) : null;
}

/** Records a failed attempt; returns retryAfter seconds when now blocked. */
export function recordAuthFailure(request: Request): number | null {
  const ip = clientIp(request);
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }
  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) return Math.ceil((entry.resetAt - now) / 1000);
  return null;
}

/* ---------- guard ---------- */

const NO_STORE = { "Cache-Control": "no-store" } as const;

function tooMany(retryAfter: number): NextResponse {
  return NextResponse.json(
    { ok: false, error: "Too many failed attempts — try again later." },
    { status: 429, headers: { ...NO_STORE, "Retry-After": String(retryAfter) } }
  );
}

/**
 * Returns a 401/429 response when the request carries no valid
 * credentials; null when the caller may proceed. Accepted, in order:
 *  1. valid session token (x-console-token header or ?t=)
 *  2. direct passcode (x-console-key header or ?key=)
 */
export function guardConsole(request: Request): NextResponse | null {
  const blocked = rateLimited(request);
  if (blocked !== null) return tooMany(blocked);

  if (verifySessionToken(requestConsoleToken(request))) return null;

  const key = requestConsoleKey(request);
  if (key && safeEqual(key, expectedConsoleKey())) return null;

  const retry = recordAuthFailure(request);
  if (retry !== null) return tooMany(retry);

  return NextResponse.json(
    { ok: false, error: "Console key required." },
    { status: 401, headers: NO_STORE }
  );
}
