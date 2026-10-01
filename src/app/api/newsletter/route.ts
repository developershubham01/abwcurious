import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { sendToGoogleSheets } from "@/lib/google-sheets";

const newsletterSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address").max(200),
  source: z.string().trim().max(60).optional().nullable(),
  _gotcha: z.string().optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json({ error: first?.message || "Validation failed" }, { status: 400 });
    }

    const { email, source, _gotcha } = parsed.data;

    // Honeypot check
    if (_gotcha) {
      return NextResponse.json(
        { ok: true, message: "Subscribed. See you in the next issue.", total: 1 },
        { status: 201 }
      );
    }

    try {
      await db.newsletterSubscriber.create({
        data: { email, source: source || "footer" },
      });

      // Forward to Google Sheets
      sendToGoogleSheets({
        formType: "newsletter",
        data: {
          email,
          source: source || "footer",
        },
        pageUrl: request.headers.get("referer") || "",
        userAgent: request.headers.get("user-agent") || "",
      }).catch((err) => console.error("[GoogleSheets] Newsletter error:", err));

      const total = await db.newsletterSubscriber.count();
      return NextResponse.json(
        { ok: true, message: "Subscribed. See you in the next issue.", total },
        { status: 201 }
      );
    } catch (err) {
      // Unique constraint = already subscribed, treat as success with a note
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        const total = await db.newsletterSubscriber.count();

        // Forward to Google Sheets even if already subscribed to record engagement
        sendToGoogleSheets({
          formType: "newsletter",
          data: {
            email,
            source: (source || "footer") + " (existing)",
          },
          pageUrl: request.headers.get("referer") || "",
          userAgent: request.headers.get("user-agent") || "",
        }).catch((err) => console.error("[GoogleSheets] Newsletter error:", err));

        return NextResponse.json(
          { ok: true, alreadySubscribed: true, message: "You are already on the list.", total },
          { status: 200 }
        );
      }
      throw err;
    }
  } catch (error) {
    console.error("[/api/newsletter] failed:", error);
    return NextResponse.json(
      { error: "Could not subscribe right now. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.newsletterSubscriber.count();
    return NextResponse.json({ ok: true, total: count });
  } catch {
    return NextResponse.json({ ok: true, total: 0 });
  }
}
