import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Owner-supplied brand banner (public/images/banner.png). Shown full-width
 * under the hero; framed so its light artwork reads as intentional on the
 * dark theme too.
 */
export function BrandBanner() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-hairline">
          <Image
            src="/images/banner.png"
            alt="iProtectCare — Smart Repair. Honest Care. Repair, quality and trust."
            width={1672}
            height={941}
            sizes="(min-width: 1200px) 1136px, 100vw"
            className="w-full"
          />
        </div>
      </Reveal>
    </div>
  );
}
