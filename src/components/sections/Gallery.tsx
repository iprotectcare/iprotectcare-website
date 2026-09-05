import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { gallery } from "@/content/site";

/** Swipeable image carousel (spec §6 gallery) — Embla, no autoplay. */
export function Gallery() {
  return (
    <Section id="gallery" width="wide">
      <Reveal>
        <SectionHeading
          eyebrow="Gallery"
          title="The devices we bring back to life"
          sub="Swipe through — if it's on this track, we repair it."
        />
      </Reveal>
      <Reveal>
        <Carousel ariaLabel="Device gallery">
          {gallery.map((g) => (
            <div
              key={g.src}
              className="overflow-hidden rounded-2xl border border-hairline bg-surface-raised"
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={800}
                height={600}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
                className="aspect-[4/3] w-full object-cover object-bottom"
              />
            </div>
          ))}
        </Carousel>
      </Reveal>
    </Section>
  );
}
