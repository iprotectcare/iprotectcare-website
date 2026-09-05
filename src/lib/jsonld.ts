import { business } from "@/content/business";
import type { Device } from "@/content/devices";

/** LocalBusiness for the root layout (spec §9) — what surfaces hours and a call button in results. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: business.domain,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: `${business.locality}, ${business.city}`,
      addressRegion: business.region,
      postalCode: business.pin,
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: business.hoursOpen,
      closes: business.hoursClose,
    },
    foundingDate: String(business.established),
  };
}

/** Service schema per device page (spec §9). */
export function serviceJsonLd(device: Device) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: device.metaTitle,
    description: device.metaDescription,
    url: `${business.domain}/${device.slug}`,
    areaServed: `${business.locality}, ${business.city}`,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.phone,
    },
  };
}

/** FAQPage schema for /faq (spec §9). */
export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
