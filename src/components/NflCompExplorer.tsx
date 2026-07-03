"use client";

import { useMemo, useState } from "react";
import { ClipboardEdit, Users } from "lucide-react";
import type { Player } from "@/data/types";
import type { PositionGroup } from "@/data/nfl-comparables";
import {
  buildProspectFromPlayer,
  findComps,
  formatHeight,
  type CollegeProspect,
} from "@/lib/nfl-similarity";
import { NflCompResults } from "@/components/NflCompResults";

const POSITION_GROUPS: { value: PositionGroup; label: string }[] = [
  { value: "QB", label: "QB" },
  { value: "RB", label: "RB" },
  { value: "WR", label: "WR" },
  { value: "TE", label: "TE" },
  { value: "OL", label: "OL" },
  { value: "DL", label: "DL" },
  { value: "LB", label: "LB" },
  { value: "DB", label: "DB" },
  { value: "ST", label: "Specialists" },
];

function ProspectProfileCard({ prospect }: { prospect: CollegeProspect }) {
  const m = prospect.measurables;
  const cells = [
    { label: "Height", value: formatHeight(m.heightIn) },
    { label: "Weight", value: `${Math.round(m.weightLb)} lbs` },
    { label: "40-yard", value: `${m.fortyYd.toFixed(2)}s` },
    { label: "Bench", value: `${Math.round(m.benchReps)} reps` },
    { label: "Vertical", value: `${m.verticalIn}\u2033` },
    { label: "Broad", value: formatHeight(m.broadIn) },
    { label: "3-cone", value: `${m.threeCone.toFixed(2)}s` },
    { label: "Talent", value: `${Math.round(m.talent)}/100` },
  ];

  return (
    <div className="rounded-2xl border border-crimson/12 bg-white/95 p-5 shadow-[0_4px_20px_rgba(26,10,10,0.06)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-bold text-ink">
          {prospect.name}{" "}
          <span className="text-base font-semibold text-crimson">
            {prospect.position}
          </span>
        </h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
            prospect.curated
              ? "bg-crimson/10 text-crimson"
              : "bg-cream-dark text-ink/60"
          }`}
        >
          {prospect.curated ? "Curated scouting estimate" : "Derived estimate"}
        </span>
      </div>
      {prospect.scoutingNote && (
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{prospect.scoutingNote}</p>
      )}
      <dl className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-8">
        {cells.map((cell) => (
          <div key={cell.label} className="text-center">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-ink/50">
              {cell.label}
            </dt>
            <dd className="mt-0.5 font-display text-sm font-bold tabular-nums text-ink sm:text-base">
              {cell.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function RosterTab({ roster }: { roster: Player[] }) {
  const [group, setGroup] = useState<PositionGroup>("QB");
  const [playerId, setPlayerId] = useState<string>("john-mateer-10");

  const groupPlayers = useMemo(
    () =>
      roster
        .filter((p) => p.positionGroup === group)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [roster, group],
  );

  const selectedPlayer =
    groupPlayers.find((p) => p.id === playerId) ?? groupPlayers[0];

  const { prospect, matches } = useMemo(() => {
    if (!selectedPlayer) return { prospect: null, matches: [] };
    const built = buildProspectFromPlayer(selectedPlayer);
    return { prospect: built, matches: findComps(built) };
  }, [selectedPlayer]);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Position group">
        {POSITION_GROUPS.map((pg) => (
          <button
            key={pg.value}
            onClick={() => {
              setGroup(pg.value);
              setPlayerId("");
            }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
              group === pg.value
                ? "bg-crimson text-cream shadow-[0_4px_14px_rgba(132,22,23,0.3)]"
                : "bg-white/80 text-ink/65 hover:bg-crimson/10 hover:text-crimson"
            }`}
          >
            {pg.label}
          </button>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">
          Select a Sooner
        </span>
        <select
          value={selectedPlayer?.id ?? ""}
          onChange={(e) => setPlayerId(e.target.value)}
          className="mt-1.5 w-full max-w-md rounded-xl border border-crimson/20 bg-white px-3.5 py-2.5 text-sm font-medium text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20"
        >
          {groupPlayers.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.number} {p.name} — {p.position}, {p.height}, {p.weight} lbs ({p.classYear})
            </option>
          ))}
        </select>
      </label>

      {prospect && (
        <div className="mt-5 space-y-4">
          <ProspectProfileCard prospect={prospect} />
          <NflCompResults prospect={prospect} matches={matches} />
        </div>
      )}
    </div>
  );
}

interface CustomForm {
  name: string;
  positionGroup: PositionGroup;
  heightFt: number;
  heightIn: number;
  weightLb: number;
  fortyYd: number;
  benchReps: number;
  verticalIn: number;
  broadIn: number;
  threeCone: number;
  talent: number;
}

const TALENT_LABELS: [number, string][] = [
  [88, "Future first-rounder"],
  [82, "Day 2 draft pick"],
  [76, "Late-round / priority free agent"],
  [70, "All-conference college player"],
  [64, "Solid college starter"],
  [0, "Depth / developmental"],
];

function talentLabel(talent: number): string {
  return TALENT_LABELS.find(([min]) => talent >= min)?.[1] ?? "Developmental";
}

const DEFAULT_FORM: CustomForm = {
  name: "",
  positionGroup: "QB",
  heightFt: 6,
  heightIn: 1,
  weightLb: 210,
  fortyYd: 4.65,
  benchReps: 16,
  verticalIn: 33,
  broadIn: 118,
  threeCone: 7.05,
  talent: 78,
};

function NumberField({
  label,
  hint,
  value,
  step,
  min,
  max,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  step: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">
        {label}
        {hint && <span className="ml-1 normal-case tracking-normal text-ink/40">({hint})</span>}
      </span>
      <input
        type="number"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full rounded-xl border border-crimson/20 bg-white px-3.5 py-2.5 text-sm font-medium tabular-nums text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20"
      />
    </label>
  );
}

function CustomTab() {
  const [form, setForm] = useState<CustomForm>(DEFAULT_FORM);
  const [submitted, setSubmitted] = useState<CollegeProspect | null>(null);

  const set = <K extends keyof CustomForm>(key: K, value: CustomForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const matches = useMemo(
    () => (submitted ? findComps(submitted) : []),
    [submitted],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted({
      name: form.name.trim() || "Custom prospect",
      position: form.positionGroup,
      positionGroup: form.positionGroup,
      curated: true,
      measurables: {
        heightIn: form.heightFt * 12 + form.heightIn,
        weightLb: form.weightLb,
        fortyYd: form.fortyYd,
        benchReps: form.benchReps,
        verticalIn: form.verticalIn,
        broadIn: form.broadIn,
        threeCone: form.threeCone,
        talent: form.talent,
      },
    });
  }

  return (
    <div>
      <p className="max-w-[60ch] text-sm leading-relaxed text-ink/70">
        Scout any college player in the country. Enter their bio, combine-style
        testing numbers, and your talent estimate — the engine finds their
        closest NFL matches at the position.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 rounded-2xl border border-crimson/12 bg-white/95 p-5 shadow-[0_4px_20px_rgba(26,10,10,0.06)] sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block sm:col-span-2 lg:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">
              Player name
            </span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Arch Manning"
              className="mt-1.5 w-full rounded-xl border border-crimson/20 bg-white px-3.5 py-2.5 text-sm font-medium text-ink shadow-sm placeholder:text-ink/35 focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">
              Position group
            </span>
            <select
              value={form.positionGroup}
              onChange={(e) => set("positionGroup", e.target.value as PositionGroup)}
              className="mt-1.5 w-full rounded-xl border border-crimson/20 bg-white px-3.5 py-2.5 text-sm font-medium text-ink shadow-sm focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20"
            >
              {POSITION_GROUPS.map((pg) => (
                <option key={pg.value} value={pg.value}>
                  {pg.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Height (ft)" value={form.heightFt} step={1} min={5} max={7} onChange={(v) => set("heightFt", v)} />
            <NumberField label="Height (in)" value={form.heightIn} step={1} min={0} max={11} onChange={(v) => set("heightIn", v)} />
          </div>

          <NumberField label="Weight" hint="lbs" value={form.weightLb} step={1} min={150} max={400} onChange={(v) => set("weightLb", v)} />
          <NumberField label="40-yard dash" hint="seconds" value={form.fortyYd} step={0.01} min={4.2} max={6.0} onChange={(v) => set("fortyYd", v)} />
          <NumberField label="Bench press" hint="225 lb reps" value={form.benchReps} step={1} min={0} max={45} onChange={(v) => set("benchReps", v)} />
          <NumberField label="Vertical jump" hint="inches" value={form.verticalIn} step={0.5} min={18} max={46} onChange={(v) => set("verticalIn", v)} />
          <NumberField label="Broad jump" hint="inches" value={form.broadIn} step={1} min={80} max={148} onChange={(v) => set("broadIn", v)} />
          <NumberField label="3-cone drill" hint="seconds" value={form.threeCone} step={0.01} min={6.3} max={8.6} onChange={(v) => set("threeCone", v)} />
        </div>

        <label className="mt-5 block">
          <span className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-wide text-ink/60">
            Estimated talent level
            <span className="font-display text-base font-bold normal-case tracking-normal text-crimson">
              {form.talent}/100 · {talentLabel(form.talent)}
            </span>
          </span>
          <input
            type="range"
            min={55}
            max={95}
            step={1}
            value={form.talent}
            onChange={(e) => set("talent", Number(e.target.value))}
            className="mt-2 w-full accent-crimson"
          />
          <span className="mt-1 flex justify-between text-[10px] text-ink/40">
            <span>55 — depth piece</span>
            <span>75 — draftable</span>
            <span>95 — generational</span>
          </span>
        </label>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-crimson px-6 py-3 font-bold text-cream transition hover:bg-crimson-dark active:scale-[0.99] sm:w-auto sm:px-10"
        >
          Find NFL comps
        </button>
      </form>

      {submitted && (
        <div className="mt-5 space-y-4">
          <ProspectProfileCard prospect={submitted} />
          <NflCompResults prospect={submitted} matches={matches} />
        </div>
      )}
    </div>
  );
}

export function NflCompExplorer({ roster }: { roster: Player[] }) {
  const [tab, setTab] = useState<"roster" | "custom">("roster");

  return (
    <div>
      <div
        className="inline-flex rounded-full border border-crimson/15 bg-white/80 p-1 shadow-sm"
        role="tablist"
        aria-label="Comp generator mode"
      >
        <button
          role="tab"
          aria-selected={tab === "roster"}
          onClick={() => setTab("roster")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
            tab === "roster" ? "bg-crimson text-cream" : "text-ink/65 hover:text-crimson"
          }`}
        >
          <Users className="h-4 w-4" aria-hidden />
          2026 Sooners roster
        </button>
        <button
          role="tab"
          aria-selected={tab === "custom"}
          onClick={() => setTab("custom")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
            tab === "custom" ? "bg-crimson text-cream" : "text-ink/65 hover:text-crimson"
          }`}
        >
          <ClipboardEdit className="h-4 w-4" aria-hidden />
          Any college player
        </button>
      </div>

      <div className="mt-6">
        {tab === "roster" ? <RosterTab roster={roster} /> : <CustomTab />}
      </div>
    </div>
  );
}
