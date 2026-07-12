"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import type { Player } from "@/data/types";
import { getPlayerHeadshotUrl } from "@/data/roster";
import {
  cfb27OvrTone,
  formatRecruitStars,
  getSortableLastName,
  sortPlayersByLastName,
} from "@/lib/roster-utils";

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

const CFB27_ATTRS = [
  { key: "spd", label: "SPD", title: "Speed" },
  { key: "str", label: "STR", title: "Strength" },
  { key: "agi", label: "AGI", title: "Agility" },
  { key: "cod", label: "COD", title: "Change of Direction" },
  { key: "inj", label: "INJ", title: "Injury" },
  { key: "awr", label: "AWR", title: "Awareness" },
] as const;

type SortMode = "name" | "ovr";

export function RosterGrid({ players }: RosterGridProps) {
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState<string>("ALL");
  const [sortMode, setSortMode] = useState<SortMode>("name");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return players.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q) ||
        String(p.number).includes(q) ||
        (p.transferFrom?.toLowerCase().includes(q) ?? false) ||
        (p.cfb27?.position.toLowerCase().includes(q) ?? false);
      const matchesGroup =
        groupFilter === "ALL" || p.positionGroup === groupFilter;
      return matchesQuery && matchesGroup;
    });
  }, [players, query, groupFilter]);

  const sortedFiltered = useMemo(() => {
    if (sortMode === "ovr") {
      return [...filtered].sort((a, b) => {
        const ovrDiff = (b.cfb27?.ovr ?? -1) - (a.cfb27?.ovr ?? -1);
        if (ovrDiff !== 0) return ovrDiff;
        return getSortableLastName(a.name).localeCompare(getSortableLastName(b.name));
      });
    }
    return sortPlayersByLastName(filtered);
  }, [filtered, sortMode]);

  const grouped = useMemo(() => {
    if (groupFilter !== "ALL" || query || sortMode === "ovr") {
      return [
        {
          group: sortMode === "ovr" ? "By CFB 27 OVR" : "Results",
          players: sortedFiltered,
        },
      ];
    }
    return GROUP_ORDER.map((group) => ({
      group,
      players: sortPlayersByLastName(
        filtered.filter((p) => p.positionGroup === group),
      ),
    })).filter((g) => g.players.length > 0);
  }, [filtered, groupFilter, query, sortMode, sortedFiltered]);

  const ratedCount = useMemo(
    () => players.filter((p) => p.cfb27).length,
    [players],
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search by name, number, position, transfer school…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-crimson/15 bg-white/95 py-3 pl-11 pr-4 text-base shadow-[0_4px_16px_rgba(26,10,10,0.04)] transition focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20"
            aria-label="Search roster"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="rounded-xl border border-crimson/15 bg-white/95 px-3 py-3 text-base shadow-[0_4px_16px_rgba(26,10,10,0.04)] focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20"
            aria-label="Filter by position group"
          >
            <option value="ALL">All Positions</option>
            {GROUP_ORDER.map((g) => (
              <option key={g} value={g}>
                {GROUP_LABELS[g]}
              </option>
            ))}
          </select>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="rounded-xl border border-crimson/15 bg-white/95 px-3 py-3 text-base shadow-[0_4px_16px_rgba(26,10,10,0.04)] focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20"
            aria-label="Sort roster"
          >
            <option value="name">Sort A–Z</option>
            <option value="ovr">Sort by CFB 27 OVR</option>
          </select>
        </div>
      </div>

      <p className="mb-4 text-base text-ink/60">
        Showing {filtered.length} of {players.length} players · {ratedCount} with
        EA Sports CFB 27 ratings · tap a row for attributes
      </p>

      {grouped.map(({ group, players: groupPlayers }) => (
        <section key={group} className="mb-10">
          <h3 className="mb-3 font-display text-xl font-bold text-crimson">
            {GROUP_LABELS[group] ?? group}{" "}
            <span className="text-base font-normal text-ink/50">
              ({groupPlayers.length})
            </span>
          </h3>
          <div className="overflow-hidden rounded-2xl border border-crimson/12 bg-white/95 shadow-[0_8px_32px_rgba(26,10,10,0.08)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-base">
                <thead>
                  <tr className="border-b border-cream-dark bg-cream text-left text-sm font-semibold uppercase tracking-wide text-crimson">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Player</th>
                    <th className="px-4 py-3">Pos</th>
                    <th className="px-4 py-3">Class</th>
                    <th className="px-4 py-3">Ht/Wt</th>
                    <th className="px-4 py-3">Stars</th>
                    <th className="px-4 py-3" title="EA Sports College Football 27 Overall">
                      CFB 27
                    </th>
                    <th className="px-4 py-3">Transfer</th>
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
        <p className="py-12 text-center text-lg text-ink/60">
          No players match your search.
        </p>
      )}
    </div>
  );
}

function RosterRow({ player }: { player: Player }) {
  const [expanded, setExpanded] = useState(false);
  const headshot = getPlayerHeadshotUrl(player.espnId);
  const ratings = player.cfb27;

  return (
    <>
      <tr
        className="cursor-pointer border-b border-cream-dark/80 hover:bg-cream/60"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <td className="px-4 py-3.5 text-lg font-bold text-crimson">{player.number}</td>
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-crimson/20 bg-cream">
              {headshot ? (
                <Image
                  src={headshot}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="40px"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs font-bold text-crimson">
                  {player.number}
                </span>
              )}
            </div>
            <span className="text-lg font-medium text-ink">{player.name}</span>
          </div>
        </td>
        <td className="px-4 py-3.5 text-ink/80">{player.position}</td>
        <td className="px-4 py-3.5 text-ink/70">{player.classYear}</td>
        <td className="px-4 py-3.5 text-ink/70">
          {player.height} / {player.weight}
        </td>
        <td className="px-4 py-3.5">
          {player.recruitStars ? (
            <span
              className="text-base tracking-tight"
              title={`${player.recruitStars}-star recruit`}
              aria-label={`${player.recruitStars}-star recruit`}
            >
              {formatRecruitStars(player.recruitStars)}
            </span>
          ) : (
            <span className="text-ink/30">—</span>
          )}
        </td>
        <td className="px-4 py-3.5">
          {ratings ? (
            <span
              className={`inline-flex min-w-[2.5rem] items-center justify-center rounded-md px-2 py-1 text-sm font-bold tabular-nums ${cfb27OvrTone(ratings.ovr)}`}
              title={`CFB 27 overall ${ratings.ovr} (${ratings.position})`}
              aria-label={`College Football 27 overall rating ${ratings.ovr}`}
            >
              {ratings.ovr}
            </span>
          ) : (
            <span className="text-ink/30">—</span>
          )}
        </td>
        <td className="px-4 py-3.5">
          {player.transferFrom ? (
            <span className="inline-flex items-center gap-1.5 text-ink/80">
              <span
                className="rounded bg-crimson/10 px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-crimson"
                title="Transfer"
              >
                TR
              </span>
              <span>{player.transferFrom}</span>
            </span>
          ) : (
            <span className="text-ink/30">—</span>
          )}
        </td>
      </tr>
      {expanded && (
        <tr className="bg-cream/40">
          <td colSpan={8} className="px-5 py-4 text-base text-ink/75">
            {ratings && (
              <div className="mb-4">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-crimson">
                  EA Sports College Football 27 · {ratings.position} · OVR{" "}
                  {ratings.ovr}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {CFB27_ATTRS.map(({ key, label, title }) => (
                    <div
                      key={key}
                      className="rounded-lg border border-crimson/10 bg-white/80 px-3 py-2 text-center"
                      title={title}
                    >
                      <div className="text-xs font-semibold uppercase tracking-wide text-crimson/70">
                        {label}
                      </div>
                      <div className="mt-0.5 text-lg font-bold tabular-nums text-ink">
                        {ratings[key]}
                      </div>
                      <div
                        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cream-dark"
                        aria-hidden
                      >
                        <div
                          className="h-full rounded-full bg-crimson/70"
                          style={{ width: `${ratings[key]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {player.bio}
            {player.imageCredit && (
              <span className="mt-1 block text-xs text-ink/50">
                Photo: {player.imageCredit}
              </span>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
