import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendToGoogleSheets, FORM_WORK_MAPPINGS } from "@/lib/google-sheets";

const genericFormSchema = z.object({
  formType: z.string().trim().min(1, "formType is required"),
  data: z.record(z.string(), z.any()),
  _gotcha: z.string().optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = genericFormSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { formType, data, _gotcha } = parsed.data;

    // Validate formType
    if (!FORM_WORK_MAPPINGS[formType]) {
      return NextResponse.json(
        { error: `Unsupported formType: ${formType}` },
        { status: 400 }
      );
    }

    // Honeypot check
    if (_gotcha || data._gotcha || data.honeypot) {
      return NextResponse.json(
        { success: true, message: "Your form has been submitted successfully." },
        { status: 200 }
      );
    }

    // Basic required field validation
    if (data.email && typeof data.email === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        return NextResponse.json(
          { success: false, message: "Please enter a valid email address." },
          { status: 400 }
        );
      }
    }

    // Forward to Google Sheets
    const result = await sendToGoogleSheets({
      formType,
      data,
      pageUrl: request.headers.get("referer") || "",
      userAgent: request.headers.get("user-agent") || "",
    });

    return NextResponse.json(
      {
        success: result.success,
        message: result.message || "Your form has been submitted successfully.",
      },
      { status: result.success ? 200 : 500 }
    );
  } catch (error) {
    console.error("[/api/forms] failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to submit your request. Please try again." },
      { status: 500 }
    );
  }
}
