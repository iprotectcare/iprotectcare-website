import type { Metadata } from "next";
import { FindUs } from "@/components/sections/FindUs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
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
            <Icon name="whatsapp" className="size-5 text-[#25D366]" />
            WhatsApp us
          </Button>
          <Button href={`mailto:${business.email}`} variant="ghost" size="lg">
            {business.email}
          </Button>
          <Button href={business.instagramUrl} variant="ghost" size="lg" target="_blank" rel="noopener">
            <Icon name="instagram" className="size-5" />
            {business.instagramHandle}
          </Button>
        </div>
      </Section>
      <FindUs />
    </>
  );
}
