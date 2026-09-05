import { Card } from "@/components/ui/Card";
import { Carousel } from "@/components/ui/Carousel";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { commonRepairs } from "@/content/repairs";

export function RepairCarousel() {
  return (
    <Section id="repairs" tone="raised" width="wide">
      <Reveal>
        <SectionHeading
          eyebrow="What we fix"
          title="From cracked glass to dead logic boards"
          sub="The eight repairs we handle every day — and plenty more besides."
        />
      </Reveal>
      <Reveal>
        <Carousel ariaLabel="Common repairs" autoplayDelay={3000}>
          {commonRepairs.map((r) => (
            <Card key={r.name} className="h-full bg-surface">
              <div className="flex h-full min-h-44 flex-col p-6">
                <Icon name={r.icon} className="size-7 text-accent" />
                <p className="mt-4 font-semibold">{r.name}</p>
                <p className="mt-1.5 text-sm text-secondary">{r.blurb}</p>
              </div>
            </Card>
          ))}
        </Carousel>
      </Reveal>
    </Section>
  );
}
