import Link from "next/link";
import { HatGlasses, Lasso } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stats", label: "Stats" },
  { href: "/roster", label: "Roster" },
  { href: "/schedule", label: "Schedule" },
  { href: "/news", label: "News" },
  { href: "/advanced", label: "Advanced" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-crimson-dark bg-crimson shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream bg-crimson-dark">
            <Lasso className="h-5 w-5 text-cream" aria-hidden />
          </div>
          <div>
            <span className="block font-display text-xl font-bold tracking-tight text-cream">
              Boomer Ball
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-cream/70">
              Sooners Analytics
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-cream/90 transition hover:bg-crimson-dark hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/advanced"
          className="flex items-center gap-1.5 rounded-full border border-cream/40 bg-cream px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-crimson transition hover:bg-white"
        >
          <HatGlasses className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">Premium</span>
        </Link>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-crimson-dark/50 px-4 py-2 md:hidden"
        aria-label="Mobile"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-cream/90 hover:bg-crimson-dark"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
