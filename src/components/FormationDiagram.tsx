import type { FormationPlayer } from "@/data/schemes";

interface FormationDiagramProps {
  players: FormationPlayer[];
  side: "offense" | "defense";
  className?: string;
}

export function FormationDiagram({
  players,
  side,
  className = "",
}: FormationDiagramProps) {
  const isOffense = side === "offense";

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-crimson/20 bg-gradient-to-b from-green-900/15 to-green-900/5 ${className}`}
    >
      {/* Field markings */}
      <svg
        viewBox="0 0 100 80"
        className="h-full w-full"
        aria-hidden
      >
        <rect x="0" y="0" width="100" height="80" fill="transparent" />
        <line
          x1="0"
          y1="40"
          x2="100"
          y2="40"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-crimson/20"
          strokeDasharray="2 2"
        />
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="80"
          stroke="currentColor"
          strokeWidth="0.2"
          className="text-crimson/15"
        />
        {/* LOS for offense (below QB) / defense (above front) */}
        <line
          x1="5"
          y1={isOffense ? "52" : "48"}
          x2="95"
          y2={isOffense ? "52" : "48"}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-crimson/35"
        />
      </svg>

      {/* Player markers */}
      <div className="absolute inset-0">
        {players.map((p) => (
          <div
            key={p.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-bold shadow-sm sm:h-8 sm:w-8 sm:text-xs ${
                p.emphasis
                  ? "border-crimson bg-crimson text-cream"
                  : isOffense
                    ? "border-crimson/60 bg-white text-crimson"
                    : "border-ink/40 bg-cream-dark text-ink"
              }`}
            >
              {p.label.length <= 2 ? p.label : p.label.slice(0, 2)}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-1 left-2 text-[9px] font-semibold uppercase tracking-wider text-ink/40">
        {isOffense ? "Offense ↑" : "Defense ↓"}
      </div>
    </div>
  );
}
