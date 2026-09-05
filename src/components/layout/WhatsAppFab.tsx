import { business } from "@/content/business";
import { Icon } from "@/components/ui/Icon";
import { InstagramMark } from "@/components/ui/BrandIcons";

/**
 * Floating social actions, desktop only — mobile already pins WhatsApp in
 * the bottom action bar. Instagram stacks above WhatsApp.
 */
export function WhatsAppFab() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 md:flex">
      <a
        href={business.instagramUrl}
        target="_blank"
        rel="noopener"
        aria-label={`Follow us on Instagram (${business.instagramHandle})`}
        className="flex size-14 items-center justify-center rounded-full bg-surface shadow-lg shadow-black/20 transition-transform [@media(hover:hover)]:hover:scale-105"
      >
        <InstagramMark variant="badge" className="size-14 rounded-full" />
      </a>
      <a
        href={`https://wa.me/${business.whatsappNumber}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat with us on WhatsApp"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform [@media(hover:hover)]:hover:scale-105"
      >
        <Icon name="whatsapp" className="size-7" />
      </a>
    </div>
  );
}
