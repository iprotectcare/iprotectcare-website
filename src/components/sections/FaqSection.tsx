import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { generalFaq } from "@/content/faq";

export function FaqSection({
  items = generalFaq,
  title = "Questions, answered",
  sub = "Anything else? Call or WhatsApp — a human picks up.",
}: {
  items?: readonly AccordionItem[];
  title?: string;
  sub?: string;
}) {
  return (
    <Section id="faq">
      <Reveal>
        <SectionHeading eyebrow="FAQ" title={title} sub={sub} />
      </Reveal>
      <Reveal>
        <div className="max-w-3xl">
          <Accordion items={items} />
        </div>
      </Reveal>
    </Section>
  );
}
