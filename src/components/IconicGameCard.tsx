import Image from "next/image";
import { MapPin, Palette, Trophy } from "lucide-react";
import type { IconicGame } from "@/data/legends-types";
import {
  getIconicGameImageUrl,
  ICONIC_GAME_IMAGE_CREDIT,
} from "@/data/iconic-games";

export function IconicGameCard({ game }: { game: IconicGame }) {
  const isWin = game.result === "W";
  const imageUrl = getIconicGameImageUrl(game);

  return (
    <article className="overflow-hidden rounded-2xl border-2 border-crimson/20 bg-white shadow-lg transition hover:border-crimson/45 hover:shadow-xl">
      <div className="relative h-48 w-full bg-crimson-dark sm:h-56">
        <Image
          src={imageUrl}
          alt={`Illustrated moment from ${game.title}`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-crimson-dark/90 via-crimson/30 to-transparent" />
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-cream/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-crimson shadow">
          <Palette className="h-2.5 w-2.5" aria-hidden />
          Illustrated
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-cream">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/75">
            {game.era}
          </p>
          <h3 className="font-display text-xl font-bold sm:text-2xl">{game.title}</h3>
          {game.nickname && (
            <p className="text-sm text-cream/85">{game.nickname}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-dark bg-cream/50 px-4 py-3">
        <div
          className={`rounded-lg px-4 py-2 text-center ${
            isWin ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <span
            className={`block font-display text-xl font-bold sm:text-2xl ${
              isWin ? "text-green-800" : "text-red-800"
            }`}
          >
            {game.result} — {game.score}
          </span>
        </div>
        <div className="text-right text-sm">
          <p className="font-semibold text-ink">{game.date}</p>
          <p className="text-ink/70">vs {game.opponent}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-cream-dark sm:grid-cols-4">
        {game.stats.map((stat) => (
          <div key={stat.label} className="bg-white px-3 py-3 text-center">
            <p className="font-display text-lg font-bold text-crimson">{stat.value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/55">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="px-4 py-4">
        <p className="flex items-start gap-1.5 text-xs text-ink/55">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-crimson" aria-hidden />
          {game.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink/80">{game.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-crimson/10 px-2 py-0.5 text-[10px] font-semibold text-crimson"
            >
              <Trophy className="h-2.5 w-2.5" aria-hidden />
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1 text-[10px] text-ink/45">
          <Palette className="h-3 w-3" aria-hidden />
          {game.imageCredit ?? ICONIC_GAME_IMAGE_CREDIT}
        </p>
      </div>
    </article>
  );
}
