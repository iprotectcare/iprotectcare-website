"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { devices } from "@/content/devices";
import { business } from "@/content/business";
import { Button } from "@/components/ui/Button";

/** Mobile nav: hamburger opening a full-screen sheet (spec §4). */
export function NavMobile() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 flex-col items-center justify-center gap-[5px]"
      >
        <span
          aria-hidden
          className={`h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[3.25px] rotate-45" : ""}`}
        />
        <span
          aria-hidden
          className={`h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[3.25px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-surface px-6 pb-28 pt-4">
          <nav aria-label="Mobile" className="flex flex-col">
            <p className="pb-2 pt-4 text-xs font-semibold tracking-wide text-secondary uppercase">
              Devices
            </p>
            {devices.map((d) => (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-4 text-lg font-medium"
              >
                {d.navLabel}
              </Link>
            ))}
            {[
              { href: "/about", label: "About" },
              { href: "/faq", label: "FAQ" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-4 text-lg font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <Button href="/book" size="lg" onClick={() => setOpen(false)}>
              Book a Repair
            </Button>
            <Button href={business.phoneHref} variant="secondary" size="lg">
              Call {business.phone}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
