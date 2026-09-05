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

/** Homepage image-gallery carousel. Swap files in public/images/ to update. */
export const gallery = [
  { src: "/images/devices/iphone.jpg", alt: "Three iPhones seen from the back and side" },
  { src: "/images/gallery/macbook-side.jpg", alt: "MacBook Air seen from the side, slightly open" },
  { src: "/images/devices/watch.jpg", alt: "Three Apple Watches side by side" },
  { src: "/images/gallery/airpods-max-blue.png", alt: "AirPods Max in blue" },
  { src: "/images/devices/ipad.jpg", alt: "A fanned stack of iPad Air tablets in five colours" },
  { src: "/images/gallery/watch-bands.jpg", alt: "Colourful Apple Watch bands in a row" },
  { src: "/images/devices/macbook.jpg", alt: "Two MacBook Air laptops, one open and one closed" },
  { src: "/images/gallery/airpods-max-orange.png", alt: "AirPods Max in orange" },
  { src: "/images/devices/mac.jpg", alt: "A hand holding a Mac mini" },
] as const;

/** Feature flags for content that ships built but hidden. */
export const flags = {
  /**
   * Testimonials section (spec §1): designed and built, but renders nothing
   * until real reviews exist. Flip to true and fill content/testimonials.ts.
   */
  showTestimonials: false,
} as const;
