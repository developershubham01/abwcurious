import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendToGoogleSheets } from "@/lib/google-sheets";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Please provide a valid email address").max(200),
  phone: z.string().trim().max(40).optional().nullable(),
  service: z.string().trim().max(80).optional().nullable(),
  budget: z.string().trim().max(80).optional().nullable(),
  message: z.string().trim().min(10, "Please tell us a little more (10+ characters)").max(800, "Message is limited to 800 characters"),
  _gotcha: z.string().optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { name, email, phone, service, budget, message, _gotcha } = parsed.data;

    // Honeypot check
    if (_gotcha) {
      return NextResponse.json(
        { ok: true, id: "sp-drop", message: "Message received" },
        { status: 201 }
      );
    }

    const saved = await db.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        service: service || "General",
        message,
      },
    });

    // Forward to Google Sheets
    sendToGoogleSheets({
      formType: "contact",
      data: {
        name,
        email,
        phone: phone || "",
        service: service || "General",
        budget: budget || "Not specified",
        message,
      },
      pageUrl: request.headers.get("referer") || "",
      userAgent: request.headers.get("user-agent") || "",
    }).catch((err) => console.error("[GoogleSheets] Contact error:", err));

    return NextResponse.json(
      { ok: true, id: saved.id, message: "Message received" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[/api/contact] failed:", error);
    return NextResponse.json(
      { error: "Could not send your message right now. Please email us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.contactMessage.count();
    return NextResponse.json({ ok: true, total: count });
  } catch {
    return NextResponse.json({ ok: true, total: 0 });
  }
}
