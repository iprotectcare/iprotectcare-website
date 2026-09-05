import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Carousel } from "@/components/ui/Carousel";
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
      <Reveal>
        <Carousel
          ariaLabel="Customer testimonials"
          autoplayDelay={3000}
          slideClassName="flex-[0_0_85%] sm:flex-[0_0_55%] lg:flex-[0_0_40%]"
        >
          {testimonials.map((t) => (
            <Card key={t.quote} interactive={false} className="h-full bg-surface">
              <figure className="flex h-full min-h-52 flex-col p-6">
                <blockquote className="text-sm leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-auto pt-4 text-sm text-secondary">
                  {t.author} · {t.device}
                </figcaption>
              </figure>
            </Card>
          ))}
        </Carousel>
      </Reveal>
    </Section>
  );
}
