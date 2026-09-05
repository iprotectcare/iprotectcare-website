import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BookRepairForm } from "@/components/forms/BookRepairForm";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Book a Repair",
  description: `Book an Apple device repair with ${business.name} in Koramangala, Bengaluru. Free diagnosis, fixed quote, warranty on every repair.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Book a repair"
        title="Tell us what happened"
        sub="Two minutes now, a free diagnosis next — we'll confirm your slot on WhatsApp."
      />
      <div className="max-w-2xl">
        <BookRepairForm />
      </div>
    </Section>
  );
}
