import { NextResponse } from "next/server";
import { validateGoogleDriveUrl, saveApplication } from "@/lib/applications";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      whatsapp,
      location,
      city,
      state,
      country,
      experienceLevel,
      currentJobTitle,
      experienceYears,
      currentCompany,
      noticePeriod,
      expectedSalary,
      primarySkills,
      secondarySkills,
      frameworks,
      tools,
      highestQualification,
      degree,
      college,
      graduationYear,
      workModePreference,
      preferredLocation,
      coverMessage,
      resumeUrl,
      privacyConsent,
      source,
    } = body;

    const privacyConsentChecked = privacyConsent ?? body.privacyAccepted;

    // Validation
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Please fill in all mandatory fields (Name, Email, Phone)" },
        { status: 400 }
      );
    }

    if (!privacyConsentChecked) {
      return NextResponse.json(
        { error: "You must agree to the recruitment privacy consent to submit your application." },
        { status: 400 }
      );
    }

    // Google Drive URL validation
    const urlCheck = validateGoogleDriveUrl(resumeUrl);
    if (!urlCheck.valid) {
      return NextResponse.json({ error: urlCheck.error }, { status: 400 });
    }

    // Save application
    const newApplication = saveApplication({
      jobId: jobId || "GEN-POOL",
      jobTitle: jobTitle || body.applyingFor || "General Talent Pool",
      applyingFor: body.applyingFor || jobTitle || "General Talent Pool",
      fullName,
      email,
      phone,
      whatsapp: whatsapp || "",
      location,
      city: city || "",
      state: state || "",
      country: country || "India",
      experienceLevel: experienceLevel || "0–1 Years",
      currentJobTitle: currentJobTitle || "",
      experienceYears: experienceYears || "0",
      currentCompany: currentCompany || "",
      noticePeriod: noticePeriod || "",
      expectedSalary: expectedSalary || "",
      primarySkills,
      secondarySkills: secondarySkills || "",
      frameworks: frameworks || "",
      tools: tools || "",
      highestQualification,
      degree: degree || "",
      college: college || "",
      graduationYear: graduationYear || "",
      workModePreference: workModePreference || "Hybrid",
      preferredLocation: preferredLocation || "Navi Mumbai",
      coverMessage: coverMessage || "",
      resumeUrl,
      privacyConsent: true,
      source: source || "Website Direct",
      type: jobId ? "JOB_APPLICATION" : "TALENT_POOL",
    });

    // Option: Forward to Google Sheets if GOOGLE_SHEETS_SCRIPT_URL is set
    const googleScriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
    if (googleScriptUrl) {
      try {
        await fetch(googleScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheet: "Job Applications",
            ...newApplication,
          }),
        });
      } catch (e) {
        console.error("Google Sheets forward error:", e);
      }
    }

    return NextResponse.json({
      success: true,
      applicationId: newApplication.id,
      message: "Application submitted successfully!",
    });
  } catch (error) {
    console.error("Careers API error:", error);
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 });
  }
}
