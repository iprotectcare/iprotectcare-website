import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { flags } from "@/content/site";
import { testimonials } from "@/content/testimonials";

/**
 * Built but gated (spec §1): renders nothing until flags.showTestimonials
 * is true AND real reviews exist — never an empty or placeholder block.
 */
export function Testimonials() {
  if (!flags.showTestimonials || testimonials.length === 0) return null;

  return (
    <Section id="testimonials" tone="raised">
      <Reveal>
        <SectionHeading eyebrow="What customers say" title="Repairs people came back to review" />
      </Reveal>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.quote} interactive={false} className="h-full bg-surface">
            <figure className="flex h-full flex-col p-6">
              <blockquote className="text-sm leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-auto pt-4 text-sm text-secondary">
                {t.author} · {t.device}
              </figcaption>
            </figure>
          </Card>
        ))}
      </RevealGroup>
    </Section>
  );
}
