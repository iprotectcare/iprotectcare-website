"use client";

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

        {/* Device visual — image slot; swap for shop photography later */}
        <motion.div
          style={reduced ? undefined : { y, opacity }}
          className="relative mx-auto w-full max-w-sm"
          aria-hidden
        >
          <DeviceIllustration />
        </motion.div>
      </div>
    </div>
  );
}

/** Neutral, theme-aware iPhone illustration — no third-party imagery. */
function DeviceIllustration() {
  return (
    <svg viewBox="0 0 320 420" fill="none" className="w-full drop-shadow-2xl">
      <defs>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--surface-contrast)" />
        </linearGradient>
      </defs>
      <rect
        x="60"
        y="20"
        width="200"
        height="380"
        rx="34"
        fill="var(--surface-contrast)"
        stroke="var(--hairline)"
        strokeWidth="2"
      />
      <rect x="70" y="30" width="180" height="360" rx="26" fill="url(#screen)" />
      {/* dynamic island */}
      <rect x="130" y="42" width="60" height="14" rx="7" fill="var(--surface-contrast)" />
      {/* glass reflection */}
      <path d="M70 120 190 30h40L90 390h-20z" fill="white" opacity="0.08" />
      {/* repaired check */}
      <circle cx="160" cy="210" r="34" fill="var(--surface)" opacity="0.95" />
      <path
        d="m146 211 9 9 19-20"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
