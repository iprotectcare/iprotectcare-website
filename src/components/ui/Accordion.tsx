"use client";

import { useId, useState } from "react";

export type AccordionItem = { q: string; a: string };

/**
 * Keyboard-operable disclosure list (spec §11): native buttons, aria-expanded,
 * region labelled by its header, one item open at a time.
 */
export function Accordion({
  items,
  onContrast = false,
}: {
  items: readonly AccordionItem[];
  onContrast?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, i) => {
        const isOpen = open === i;
        const headerId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-11 w-full items-center justify-between gap-4 py-5 text-left font-medium"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className={`shrink-0 text-xl leading-none transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  } ${onContrast ? "text-on-contrast-secondary" : "text-secondary"}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={`pb-5 ${onContrast ? "text-on-contrast-secondary" : "text-secondary"}`}
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
