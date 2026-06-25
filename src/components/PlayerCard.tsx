"use client";

import Image from "next/image";
import type { Player } from "@/data/types";
import { getPlayerHeadshotUrl } from "@/data/roster";
import { getCoachInitials } from "@/data/roster";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const headshot = getPlayerHeadshotUrl(player.espnId);

  return (
    <article className="overflow-hidden rounded-xl border-2 border-crimson/15 bg-white shadow-md transition hover:border-crimson/40 hover:shadow-lg">
      <div className="flex items-start gap-4 p-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border-2 border-crimson bg-cream">
          {headshot ? (
            <Image
              src={headshot}
              alt={`${player.name} headshot`}
              fill
              className="object-cover object-top"
              sizes="96px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-crimson text-2xl font-bold text-cream">
              {player.number}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-crimson">
              #{player.number}
            </span>
            <h3 className="font-display text-lg font-bold text-ink">{player.name}</h3>
          </div>
          <p className="text-sm font-medium text-crimson/80">
            {player.position} · {player.classYear}
          </p>
          <p className="mt-1 text-sm text-ink/70">
            {player.height} · {player.weight} lbs · {player.hometown}
          </p>
        </div>
      </div>
      <div className="border-t border-cream-dark bg-cream px-4 py-3">
        <p className="text-sm leading-relaxed text-ink/80">{player.bio}</p>
        {player.imageCredit && (
          <p className="mt-2 text-[10px] text-ink/50">
            Photo: {player.imageCredit}
          </p>
        )}
      </div>
    </article>
  );
}

interface CoachCardProps {
  coach: { id: string; name: string; title: string; bio: string; yearsAtOu: number };
}

export function CoachCard({ coach }: CoachCardProps) {
  const initials = getCoachInitials(coach.name);

  return (
    <article className="overflow-hidden rounded-xl border-2 border-crimson/15 bg-white shadow-md">
      <div className="flex items-start gap-4 p-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-crimson bg-crimson font-display text-xl font-bold text-cream">
          {initials}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-ink">{coach.name}</h3>
          <p className="text-sm font-medium text-crimson">{coach.title}</p>
          <p className="text-xs text-ink/60">Year {coach.yearsAtOu} at OU</p>
        </div>
      </div>
      <div className="border-t border-cream-dark bg-cream px-4 py-3">
        <p className="text-sm leading-relaxed text-ink/80">{coach.bio}</p>
      </div>
    </article>
  );
}
