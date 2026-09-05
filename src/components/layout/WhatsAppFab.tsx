import { business } from "@/content/business";
import { Icon } from "@/components/ui/Icon";

/**
 * Floating WhatsApp button, desktop only — mobile already pins WhatsApp
 * in the bottom action bar.
 */
export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${business.whatsappNumber}`}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform [@media(hover:hover)]:hover:scale-105 md:flex"
    >
      <Icon name="whatsapp" className="size-7" />
    </a>
  );
}
