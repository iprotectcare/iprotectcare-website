/**
 * Single source of truth for business facts (spec §2).
 * Every component reads from here; nothing is hardcoded elsewhere.
 */
export const business = {
  name: "iProtectCare",
  legalName: "iProtectCare Technology",
  areaLine: "Koramangala, Bengaluru 560034",
  streetAddress: "TODO: confirm full street line",
  locality: "Koramangala",
  city: "Bengaluru",
  region: "Karnataka",
  pin: "560034",
  phone: "+91 98868 44485",
  phoneHref: "tel:+919886844485",
  /** Digits only, for wa.me links. TODO: confirm WhatsApp number matches phone. */
  whatsappNumber: "919886844485",
  email: "iprotectcaretechnology@gmail.com",
  hoursLine: "9:30 AM – 9:30 PM, all days (TODO: confirm 7-day)",
  hoursOpen: "09:30",
  hoursClose: "21:30",
  established: 2026,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=iProtectCare+Koramangala+Bengaluru",
  domain: "https://www.iprotectcare.in",
} as const;

export const disclaimer =
  "iProtectCare is an independent service provider and is not affiliated with, authorised by, or endorsed by Apple Inc. Apple, iPhone, iPad, MacBook, iMac and Apple Watch are trademarks of Apple Inc.";
