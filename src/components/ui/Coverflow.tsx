"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

/**
 * Cover-flow track: the centered slide is full size; neighbours shrink,
 * tuck behind it and tilt away, driven by scroll position so swiping
 * "rotates" the stack. Autoplay pauses on hover/focus. Under
 * prefers-reduced-motion the 3D treatment and autoplay are both off.
 */
export function Coverflow({
  children,
  ariaLabel,
  autoplayDelay,
}: {
  children: ReactNode[];
  ariaLabel: string;
  autoplayDelay?: number;
}) {
  const reduced = useReducedMotion();
  const autoplay = Boolean(autoplayDelay) && !reduced;
  const [emblaRef, embla] = useEmblaCarousel(
    { align: "center", loop: true, skipSnaps: false },
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

  const tween = useCallback(() => {
    if (!embla || reduced) return;
    const engine = embla.internalEngine();
    const progress = embla.scrollProgress();
    const snaps = embla.scrollSnapList();

    embla.slideNodes().forEach((node, index) => {
      let diff = snaps[index] - progress;
      // account for looped clones (Embla's documented loop adjustment)
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diff = snaps[index] - (1 + progress);
            if (sign === 1) diff = snaps[index] + (1 - progress);
          }
        });
      }
      const inner = node.firstElementChild as HTMLElement | null;
      if (!inner) return;
      // progress is normalised over the whole track, so re-scale distance
      // to "number of slides from centre" (≈1 for the adjacent slide)
      const d = diff * snaps.length;
      const abs = Math.abs(d);
      const scale = Math.max(0.72, 1 - abs * 0.16);
      const rotate = Math.max(-48, Math.min(48, d * 42));
      const depth = Math.min(300, abs * 220);
      const shift = Math.max(-30, Math.min(30, d * -22));
      const opacity = Math.max(0.45, 1 - abs * 0.35);
      inner.style.transform = `perspective(900px) translateX(${shift}%) translateZ(${-depth}px) rotateY(${-rotate}deg) scale(${scale})`;
      inner.style.opacity = String(opacity);
      node.style.zIndex = String(Math.round(100 - abs * 100));
    });
  }, [embla, reduced]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    tween();
    embla
      .on("select", onSelect)
      .on("reInit", onSelect)
      .on("scroll", tween)
      .on("reInit", tween);
  }, [embla, onSelect, tween]);

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
      <div ref={emblaRef} className="overflow-hidden py-4">
        <div className="flex touch-pan-y">
          {children.map((slide, i) => (
            <div
              key={i}
              className="relative min-w-0 flex-[0_0_78%] sm:flex-[0_0_55%] lg:flex-[0_0_44%]"
            >
              <div className="will-change-transform">{slide}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-3">
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
