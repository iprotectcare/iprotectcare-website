/**
 * Single source of truth for business facts (spec §2).
 * Every component reads from here; nothing is hardcoded elsewhere.
 */
export const business = {
  name: "iProtectCare",
  legalName: "iProtectCare Technology",
  areaLine: "Koramangala, Bengaluru 560034",
  /** Owner decision 2026-09-05: area-only for now; add the street line here when wanted. */
  streetAddress: "",
  locality: "Koramangala",
  city: "Bengaluru",
  region: "Karnataka",
  pin: "560034",
  phone: "+91 98868 44485",
  phoneHref: "tel:+919886844485",
  /** Digits only, for wa.me links. Confirmed same as phone (owner, 2026-09-05). */
  whatsappNumber: "919886844485",
  email: "iprotectcaretechnology@gmail.com",
  /** Confirmed 7 days (owner, 2026-09-05). */
  hoursLine: "9:30 AM – 9:30 PM, all days",
  hoursOpen: "09:30",
  hoursClose: "21:30",
  established: 2026,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=iProtectCare+Koramangala+Bengaluru",
  instagramUrl: "https://www.instagram.com/iprotect_care",
  instagramHandle: "@iprotect_care",
  domain: "https://www.iprotectcare.in",
} as const;

export const disclaimer =
  "iProtectCare is an independent service provider and is not affiliated with, authorised by, or endorsed by Apple Inc. Apple, iPhone, iPad, MacBook, iMac and Apple Watch are trademarks of Apple Inc.";
