/** Hero trust strip (spec §4). */
export const trustStrip = [
  "Free diagnosis",
  "Warranty on repairs",
  "Same-day on common fixes",
  "Quality parts",
] as const;

/** Homepage hero copy. */
export const hero = {
  headline: "Your Apple device, fixed right.",
  promise:
    "Independent iPhone, iPad, MacBook and Apple Watch repair in Koramangala — free diagnosis, fixed quotes, and most common repairs done the same day.",
} as const;

/** Feature flags for content that ships built but hidden. */
export const flags = {
  /**
   * Testimonials section (spec §1): designed and built, but renders nothing
   * until real reviews exist. Flip to true and fill content/testimonials.ts.
   */
  showTestimonials: false,
} as const;
