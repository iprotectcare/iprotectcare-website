import type { Booking } from "./schema";
import { postToSheet } from "./sheets";

/**
 * Delivery seam (spec §3): today a lead is logged to the Sheet and handed
 * to the customer as a wa.me prefill. When a WhatsApp Cloud API or gateway
 * arrives, it slots in here without touching any UI code.
 */
export async function notifyLead(
  b: Booking,
  sourcePage: string,
): Promise<{ sheetOk: boolean }> {
  try {
    await postToSheet(b, sourcePage);
    return { sheetOk: true };
  } catch (err) {
    // A lead reaching the owner via WhatsApp beats the row existing —
    // log for ops, never surface to the user (spec §8 failure handling).
    console.error("[book] sheet write failed:", err);
    return { sheetOk: false };
  }
}
