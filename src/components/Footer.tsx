import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SiteLogo } from "@/components/SiteLogo";
import { X_HANDLE, X_PROFILE_URL } from "@/lib/brand";
import { PREMIUM_ROUTE, PREMIUM_TIER_NAME } from "@/lib/premium";

const exploreLinks = [
  { href: "/stats", label: "2025 Season Stats" },
  { href: "/roster", label: "Roster & Coaches" },
  { href: "/schedule", label: "Schedule" },
  { href: "/legend-land", label: "Legend Land" },
  { href: "/nfl-comps", label: "NFL Comp Machine" },
  { href: PREMIUM_ROUTE, label: PREMIUM_TIER_NAME },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-crimson-dark/30 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <SiteLogo variant="footer" />
            <h3 className="sr-only">Boomer Ball</h3>
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-cream/70">
              Fan-inspired Oklahoma Sooners football analytics. Not affiliated
              with or endorsed by the University of Oklahoma.
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-cream/50">
              <a
                href="https://boomerball.app"
                className="underline decoration-cream/30 underline-offset-2 transition hover:text-cream hover:decoration-cream"
              >
                boomerball.app
              </a>
              <span aria-hidden className="text-cream/25">
                ·
              </span>
              <a
                href={X_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-cream/30 underline-offset-2 transition hover:text-cream hover:decoration-cream"
              >
                @{X_HANDLE} on X
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/80">
              Data sources
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://soonersports.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cream/65 transition hover:text-cream"
                >
                  soonersports.com
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
              <li>
                <a
                  href="https://www.espn.com/college-football/team/_/id/201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cream/65 transition hover:text-cream"
                >
                  ESPN College Football
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/80">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/65 transition hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/10 pt-6 text-center text-xs leading-relaxed text-cream/45">
          <p>
            Statistics sourced from{" "}
            <a
              href="https://soonersports.com/sports/football/stats/2025"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-cream/25 underline-offset-2 hover:text-cream/70"
            >
              University of Oklahoma Athletics
            </a>
            . Player headshots via ESPN. Boomer Sooner!
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Boomer Ball. Fan project.</p>
        </div>
      </div>
    </footer>
  );
}
