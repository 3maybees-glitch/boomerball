import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { WeeklyRecap } from "@/data/types";
import { formatRecapMatchup } from "@/lib/mmqb";
import { formatDate } from "@/lib/utils";
import { MotionReveal } from "@/components/motion/MotionReveal";

const resultStyles: Record<"W" | "L", string> = {
  W: "bg-green-100/90 text-green-800",
  L: "bg-red-100/90 text-red-800",
};

type MmqbRecapCardProps = {
  recap: WeeklyRecap;
  index?: number;
  featured?: boolean;
};

export function MmqbRecapCard({ recap, index = 0, featured = false }: MmqbRecapCardProps) {
  return (
    <MotionReveal delay={index * 0.04}>
      <article
        className={`group border-l-2 border-crimson/25 bg-white/85 transition hover:border-crimson hover:bg-white ${
          featured ? "py-6 pl-6 pr-5 sm:pl-8" : "py-5 pl-5 pr-4 sm:pl-6"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${resultStyles[recap.result]}`}
          >
            {recap.result} {recap.score}
          </span>
          <span className="rounded-md bg-crimson/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-crimson">
            Week {recap.week} · {recap.season}
          </span>
          {recap.isArchive && (
            <span className="rounded-md bg-amber-100/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-900">
              Archive
            </span>
          )}
          <time className="text-xs font-medium uppercase tracking-wide text-ink/50">
            {formatDate(recap.publishedDate)}
          </time>
        </div>

        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
          {formatRecapMatchup(recap)}
        </p>

        <h3
          className={`mt-1 font-display font-bold leading-snug text-ink group-hover:text-crimson ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          <Link
            href={`/mmqb/${recap.slug}`}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
          >
            {recap.headline}
          </Link>
        </h3>

        <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-ink/75">
          {recap.lede}
        </p>

        <Link
          href={`/mmqb/${recap.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson underline decoration-crimson/25 underline-offset-2 hover:decoration-crimson"
        >
          Read the full recap
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </article>
    </MotionReveal>
  );
}
