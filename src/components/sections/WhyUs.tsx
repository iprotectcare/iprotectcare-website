import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { sixPromises } from "@/content/why-us";
import { business } from "@/content/business";

export function WhyUs() {
  return (
    <Section id="why-us">
      <Reveal>
        <SectionHeading
          eyebrow={`Why ${business.name}`}
          title="Six promises, kept from day one"
          sub="No inflated claims — just the way we work, on every single repair."
        />
      </Reveal>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sixPromises.map((p) => (
          <Card key={p.title} interactive={false} className="h-full">
            <div className="p-6">
              <Icon name={p.icon} className="size-7 text-accent" />
              <p className="mt-4 font-semibold">{p.title}</p>
              <p className="mt-1.5 text-sm text-secondary">{p.body}</p>
            </div>
          </Card>
        ))}
      </RevealGroup>
    </Section>
  );
}
