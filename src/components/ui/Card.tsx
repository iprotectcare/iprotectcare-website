"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

/**
 * Raised card with the spec §6 hover treatment: 4px lift, hairline
 * brighten, and a radial highlight tracking the cursor — all gated
 * behind (hover: hover) so nothing sticks after a tap on touch.
 */
export function Card({
  children,
  className = "",
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function track(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={interactive ? track : undefined}
      className={`group relative overflow-hidden rounded-2xl border border-hairline bg-surface-raised transition-[transform,border-color,box-shadow] duration-300 ${
        interactive
          ? "[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-primary/25 [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:shadow-black/5"
          : ""
      } ${className}`}
    >
      {interactive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 8%, transparent), transparent 70%)",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
