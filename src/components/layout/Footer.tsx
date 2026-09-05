import Link from "next/link";
import { business, disclaimer } from "@/content/business";
import { devices } from "@/content/devices";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface-raised pb-24 md:pb-0">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold">{business.name}</p>
            <p className="mt-3 text-sm text-secondary">
              Independent Apple device repair in {business.locality}, {business.city}.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Repairs</p>
            <ul className="mt-3 space-y-2">
              {devices.map((d) => (
                <li key={d.slug}>
                  <Link href={`/${d.slug}`} className="link-underline text-sm text-secondary">
                    {d.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-secondary">
              <li>
                <a href={business.phoneHref} className="link-underline">
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="link-underline break-all">
                  {business.email}
                </a>
              </li>
              <li>{business.areaLine}</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Hours</p>
            <p className="mt-3 text-sm text-secondary">{business.hoursLine}</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="link-underline text-sm text-secondary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="link-underline text-sm text-secondary">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-hairline pt-6 text-xs leading-relaxed text-secondary">
          {disclaimer}
        </p>
        <p className="mt-3 text-xs text-secondary">
          © {new Date().getFullYear()} {business.legalName}. Established {business.established}.
        </p>
      </div>
    </footer>
  );
}
