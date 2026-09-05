/** Feature flags for content that ships built but hidden. */
export const flags = {
  /**
   * Testimonials section (spec §1): designed and built, but renders nothing
   * until real reviews exist. Flip to true and fill content/testimonials.ts.
   */
  showTestimonials: false,
} as const;
