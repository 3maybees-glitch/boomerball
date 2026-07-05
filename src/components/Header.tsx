import Link from "next/link";
import { HatGlasses } from "lucide-react";
import { SiteLogo } from "@/components/SiteLogo";
import { NavLinks } from "@/components/NavLinks";
import { PREMIUM_RECRUIT_ROUTE, PREMIUM_ROUTE } from "@/lib/premium";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stats", label: "Stats" },
  { href: "/roster", label: "Roster" },
  { href: "/schedule", label: "Schedule" },
  { href: "/mmqb", label: "MMQB" },
  { href: "/legend-land", label: "Legend Land" },
  { href: "/news", label: "News" },
  { href: "/nfl-comps", label: "NFL Comps" },
  { href: "/gameulator", label: "Game-u-lator" },
  { href: PREMIUM_ROUTE, label: "Locker Room" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-crimson-dark/60 bg-crimson/95 shadow-[0_4px_24px_rgba(92,15,16,0.25)] backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          <SiteLogo variant="header" />
          <span className="hidden truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/65 lg:block">
            Sooners Analytics
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          <NavLinks links={navLinks} />
        </nav>

        <Link
          href={PREMIUM_RECRUIT_ROUTE}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-cream/30 bg-cream px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-crimson shadow-[0_4px_16px_rgba(253,249,216,0.2)] transition hover:bg-white active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          <HatGlasses className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">Join The Team</span>
          <span className="sm:hidden">Join</span>
        </Link>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-crimson-dark/40 px-4 py-2 lg:hidden"
        aria-label="Mobile"
      >
        <NavLinks links={navLinks} variant="mobile" />
      </nav>
    </header>
  );
}
