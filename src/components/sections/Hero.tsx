"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/Button";
import { business } from "@/content/business";
import { hero, trustStrip } from "@/content/site";

/**
 * Hero (spec §4): display headline, one-line promise, dual CTA, device
 * visual drifting slower than the page and softening as it leaves (§6),
 * and the trust strip.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-surface">
      {/* soft accent wash behind the device */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 size-[560px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 55%, transparent), transparent 65%)",
        }}
      />
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-16 pt-14 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:pb-24 md:pt-20">
        <div>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-semibold tracking-tight text-balance"
            style={{ fontSize: "var(--text-display)", lineHeight: 1.05 }}
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-5 max-w-xl text-lg text-secondary"
          >
            {hero.promise}
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="/book" size="lg">
              Book a Repair
            </Button>
            <Button href={business.phoneHref} variant="secondary" size="lg">
              Call {business.phone}
            </Button>
          </motion.div>
          <motion.ul
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-secondary"
          >
            {trustStrip.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Device visual — swap the file in public/images/devices/ to rebrand */}
        <motion.div
          style={reduced ? undefined : { y, opacity }}
          className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-hairline"
        >
          <Image
            src="/images/devices/iphone.jpg"
            alt="Three iPhones seen from the back and side"
            width={744}
            height={1488}
            priority
            sizes="(min-width: 768px) 24rem, 80vw"
            className="aspect-[4/5] w-full object-cover object-bottom"
          />
        </motion.div>
      </div>
    </div>
  );
}
