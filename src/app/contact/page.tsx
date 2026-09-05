import type { Metadata } from "next";
import { FindUs } from "@/components/sections/FindUs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, WhatsApp or visit ${business.name} in ${business.locality}, ${business.city}. Open ${business.hoursOpen}–${business.hoursClose} for walk-in repairs.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Contact"
          title="Talk to a human, not a ticket queue"
          sub="Fastest: call or WhatsApp. Or walk straight in — no appointment needed."
        />
        <div className="flex flex-wrap gap-3">
          <Button href={business.phoneHref} size="lg">
            Call {business.phone}
          </Button>
          <Button
            href={`https://wa.me/${business.whatsappNumber}`}
            variant="secondary"
            size="lg"
            target="_blank"
            rel="noopener"
          >
            WhatsApp us
          </Button>
          <Button href={`mailto:${business.email}`} variant="ghost" size="lg">
            {business.email}
          </Button>
        </div>
      </Section>
      <FindUs />
    </>
  );
}
