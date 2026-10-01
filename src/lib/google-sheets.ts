/**
 * Central Google Sheets Integration Helper for ABWcurious
 * Spreadsheet ID: 1vIZ8YYEVJvL6cLf0NxV7UEZyPCJDVc96NYI31FQy4-E
 */

export const FORM_WORK_MAPPINGS: Record<string, string> = {
  contact: "Contact Form",
  career: "Career Applications",
  recruitment: "Recruitment Partner",
  internship: "Internship Applications",
  digital_marketing: "Marketing Inquiry",
  website_development: "Website Development Inquiry",
  quote: "Quote Requests",
  general: "General Inquiry",
  newsletter: "Newsletter",
  training: "Training Applications",
};

export interface FormSubmissionPayload {
  formType: keyof typeof FORM_WORK_MAPPINGS | string;
  data: Record<string, any>;
  pageUrl?: string;
  referrer?: string;
  userAgent?: string;
  _gotcha?: string;
  honeypot?: string;
}

/**
 * Sanitize formula injection characters (=, +, -, @)
 */
export function sanitizeFieldValue(val: any): string {
  if (val === null || val === undefined) return "";
  const str = String(val).trim();
  if (/^[=+\-@]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Validate phone number format (optional or required)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || !phone.trim()) return true; // optional
  const re = /^[\d\s+\-()]{7,25}$/;
  return re.test(phone.trim());
}

/**
 * Submit form data to Google Apps Script Web App
 */
export async function sendToGoogleSheets(
  payload: FormSubmissionPayload
): Promise<{ success: boolean; message: string }> {
  // Honeypot spam check
  if (payload._gotcha || payload.honeypot || payload.data?._gotcha || payload.data?.honeypot) {
    return { success: true, message: "Your form has been submitted successfully." };
  }

  const webhookUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL ||
    "https://script.google.com/macros/s/AKfycbzptnYHHvEsOua7NG0bYYWcRkAknrYJ1hdPJCBKIPoRNHtSN2Qp4dL6vT11B_25Mc0q/exec";

  if (!webhookUrl) {
    console.warn(
      "[GoogleSheets] Webhook URL not configured in environment variables (NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL)."
    );
    // Graceful fallback if webhook URL isn't configured yet
    return { success: true, message: "Form submitted locally." };
  }

  try {
    // Sanitize data values
    const sanitizedData: Record<string, string> = {};
    for (const [key, value] of Object.entries(payload.data)) {
      if (key !== "_gotcha" && key !== "honeypot") {
        sanitizedData[key] = sanitizeFieldValue(value);
      }
    }

    const formattedPayload = {
      formType: payload.formType,
      data: sanitizedData,
      pageUrl: payload.pageUrl || (typeof window !== "undefined" ? window.location.href : ""),
      referrer: payload.referrer || (typeof window !== "undefined" ? document.referrer : ""),
      userAgent: payload.userAgent || (typeof window !== "undefined" ? navigator.userAgent : ""),
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // text/plain prevents CORS preflight issues with Apps Script
      body: JSON.stringify(formattedPayload),
    });

    if (!res.ok) {
      throw new Error(`Apps script returned status ${res.status}`);
    }

    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { success: true };
    }

    return {
      success: json.success !== false,
      message: json.message || "Your form has been submitted successfully.",
    };
  } catch (err) {
    console.error("[GoogleSheets] Submission error:", err);
    return {
      success: false,
      message: "Unable to submit your request. Please try again.",
    };
  }
}
