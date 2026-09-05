import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/content/business";

/** Closing call-to-action band used on device and about pages. */
export function CtaBand() {
  return (
    <Section tone="contrast">
      <Reveal>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2
              className="font-semibold tracking-tight"
              style={{ fontSize: "var(--text-title)", lineHeight: 1.1 }}
            >
              Broken today? Fixed today.
            </h2>
            <p className="mt-2 text-on-contrast-secondary">
              Free diagnosis first — you only pay when you approve the quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/book" size="lg">
              Book a Repair
            </Button>
            <Button
              href={business.phoneHref}
              size="lg"
              className="border border-on-contrast/25 bg-transparent text-on-contrast hover:bg-on-contrast/10"
            >
              Call {business.phone}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
