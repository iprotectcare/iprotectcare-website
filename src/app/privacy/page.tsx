import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${business.name} handles the details you share when booking a repair.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeading eyebrow="Legal" title="Privacy policy" />
      <div className="prose-sm max-w-2xl space-y-5 text-secondary">
        <p>
          When you book a repair, we collect your name, phone number, email, device
          details and — if you choose to give it — your address. We use these details
          for exactly one purpose: responding to your repair request and carrying out
          the repair.
        </p>
        <p>
          Booking details are stored in a private spreadsheet accessible only to the{" "}
          {business.name} team. We do not sell, rent or share your details with anyone,
          and we do not use them for marketing unless you separately ask us to.
        </p>
        <p>
          The website itself sets no advertising or analytics cookies. The only thing
          stored in your browser is your light/dark theme preference.
        </p>
        <p>
          Repairs never require access to your personal files, and we never browse the
          contents of a device left with us. Data-recovery jobs are the exception — there
          we access only what you ask us to recover, with your explicit instruction.
        </p>
        <p>
          To have your booking details corrected or deleted, contact us at{" "}
          <a href={`mailto:${business.email}`} className="link-underline text-primary">
            {business.email}
          </a>{" "}
          or call {business.phone}.
        </p>
      </div>
    </Section>
  );
}
