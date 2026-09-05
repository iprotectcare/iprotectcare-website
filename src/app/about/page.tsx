import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WhyUs } from "@/components/sections/WhyUs";
import { CtaBand } from "@/components/sections/CtaBand";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "About",
  description: `${business.name} is an independent Apple device repair shop in ${business.locality}, ${business.city}, established ${business.established}. Free diagnosis, transparent pricing, warranty on every repair.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="About us"
          title={`An independent repair shop that treats your device like its own`}
        />
        <div className="max-w-2xl space-y-5 text-lg text-secondary">
          <p>
            {business.name} opened in {business.locality} in {business.established} with a
            simple idea: device repair without the runaround. You get a free diagnosis, a
            fixed quote before any work begins, and a written warranty when you collect.
          </p>
          <p>
            We repair iPhone, iPad, MacBook, Mac desktops and Apple Watch — screens,
            batteries, water damage, and the board-level faults other shops turn away.
            Most common repairs are done the same day.
          </p>
          <p>
            We&apos;re an independent shop, not an authorised service centre. That
            independence is what lets us repair out-of-warranty devices at sensible
            prices and turn them around fast.
          </p>
        </div>
      </Section>
      <Reveal>
        <WhyUs />
      </Reveal>
      <CtaBand />
    </>
  );
}
