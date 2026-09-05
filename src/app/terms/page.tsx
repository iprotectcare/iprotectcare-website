import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { business, disclaimer } from "@/content/business";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms under which ${business.name} provides device repair services.`,
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <Section>
      <SectionHeading eyebrow="Legal" title="Terms of service" />
      <div className="max-w-2xl space-y-5 text-secondary">
        <p>
          Diagnosis is free and carries no obligation. Work begins only after you
          approve a fixed quote, and the approved price is the price you pay.
        </p>
        <p>
          Every repair carries a written warranty covering the replaced part and the
          work done. The warranty does not cover new physical or liquid damage occurring
          after the repair.
        </p>
        <p>
          Please back up your device before a repair where possible. Most repairs do not
          touch your data, but as with any hardware work, we cannot guarantee data
          integrity and are not liable for data loss.
        </p>
        <p>
          Devices left uncollected for more than 60 days after we notify you that the
          repair is complete may be subject to storage handling; we will always attempt
          to reach you first on the contact details you provided.
        </p>
        <p>{disclaimer}</p>
      </div>
    </Section>
  );
}
