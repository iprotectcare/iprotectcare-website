import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { devices } from "@/content/devices";

export function DeviceGrid() {
  return (
    <Section id="devices">
      <Reveal>
        <SectionHeading
          eyebrow="What we repair"
          title="Every Apple device you own"
          sub="Pick your device to see repairs, pricing and turnaround times."
        />
      </Reveal>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {devices.map((d) => (
          <Link key={d.slug} href={`/${d.slug}`} className="group/link block h-full">
            <Card className="h-full">
              <div className="flex h-full flex-col">
                <div className="overflow-hidden border-b border-hairline">
                  <Image
                    src={d.image.src}
                    alt={d.image.alt}
                    width={505}
                    height={379}
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
                    className="aspect-[4/3] w-full object-cover object-bottom transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex grow flex-col p-5">
                  <p className="font-semibold">{d.name}</p>
                  <p className="mt-1 text-sm text-secondary">
                    {d.repairs.length} repair types
                  </p>
                  <span className="link-underline mt-auto pt-4 text-sm font-medium text-accent">
                    See repairs →
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </RevealGroup>
    </Section>
  );
}
