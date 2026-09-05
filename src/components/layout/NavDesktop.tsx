"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { devices } from "@/content/devices";

/** Desktop nav: Devices dropdown + top-level links (spec §4). */
export function NavDesktop() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onAway(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onAway);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("pointerdown", onAway);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
      <div ref={wrapRef} className="relative">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 items-center gap-1 rounded-full px-4 text-sm text-primary/80 transition-colors hover:text-primary"
        >
          Devices
          <span aria-hidden className={`text-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        {open && (
          <div
            role="menu"
            className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-hairline bg-surface p-2 shadow-xl shadow-black/10"
          >
            {devices.map((d) => (
              <Link
                key={d.slug}
                role="menuitem"
                href={`/${d.slug}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm text-primary/80 transition-colors hover:bg-surface-raised hover:text-primary"
              >
                {d.navLabel}
              </Link>
            ))}
          </div>
        )}
      </div>
      {[
        { href: "/about", label: "About" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact" },
      ].map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="flex min-h-11 items-center rounded-full px-4 text-sm text-primary/80 transition-colors hover:text-primary"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
