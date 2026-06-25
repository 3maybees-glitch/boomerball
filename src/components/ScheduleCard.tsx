import type { ScheduleGame } from "@/data/types";
import { formatDate } from "@/lib/utils";
import { MapPin, Home, Plane } from "lucide-react";

interface ScheduleCardProps {
  game: ScheduleGame;
}

export function ScheduleCard({ game }: ScheduleCardProps) {
  const isWin = game.result === "W";
  const isLoss = game.result === "L";

  return (
    <article
      className={`rounded-xl border-2 bg-white p-4 shadow-sm ${
        isWin
          ? "border-green-300/60"
          : isLoss
            ? "border-red-300/60"
            : "border-crimson/15"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <time className="text-sm font-medium text-ink/60">
            {formatDate(game.date)} · {game.time}
          </time>
          <h3 className="mt-1 font-display text-xl font-bold text-ink">
            {game.isNeutral ? "vs" : game.isHome ? "vs" : "at"} {game.opponent}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-ink/70">
            {game.isNeutral ? (
              <MapPin className="h-3.5 w-3.5 text-crimson" aria-hidden />
            ) : game.isHome ? (
              <Home className="h-3.5 w-3.5 text-crimson" aria-hidden />
            ) : (
              <Plane className="h-3.5 w-3.5 text-crimson" aria-hidden />
            )}
            {game.location}
          </p>
        </div>

        {game.result && game.score && (
          <div
            className={`rounded-lg px-4 py-2 text-center ${
              isWin ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <span
              className={`block text-2xl font-bold ${
                isWin ? "text-green-800" : "text-red-800"
              }`}
            >
              {game.result} {game.score}
            </span>
            {game.record && (
              <span className="text-xs text-ink/60">{game.record}</span>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {game.conference && (
          <span className="rounded-full bg-crimson/10 px-2 py-0.5 font-medium text-crimson">
            SEC
          </span>
        )}
        {game.isNeutral && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-800">
            Neutral Site
          </span>
        )}
        {game.attendance && (
          <span className="rounded-full bg-cream-dark px-2 py-0.5 text-ink/70">
            Attendance: {game.attendance.toLocaleString()}
          </span>
        )}
      </div>
    </article>
  );
}
