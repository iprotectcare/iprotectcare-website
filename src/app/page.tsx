import { Hero } from "@/components/sections/Hero";
import { DeviceGrid } from "@/components/sections/DeviceGrid";
import { RepairCarousel } from "@/components/sections/RepairCarousel";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FindUs } from "@/components/sections/FindUs";
import { FaqSection } from "@/components/sections/FaqSection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BookRepairForm } from "@/components/forms/BookRepairForm";

export default function Home() {
  return (
    <>
      <Hero />
      <DeviceGrid />
      <RepairCarousel />
      <WhyUs />
      {/* Testimonials slot between WhyUs and Process once real reviews exist (spec §4) */}
      <Testimonials />
      <Process />
      <Section id="book">
        <Reveal>
          <SectionHeading
            eyebrow="Book a repair"
            title="Tell us what happened"
            sub="Two minutes now, a free diagnosis next — we'll confirm on WhatsApp."
          />
        </Reveal>
        <Reveal>
          <div className="max-w-2xl">
            <BookRepairForm />
          </div>
        </Reveal>
      </Section>
      <FindUs />
      <FaqSection />
    </>
  );
}
