import type { Booking } from "./schema";

/**
 * Appends a lead row by POSTing to the deployed Apps Script web app
 * (spec §8). Date/time formatting in Asia/Kolkata happens IN the script —
 * Vercel runs UTC. Throws on non-2xx or timeout; caller decides what a
 * failure means for the user.
 */
export async function postToSheet(b: Booking, sourcePage: string): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_SHARED_SECRET;
  if (!url || !secret) throw new Error("Sheets webhook not configured");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        secret,
        timestamp: new Date().toISOString(),
        device: b.deviceType,
        model: b.model,
        issue: b.issue,
        notes: b.notes ?? "",
        name: b.name,
        phone: `+91 ${b.phone}`,
        email: b.email,
        address: b.address ?? "",
        pin: b.pin ?? "",
        consent: b.consent ? "yes" : "no",
        sourcePage,
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Sheet write failed: ${res.status}`);
  } finally {
    clearTimeout(timer);
  }
}
