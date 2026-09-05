import type { Booking } from "./schema";

/**
 * WhatsApp renders *bold* and newlines and nothing else (spec §8):
 * one line per field, empty optionals dropped, whole string URL-encoded.
 */
export function buildWhatsAppMessage(b: Booking): string {
  const addressLine = b.address
    ? `*Address:* ${b.address}${b.pin ? ` — ${b.pin}` : ""}`
    : undefined;

  const lines = [
    "*New Repair Request* — iProtectCare",
    "",
    `*Device:* ${b.model}`,
    `*Issue:* ${b.issue}`,
    b.notes ? `*Notes:* ${b.notes}` : undefined,
    "",
    `*Name:* ${b.name}`,
    `*Phone:* +91 ${b.phone}`,
    b.email ? `*Email:* ${b.email}` : undefined,
    addressLine,
    "",
    "_Sent from iprotectcare.in_",
  ];

  return lines.filter((l): l is string => l !== undefined).join("\n");
}

/** wa.me deep link: digits-only number, encodeURIComponent'd message. */
export function buildWaUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
