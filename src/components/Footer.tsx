import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PREMIUM_ROUTE, PREMIUM_TIER_NAME } from "@/lib/premium";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-crimson bg-crimson-dark text-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-bold">Boomer Ball</h3>
            <p className="mt-2 text-sm text-cream/75">
              A fan-inspired Oklahoma Sooners football analytics site. Not affiliated
              with or endorsed by the University of Oklahoma.
            </p>
            <p className="mt-3 text-xs text-cream/60">
              Planned domain:{" "}
              <a
                href="https://boomerball.app"
                className="underline hover:text-cream"
              >
                boomerball.app
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cream/90">
              Data Sources
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="https://soonersports.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cream/75 hover:text-cream"
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
                  className="inline-flex items-center gap-1 text-cream/75 hover:text-cream"
                >
                  ESPN College Football
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cream/90">
              Explore
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/stats" className="text-cream/75 hover:text-cream">
                  2025 Season Stats
                </Link>
              </li>
              <li>
                <Link href="/roster" className="text-cream/75 hover:text-cream">
                  Roster & Coaches
                </Link>
              </li>
              <li>
                <Link href="/legend-land" className="text-cream/75 hover:text-cream">
                  Legend Land
                </Link>
              </li>
              <li>
                <Link href={PREMIUM_ROUTE} className="text-cream/75 hover:text-cream">
                  {PREMIUM_TIER_NAME}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-cream/20 pt-6 text-center text-xs text-cream/50">
          <p>
            Statistics sourced from{" "}
            <a
              href="https://soonersports.com/sports/football/stats/2025"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
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
