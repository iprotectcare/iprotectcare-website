"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

/**
 * Embla track (spec §6): real swipe physics, snap points, keyboard arrows.
 * Slides peek — a sliver of the next card shows so the track reads as
 * scrollable. Autoplay is opt-in per instance; when enabled it pauses on
 * hover and focus and is disabled entirely under prefers-reduced-motion.
 */
export function Carousel({
  children,
  ariaLabel,
  autoplayDelay,
  slideClassName = "flex-[0_0_85%] sm:flex-[0_0_46%] lg:flex-[0_0_31%]",
}: {
  children: ReactNode[];
  ariaLabel: string;
  /** ms between advances; omit for a manual-only track. */
  autoplayDelay?: number;
  /** Per-slide width classes; must overflow the container for looping. */
  slideClassName?: string;
}) {
  const reduced = useReducedMotion();
  const autoplay = Boolean(autoplayDelay) && !reduced;
  const [emblaRef, embla] = useEmblaCarousel(
    {
      align: "start",
      skipSnaps: false,
      containScroll: "trimSnaps",
      loop: autoplay,
    },
    autoplay
      ? [
          Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
          }),
        ]
      : [],
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
  }, [embla, onSelect]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") embla?.scrollPrev();
        if (e.key === "ArrowRight") embla?.scrollNext();
      }}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-4">
          {children.map((slide, i) => (
            <div key={i} className={`min-w-0 ${slideClassName}`}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => embla?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous slide"
          className="flex size-11 items-center justify-center rounded-full border border-hairline transition-opacity disabled:opacity-30"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => embla?.scrollNext()}
          disabled={!canNext}
          aria-label="Next slide"
          className="flex size-11 items-center justify-center rounded-full border border-hairline transition-opacity disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>
  );
}
