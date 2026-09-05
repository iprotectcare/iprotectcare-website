import Link from "next/link";
import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { business } from "@/content/business";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {/* TODO: replace wordmark with the real logo asset when supplied */}
          {business.name}
        </Link>
        <NavDesktop />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <Button href="/book">Book Repair</Button>
          </div>
          <NavMobile />
        </div>
      </div>
    </header>
  );
}
