import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-crimson bg-crimson-dark text-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-bold">Boomer Ball</h3>
            <p className="mt-2 text-sm text-cream/75">
              A fan-focused Oklahoma Sooners football analytics experience from{" "}
              <a
                href="https://maybeecreations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-cream/90 underline decoration-cream/30 hover:text-cream"
              >
                Maybee Creations
              </a>
              . Not affiliated with or endorsed by the University of Oklahoma.
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
                <Link href="/advanced" className="text-cream/75 hover:text-cream">
                  Advanced Stats (Premium)
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
              className="underline hover:text-cream/75"
            >
              University of Oklahoma Athletics
            </a>
            . Player headshots via ESPN. Boomer Sooner!
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Maybee Creations.{" "}
            <span className="text-cream/45">Boomer Ball</span> is a fan-focused
            sports analytics property published by{" "}
            <a
              href="https://maybeecreations.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cream/65 underline decoration-cream/30 hover:text-cream hover:decoration-cream"
            >
              Maybee Creations
            </a>
            . Not affiliated with or endorsed by the University of Oklahoma.
          </p>
        </div>
      </div>
    </footer>
  );
}
