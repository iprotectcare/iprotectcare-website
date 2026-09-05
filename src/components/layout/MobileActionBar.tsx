import Link from "next/link";
import { business } from "@/content/business";
import { Icon } from "@/components/ui/Icon";

/**
 * Persistent bottom bar on mobile pinning Call · WhatsApp · Book within
 * thumb reach — the highest-value mobile decision on the site (spec §4).
 */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-hairline bg-surface/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <a
        href={business.phoneHref}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium"
      >
        <Icon name="phone" className="size-5" />
        Call
      </a>
      <a
        href={`https://wa.me/${business.whatsappNumber}`}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium text-[#25D366]"
      >
        <Icon name="whatsapp" className="size-5" />
        WhatsApp
      </a>
      <Link
        href="/book"
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-accent"
      >
        <Icon name="calendar" className="size-5" />
        Book
      </Link>
    </nav>
  );
}
