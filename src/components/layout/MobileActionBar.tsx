import Link from "next/link";
import { business } from "@/content/business";

/**
 * Persistent bottom bar on mobile pinning Call · WhatsApp · Book within
 * thumb reach — the highest-value mobile decision on the site (spec §4).
 */
export function MobileActionBar() {
  const items = [
    { href: business.phoneHref, label: "Call", external: true },
    { href: `https://wa.me/${business.whatsappNumber}`, label: "WhatsApp", external: true },
    { href: "/book", label: "Book", external: false },
  ];

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-hairline bg-surface/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {items.map((item) =>
        item.external ? (
          <a
            key={item.label}
            href={item.href}
            className="flex min-h-14 items-center justify-center text-sm font-medium"
          >
            {item.label}
          </a>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className="flex min-h-14 items-center justify-center text-sm font-semibold text-accent"
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}
