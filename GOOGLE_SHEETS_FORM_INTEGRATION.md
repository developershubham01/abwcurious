# Google Sheets Form Integration Documentation

## Overview
This document describes the production-ready integration between all website forms on **ABWcurious** and the central Google Spreadsheet.

- **Spreadsheet ID**: `1vIZ8YYEVJvL6cLf0NxV7UEZyPCJDVc96NYI31FQy4-E`
- **Spreadsheet URL**: [https://docs.google.com/spreadsheets/d/1vIZ8YYEVJvL6cLf0NxV7UEZyPCJDVc96NYI31FQy4-E/edit](https://docs.google.com/spreadsheets/d/1vIZ8YYEVJvL6cLf0NxV7UEZyPCJDVc96NYI31FQy4-E/edit)

---

## 1. Detected Website Forms & Tab Architecture

Every website form uses a predefined `formType` identifier mapped internally to a specific worksheet tab in the Google Spreadsheet:

| Predefined `formType` | Target Worksheet Tab Name | Key Form Fields Captured | Form Location / Trigger |
| :--- | :--- | :--- | :--- |
| `contact` | `Contact Form` | `Timestamp`, `Page URL`, `Form Type`, `name`, `email`, `phone`, `service`, `budget`, `message`, `User Agent`, `Referrer` | Main contact section (`#contact`) & `/contact` page |
| `career` | `Career Applications` | `Timestamp`, `Page URL`, `Form Type`, `name`, `email`, `phone`, `role`, `message`, `User Agent`, `Referrer` | Careers page role applications (`#careers`) & `/careers` |
| `recruitment` | `Recruitment Partner` | `Timestamp`, `Page URL`, `Form Type`, `company`, `name`, `email`, `phone`, `requirements`, `User Agent`, `Referrer` | Partner & corporate inquiry forms |
| `internship` | `Internship Applications` | `Timestamp`, `Page URL`, `Form Type`, `name`, `email`, `phone`, `college`, `domain`, `User Agent`, `Referrer` | Student / Internship application portals |
| `digital_marketing` | `Marketing Inquiry` | `Timestamp`, `Page URL`, `Form Type`, `name`, `email`, `phone`, `goals`, `budget`, `User Agent`, `Referrer` | Service inquiry form for Marketing |
| `website_development` | `Website Development Inquiry` | `Timestamp`, `Page URL`, `Form Type`, `name`, `email`, `phone`, `techStack`, `timeline`, `User Agent`, `Referrer` | Service inquiry form for Web & App Dev |
| `quote` | `Quote Requests` | `Timestamp`, `Page URL`, `Form Type`, `name`, `email`, `phone`, `projectType`, `estimatedBudget`, `User Agent`, `Referrer` | Project Estimator / Start Project CTA |
| `general` | `General Inquiry` | `Timestamp`, `Page URL`, `Form Type`, `name`, `email`, `phone`, `message`, `User Agent`, `Referrer` | General inquiries |
| `newsletter` | `Newsletter` | `Timestamp`, `Page URL`, `Form Type`, `email`, `source`, `User Agent`, `Referrer` | Footer newsletter form & Event waitlist forms |
| `training` | `Training Applications` | `Timestamp`, `Page URL`, `Form Type`, `name`, `email`, `phone`, `experience`, `trackTitle`, `message`, `User Agent`, `Referrer` | Training detail pages (`/training/[slug]`) |

---

## 2. Google Apps Script Backend Code (`code.gs`)

Follow the deployment instructions below to paste this script into your existing Google Spreadsheet.

```javascript
/**
 * ABWcurious - Central Google Apps Script Web App Backend
 * Existing Spreadsheet ID: 1vIZ8YYEVJvL6cLf0NxV7UEZyPCJDVc96NYI31FQy4-E
 */

var SPREADSHEET_ID = "1vIZ8YYEVJvL6cLf0NxV7UEZyPCJDVc96NYI31FQy4-E";

var FORM_CONFIG = {
  contact: "Contact Form",
  career: "Career Applications",
  recruitment: "Recruitment Partner",
  internship: "Internship Applications",
  digital_marketing: "Marketing Inquiry",
  website_development: "Website Development Inquiry",
  quote: "Quote Requests",
  general: "General Inquiry",
  newsletter: "Newsletter",
  training: "Training Applications"
};

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJSON({ success: false, message: "Empty request payload" });
    }

    var payload = JSON.parse(e.postData.contents);
    var formType = payload.formType;
    var data = payload.data || {};
    var pageUrl = payload.pageUrl || "";
    var userAgent = payload.userAgent || "";
    var referrer = payload.referrer || "";

    // 1. Honeypot Anti-Spam Check
    if (data._gotcha || data.honeypot || payload._gotcha || payload.honeypot) {
      return responseJSON({ success: true, message: "Your form has been submitted successfully." });
    }

    // 2. Form Type Validation
    if (!formType || !FORM_CONFIG[formType]) {
      return responseJSON({ success: false, message: "Invalid or unsupported formType: " + formType });
    }

    var sheetName = FORM_CONFIG[formType];
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(sheetName);

    // Automatically create worksheet tab if it does not exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // 3. Server-side ISO Timestamp
    var timestamp = new Date().toISOString();

    // 4. Formula Injection Protection (sanitizes =, +, -, @)
    function sanitize(val) {
      if (val === null || val === undefined) return "";
      var str = String(val).trim();
      if (/^[=+\-@]/.test(str)) {
        return "'" + str; // Prefix with single quote to escape Google Sheets formulas
      }
      return str;
    }

    // 5. Dynamic Header & Column Mapping
    var dataKeys = Object.keys(data).filter(function(k) {
      return k !== "_gotcha" && k !== "honeypot";
    });

    var headers = [];
    if (sheet.getLastRow() === 0) {
      headers = ["Timestamp", "Page URL", "Form Type"].concat(dataKeys).concat(["User Agent", "Referrer"]);
      var sanitizedHeaders = headers.map(sanitize);
      sheet.appendRow(sanitizedHeaders);
      // Format header row as bold
      sheet.getRange(1, 1, 1, sanitizedHeaders.length).setFontWeight("bold");
    } else {
      var firstRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      headers = firstRow.map(function(h) { return String(h).trim(); });
    }

    // Map submission data to matching column headers
    var rowValues = headers.map(function(header) {
      if (header === "Timestamp") return sanitize(timestamp);
      if (header === "Page URL") return sanitize(pageUrl);
      if (header === "Form Type") return sanitize(formType);
      if (header === "User Agent") return sanitize(userAgent);
      if (header === "Referrer") return sanitize(referrer);
      if (data.hasOwnProperty(header)) return sanitize(data[header]);
      return "";
    });

    // 6. Append Row (Never overwrites existing data)
    sheet.appendRow(rowValues);

    return responseJSON({
      success: true,
      message: "Your form has been submitted successfully."
    });
  } catch (err) {
    return responseJSON({
      success: false,
      message: "Unable to submit your request. Error: " + err.toString()
    });
  }
}

function responseJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return responseJSON({ success: true, message: "ABWcurious Google Sheets Integration Web App is Active." });
}
```

---

## 3. Google Apps Script Deployment Instructions

1. **Open the Google Spreadsheet**:
   Navigate to [https://docs.google.com/spreadsheets/d/1vIZ8YYEVJvL6cLf0NxV7UEZyPCJDVc96NYI31FQy4-E/edit](https://docs.google.com/spreadsheets/d/1vIZ8YYEVJvL6cLf0NxV7UEZyPCJDVc96NYI31FQy4-E/edit).
2. **Open Apps Script Editor**:
   Click **Extensions** → **Apps Script** in the top toolbar.
3. **Paste the Script**:
   Replace any existing contents in `Code.gs` with the complete code provided above.
4. **Save Project**:
   Click the Save icon (💾) or press `Ctrl + S`.
5. **Deploy as Web App**:
   - Click **Deploy** → **New deployment**.
   - Select type: **Web app** (click cog icon next to "Select type").
   - **Description**: `ABWcurious Website Forms Webhook v1`
   - **Execute as**: `Me (your google account)`
   - **Who has access**: `Anyone` (this allows website form submissions without forcing users to log in).
   - Click **Deploy**.
6. **Authorize Permissions**:
   - Click **Authorize access**.
   - Select your Google account.
   - Click **Advanced** → **Go to ABWcurious Web App (unsafe)** → **Allow**.
7. **Copy Web App URL**:
   Copy the generated URL (format: `https://script.google.com/macros/s/.../exec`).

---

## 4. Environment Variables

Add the copied Web App URL to your project's `.env.local` or environment configuration:

```env
NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_WEBAPP_ID/exec
```

---

## 5. Security & Protection Features

- **No Credentials Exposed**: Frontend code only talks to the Web App URL or Next.js server API routes. Service account credentials/tokens are never exposed to browser Javascript.
- **Honeypot Anti-Spam**: Hidden `_gotcha` input fields exist in forms. If a spam bot populates this field, the request is rejected gracefully without writing to the spreadsheet.
- **Formula Injection Protection**: Any value beginning with `=`, `+`, `-`, or `@` is prefixed with `'` to prevent execution as a formula inside Google Sheets.
- **Duplicate Submission Prevention**: Submit buttons are disabled immediately upon click and set to a loading state. Form state is reset only upon confirmed API success.

---

## 6. Testing Procedure & Checklist

Verify each of the following scenarios:

| Test Case | Expected Behavior |
| :--- | :--- |
| **Valid Contact Submission** | Data lands in `Contact Form` tab with correct timestamp, URL, name, email, phone, message. Form resets and displays success notification. |
| **Valid Training Submission** | Data lands in `Training Applications` tab with specified track title and background details. |
| **Valid Newsletter Submission** | Email lands in `Newsletter` tab with source (`footer` / `event:xxx`). |
| **Required Field Missing** | HTML5 / Zod validation catches missing field, submit button re-enabled, user inputs retained. |
| **Invalid Email** | Email format error displayed, no submission sent. |
| **Double Click Submit** | Button disabled on first click; only 1 row appended to Google Sheet. |
| **Honeypot Bot Test** | Submitting with `_gotcha` field populated returns success response but appends 0 rows to Google Sheet. |
| **Formula Injection Test** | Inputting `=SUM(A1:A10)` writes `'=SUM(A1:A10)` as plain text in Google Sheet without executing. |

---

## 7. How to Add a New Form in the Future

1. Open `src/lib/google-sheets.ts` and add your new form key to `FORM_WORK_MAPPINGS`:
   ```typescript
   new_form_type: "New Form Worksheet Name"
   ```
2. In Google Apps Script `Code.gs`, add the mapping to `FORM_CONFIG`:
   ```javascript
   new_form_type: "New Form Worksheet Name"
   ```
3. Update the frontend component to send `{ formType: "new_form_type", data: { ... } }`.
