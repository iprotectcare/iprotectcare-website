export type Testimonial = { quote: string; author: string; device: string };

/**
 * Empty until real reviews exist — the section is gated behind
 * flags.showTestimonials and must never show placeholder reviews (spec §1).
 */
export const testimonials: Testimonial[] = [];
