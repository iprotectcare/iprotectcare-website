import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { devices, getDevice } from "@/content/devices";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Process } from "@/components/sections/Process";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { BookRepairForm } from "@/components/forms/BookRepairForm";
import { business } from "@/content/business";
import { serviceJsonLd } from "@/lib/jsonld";

type Params = { device: string };

export function generateStaticParams(): Params[] {
  return devices.map((d) => ({ device: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const device = getDevice((await params).device);
  if (!device) return {};
  return {
    title: { absolute: device.metaTitle },
    description: device.metaDescription,
    alternates: { canonical: `/${device.slug}` },
  };
}

export default async function DevicePage({ params }: { params: Promise<Params> }) {
  const device = getDevice((await params).device);
  if (!device) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(device)) }}
      />
      {/* Hero */}
      <Section>
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">
            {device.name} repair
          </p>
          <h1
            className="font-semibold tracking-tight text-balance"
            style={{ fontSize: "var(--text-display)", lineHeight: 1.05 }}
          >
            {device.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-secondary">{device.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#book" size="lg">
              Book a Repair
            </Button>
            <Button href={business.phoneHref} variant="secondary" size="lg">
              Call {business.phone}
            </Button>
          </div>
          <p className="mt-8 text-sm text-secondary">
            <span className="font-medium text-primary">Models we service:</span>{" "}
            {device.models.filter((m) => !m.includes("TODO")).join(" · ")}
          </p>
        </div>
      </Section>

      {/* Repairs + price bands */}
      <Section tone="raised">
        <Reveal>
          <SectionHeading
            eyebrow="Repairs & pricing"
            title={`What we fix on your ${device.name}`}
            sub="Starting prices — your fixed quote comes with the free diagnosis."
          />
        </Reveal>
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {device.repairs.map((r) => (
            <Card key={r.slug} interactive={false} className="h-full bg-surface">
              <div className="flex h-full flex-col p-6">
                <p className="font-semibold">{r.name}</p>
                <p className="mt-1.5 text-sm text-secondary">{r.blurb}</p>
                <p className="mt-auto pt-4 text-sm font-medium text-accent">
                  {r.priceBand.includes("TODO") ? "Ask for today's price" : r.priceBand}
                </p>
              </div>
            </Card>
          ))}
        </RevealGroup>
      </Section>

      <Process />

      <FaqSection
        items={device.faq}
        title={`${device.name} repair questions`}
        sub="Anything model-specific? Call or WhatsApp and ask."
      />

      {/* Booking form, device preselected */}
      <Section id="book" tone="raised">
        <Reveal>
          <SectionHeading
            eyebrow="Book a repair"
            title={`Book your ${device.name} repair`}
            sub="Two minutes now, a free diagnosis next — we'll confirm on WhatsApp."
          />
        </Reveal>
        <Reveal>
          <div className="max-w-2xl">
            <BookRepairForm defaultDevice={device.formDeviceType} />
          </div>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
