import type { Metadata } from "next";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { generalFaq } from "@/content/faq";
import { faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about repair pricing, turnaround times, parts, warranties and data safety at iProtectCare in Koramangala, Bengaluru.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(generalFaq)) }}
      />
      <FaqSection />
      <CtaBand />
    </>
  );
}
