# Missing environment values — action checklist

Status as of 2026-09-05: **all 5 values are missing** from `.env.local`, and
none are set in Vercel. Work top to bottom; the first three unlock the
booking → Google Sheet pipeline. Full walkthrough with the Apps Script code:
[`environment-variables.md`](environment-variables.md).

## ☐ 1. `NEXT_PUBLIC_WHATSAPP_NUMBER` — 1 minute

Digits only, country code first. The shop's confirmed number:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=919886844485
```

- [ ] Added to `.env.local`
- [ ] Added in Vercel

## ☐ 2. `SHEETS_SHARED_SECRET` — 1 minute

Invent it yourself in the terminal:

```bash
openssl rand -hex 24
```

Keep the output — the same string also goes into the Apps Script in step 3c.

- [ ] Generated and added to `.env.local`
- [ ] Added in Vercel

## ☐ 3. `SHEETS_WEBHOOK_URL` — ~15 minutes

The deployed Apps Script that logs bookings to your Sheet.
Detailed steps + the full script: [environment-variables.md §3](environment-variables.md#3-sheets_webhook_url).

- [ ] a. Sheet created at [sheets.new](https://sheets.new) with the 14 column headers
- [ ] b. Apps Script pasted (Extensions → Apps Script)
- [ ] c. Script property `SHARED_SECRET` set to the value from step 2
- [ ] d. Deployed as Web app (Execute as **Me**, access **Anyone**) — copy the `/exec` URL
- [ ] e. `curl` test returns `{"ok":true}` and a row appears in the Sheet
- [ ] URL added to `.env.local` and Vercel

## ☐ 4 & 5. `GOOGLE_PLACE_ID` + `GOOGLE_PLACES_API_KEY` — ~15 minutes

Optional (reviews section stays hidden without them). Blocked until the
**Google Business Profile is created and verified** — do that first at
[business.google.com](https://business.google.com), then run the wizard in a
real terminal window:

```bash
bash scripts/setup-google-reviews.sh
```

- [ ] Google Business Profile created and verified
- [ ] Wizard run — both values saved to `.env.local`, live API check passed
- [ ] Both added in Vercel

## When everything above is ticked

- [ ] Vercel: Deployments → ⋯ → **Redeploy** (env changes need a fresh build)
- [ ] Local: restart `npm run dev`, submit a Jane-Doe test booking on `/book`
      → success screen + row in the Sheet + WhatsApp prefill targets the shop
- [ ] Delete the test row from the Sheet
