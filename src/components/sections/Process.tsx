"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { steps } from "@/content/process";

/**
 * Four steps on surface-contrast (spec §4); the connecting line draws
 * itself on descent — the second and last scroll-linked effect (§6).
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="how-it-works" tone="contrast">
      <Reveal>
        <SectionHeading
          eyebrow="How it works"
          title="Four steps. No surprises."
          sub="You approve a fixed quote before any work begins."
          onContrast
        />
      </Reveal>
      <div ref={ref} className="relative">
        {/* connecting line (desktop) */}
        <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-on-contrast/15 lg:block">
          <motion.div
            className="h-full origin-left bg-accent"
            style={reduced ? { scaleX: 1 } : { scaleX }}
          />
        </div>
        <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="relative z-10 flex size-12 items-center justify-center rounded-full border border-on-contrast/20 bg-surface-contrast font-semibold text-accent">
                {i + 1}
              </div>
              <p className="mt-5 font-semibold">{s.title}</p>
              <p className="mt-1.5 text-sm text-on-contrast-secondary">{s.body}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
