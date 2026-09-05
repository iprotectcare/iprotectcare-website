# Environment variable guide

Every key the iProtectCare website reads, where to get each value, and where
to put it. Written 2026-09-05.

| # | Variable | Powers | Required? | Time |
|---|---|---|---|---|
| 1 | `NEXT_PUBLIC_WHATSAPP_NUMBER` | wa.me handoff after booking | **Yes** | 1 min |
| 2 | `SHEETS_SHARED_SECRET` | Protects the Sheet webhook | **Yes** | 1 min |
| 3 | `SHEETS_WEBHOOK_URL` | Logs each booking to Google Sheets | **Yes** | 15 min |
| 4 | `GOOGLE_PLACE_ID` | Google-reviews section | Optional | 5 min |
| 5 | `GOOGLE_PLACES_API_KEY` | Google-reviews section | Optional | 10 min |

Without 1–3 the Book-a-Repair form still shows the WhatsApp button, but no
lead row is written anywhere. Without 4–5 the reviews section simply stays
hidden.

---

## 1. `NEXT_PUBLIC_WHATSAPP_NUMBER`

The destination for the "Send on WhatsApp" button. Digits only, with country
code, no `+` or spaces. For the shop's confirmed number:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=919886844485
```

## 2. `SHEETS_SHARED_SECRET`

A password you invent. The website sends it with every Sheet write; the Apps
Script (step 3) rejects requests without it, so strangers can't spam your
Sheet. Generate a strong one in the terminal:

```bash
openssl rand -hex 24
```

Copy the output — you'll paste the **same value** in two places: this env var
and the Apps Script's script property in step 3.

## 3. `SHEETS_WEBHOOK_URL`

This is the deployed Google Apps Script web app that appends a row per
booking. Build it once:

**a. Create the Sheet.** [sheets.new](https://sheets.new) → name it
"iProtectCare Leads" → put these headers in row 1:

```
Timestamp | Date | Time | Device | Model | Issue | Notes | Name | Phone | Email | Address | PIN | Consent | Source Page
```

**b. Attach the script.** In the Sheet: **Extensions → Apps Script**. Delete
the placeholder and paste:

```javascript
function doPost(e) {
  var props = PropertiesService.getScriptProperties();
  var data = JSON.parse(e.postData.contents);
  if (data.secret !== props.getProperty('SHARED_SECRET')) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  // Date/time formatted here in Asia/Kolkata — Vercel runs UTC (spec §8).
  var tz = 'Asia/Kolkata';
  var now = new Date();
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow([
    data.timestamp || now.toISOString(),
    Utilities.formatDate(now, tz, 'dd MMM yyyy'),
    Utilities.formatDate(now, tz, 'HH:mm'),
    data.device, data.model, data.issue, data.notes,
    data.name, data.phone, data.email,
    data.address, data.pin, data.consent, data.sourcePage
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

**c. Set the secret.** In the Apps Script editor: **Project Settings (gear) →
Script properties → Add script property**. Name: `SHARED_SECRET`, value: the
string from step 2. Save.

**d. Deploy.** **Deploy → New deployment → type: Web app.** Execute as:
**Me**. Who has access: **Anyone** (the shared secret is the actual gate).
Click Deploy, authorize when asked, and copy the **Web app URL** ending in
`/exec` — that URL is `SHEETS_WEBHOOK_URL`.

**e. Test it** (replace the URL and secret):

```bash
curl -sL -X POST "https://script.google.com/macros/s/XXXX/exec" \
  -H 'content-type: application/json' \
  -d '{"secret":"YOUR_SECRET","timestamp":"curl test","device":"iPhone","model":"Test row","issue":"Ignore me","notes":"","name":"Jane Doe","phone":"+91 9000000000","email":"jane.doe@example.com","address":"","pin":"","consent":"yes","sourcePage":"/curl-test"}'
```

Expect `{"ok":true}` and a new row in the Sheet. Delete the test row after.

> Editing the script later? Use **Deploy → Manage deployments → edit → new
> version** — creating a brand-new deployment changes the URL.

## 4 & 5. `GOOGLE_PLACE_ID` and `GOOGLE_PLACES_API_KEY`

These power the homepage Google-reviews section. The interactive wizard walks
you through both, verifies them against the live API, and saves them:

```bash
bash scripts/setup-google-reviews.sh
```

(Run it in a real terminal window, not through the chat prompt.) Summary of
what it does: verify your Google Business Profile exists → copy the Place ID
from Google's Place ID Finder → enable **Places API (New)** in Google Cloud →
create an API key restricted to that API.

---

## Where the values go

**Local development** — put all five in `.env.local` (never committed):

```
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
SHEETS_SHARED_SECRET=paste-from-step-2
NEXT_PUBLIC_WHATSAPP_NUMBER=919886844485
GOOGLE_PLACE_ID=ChIJ....
GOOGLE_PLACES_API_KEY=AIza....
```

Restart `npm run dev` after editing.

**Production** — Vercel dashboard → iprotectcare-website → **Settings →
Environment Variables** → add each name/value for all environments → then
**Deployments → ⋯ → Redeploy** so the running build picks them up.

## Final check

1. `npm run dev`, open `/book`, submit a test booking (use Jane Doe data) —
   expect the success screen **and** a new row in the Sheet.
2. Tap "Send on WhatsApp" — the prefilled chat must target the shop number.
3. Reviews section appears on the homepage only after the Business Profile
   has at least one real review (Google returns at most 5; the section links
   to the rest).
