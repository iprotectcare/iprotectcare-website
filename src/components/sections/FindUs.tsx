import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/content/business";

export function FindUs() {
  return (
    <Section id="find-us" tone="raised">
      <Reveal>
        <SectionHeading
          eyebrow="Find us"
          title="A real shop in Koramangala"
          sub="Walk in any day — or get directions and we'll see you shortly."
        />
      </Reveal>
      <Reveal>
        <div className="grid gap-8 overflow-hidden rounded-2xl border border-hairline bg-surface md:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 p-8">
            <div className="flex items-start gap-3">
              <Icon name="map-pin" className="mt-0.5 size-5 shrink-0 text-accent" />
              <div>
                <p className="font-medium">{business.name}</p>
                <p className="text-sm text-secondary">{business.areaLine}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-accent" />
              <p className="text-sm text-secondary">{business.hoursLine}</p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-accent" />
              <a href={business.phoneHref} className="link-underline text-sm text-secondary">
                {business.phone}
              </a>
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href={business.mapsUrl} target="_blank" rel="noopener">
                Get directions
              </Button>
              <Button href={`https://wa.me/${business.whatsappNumber}`} variant="secondary" target="_blank" rel="noopener">
                <Icon name="whatsapp" className="size-5 text-[#25D366]" />
                WhatsApp us
              </Button>
            </div>
          </div>
          <iframe
            title={`Map showing ${business.name} in ${business.locality}, ${business.city}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${business.name} ${business.locality} ${business.city}`,
            )}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-72 w-full border-0"
          />
        </div>
      </Reveal>
    </Section>
  );
}
