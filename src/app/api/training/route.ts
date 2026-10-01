import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendToGoogleSheets } from "@/lib/google-sheets";

const trainingSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Please provide a valid email address").max(200),
  phone: z.string().trim().min(7, "Phone number is required").max(40),
  experience: z.string().trim().max(120).optional().nullable(),
  message: z.string().trim().max(1000).optional().nullable(),
  trackTitle: z.string().trim().max(200).optional().nullable(),
  _gotcha: z.string().optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = trainingSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { name, email, phone, experience, message, trackTitle, _gotcha } = parsed.data;

    // Honeypot check
    if (_gotcha) {
      return NextResponse.json({ ok: true, message: "Application received" }, { status: 201 });
    }

    // Forward to Google Sheets under "Training Applications" tab
    await sendToGoogleSheets({
      formType: "training",
      data: {
        name,
        email,
        phone,
        experience: experience || "Student / Recent Graduate",
        trackTitle: trackTitle || "General Pathway",
        message: message || "",
      },
      pageUrl: request.headers.get("referer") || "",
      userAgent: request.headers.get("user-agent") || "",
    });

    return NextResponse.json(
      { ok: true, message: "Application received successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[/api/training] failed:", error);
    return NextResponse.json(
      { error: "Could not submit your application right now. Please try again." },
      { status: 500 }
    );
  }
}
