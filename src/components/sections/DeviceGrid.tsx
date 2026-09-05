import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { devices } from "@/content/devices";

const deviceIcons: Record<string, string> = {
  "iphone-repair": "screen",
  "ipad-repair": "screen",
  "macbook-repair": "keyboard",
  "mac-repair": "chip",
  "apple-watch-repair": "clock",
};

export function DeviceGrid() {
  return (
    <Section id="devices">
      <Reveal>
        <SectionHeading
          eyebrow="What we repair"
          title="Every Apple device you own"
          sub="Pick your device to see repairs, indicative prices and turnaround times."
        />
      </Reveal>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {devices.map((d) => (
          <Link key={d.slug} href={`/${d.slug}`} className="group/link block h-full">
            <Card className="h-full">
              <div className="flex h-full flex-col p-6">
                <Icon name={deviceIcons[d.slug]} className="size-7 text-accent" />
                <p className="mt-4 font-semibold">{d.name}</p>
                <p className="mt-1 text-sm text-secondary">
                  {d.repairs.length} repair types
                </p>
                <span className="link-underline mt-auto pt-4 text-sm font-medium text-accent">
                  See repairs →
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </RevealGroup>
    </Section>
  );
}
