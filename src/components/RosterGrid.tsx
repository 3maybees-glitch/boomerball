"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import type { Player } from "@/data/types";
import { getPlayerHeadshotUrl } from "@/data/roster";

interface RosterGridProps {
  players: Player[];
}

const GROUP_LABELS: Record<string, string> = {
  QB: "Quarterbacks",
  RB: "Running Backs",
  WR: "Wide Receivers",
  TE: "Tight Ends",
  OL: "Offensive Line",
  DL: "Defensive Line",
  LB: "Linebackers",
  DB: "Defensive Backs",
  ST: "Special Teams",
};

const GROUP_ORDER = ["QB", "RB", "WR", "TE", "OL", "DL", "LB", "DB", "ST"];

export function RosterGrid({ players }: RosterGridProps) {
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState<string>("ALL");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return players.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q) ||
        String(p.number).includes(q) ||
        p.hometown.toLowerCase().includes(q);
      const matchesGroup =
        groupFilter === "ALL" || p.positionGroup === groupFilter;
      return matchesQuery && matchesGroup;
    });
  }, [players, query, groupFilter]);

  const grouped = useMemo(() => {
    if (groupFilter !== "ALL" || query) {
      return [{ group: "Results", players: filtered }];
    }
    return GROUP_ORDER.map((group) => ({
      group,
      players: filtered.filter((p) => p.positionGroup === group),
    })).filter((g) => g.players.length > 0);
  }, [filtered, groupFilter, query]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search by name, number, position, hometown…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border-2 border-crimson/20 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-crimson focus:outline-none"
            aria-label="Search roster"
          />
        </div>
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="rounded-lg border-2 border-crimson/20 bg-white px-3 py-2.5 text-sm focus:border-crimson focus:outline-none"
          aria-label="Filter by position group"
        >
          <option value="ALL">All Positions</option>
          {GROUP_ORDER.map((g) => (
            <option key={g} value={g}>
              {GROUP_LABELS[g]}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4 text-sm text-ink/60">
        Showing {filtered.length} of {players.length} players
      </p>

      {grouped.map(({ group, players: groupPlayers }) => (
        <section key={group} className="mb-10">
          <h3 className="mb-3 font-display text-lg font-bold text-crimson">
            {GROUP_LABELS[group] ?? group}{" "}
            <span className="text-sm font-normal text-ink/50">
              ({groupPlayers.length})
            </span>
          </h3>
          <div className="overflow-hidden rounded-xl border-2 border-crimson/15 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-cream-dark bg-cream text-left text-xs font-semibold uppercase tracking-wide text-crimson">
                    <th className="px-3 py-2.5">#</th>
                    <th className="px-3 py-2.5">Player</th>
                    <th className="px-3 py-2.5">Pos</th>
                    <th className="px-3 py-2.5">Class</th>
                    <th className="px-3 py-2.5">Ht/Wt</th>
                    <th className="hidden px-3 py-2.5 md:table-cell">Hometown</th>
                  </tr>
                </thead>
                <tbody>
                  {groupPlayers.map((player) => (
                    <RosterRow key={player.id} player={player} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <p className="py-12 text-center text-ink/60">No players match your search.</p>
      )}
    </div>
  );
}

function RosterRow({ player }: { player: Player }) {
  const [expanded, setExpanded] = useState(false);
  const headshot = getPlayerHeadshotUrl(player.espnId);

  return (
    <>
      <tr
        className="cursor-pointer border-b border-cream-dark/80 hover:bg-cream/60"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-3 py-2.5 font-bold text-crimson">{player.number}</td>
        <td className="px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-crimson/20 bg-cream">
              {headshot ? (
                <Image
                  src={headshot}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="32px"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-crimson">
                  {player.number}
                </span>
              )}
            </div>
            <span className="font-medium text-ink">{player.name}</span>
          </div>
        </td>
        <td className="px-3 py-2.5 text-ink/80">{player.position}</td>
        <td className="px-3 py-2.5 text-ink/70">{player.classYear}</td>
        <td className="px-3 py-2.5 text-ink/70">
          {player.height} / {player.weight}
        </td>
        <td className="hidden px-3 py-2.5 text-ink/70 md:table-cell">
          {player.hometown}
        </td>
      </tr>
      {expanded && (
        <tr className="bg-cream/40">
          <td colSpan={6} className="px-4 py-3 text-sm text-ink/75">
            {player.bio}
            {player.imageCredit && (
              <span className="mt-1 block text-[10px] text-ink/50">
                Photo: {player.imageCredit}
              </span>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
