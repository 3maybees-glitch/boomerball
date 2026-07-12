import { ExternalLink } from "lucide-react";

interface SourceAttributionProps {
  sources: { label: string; url?: string }[];
  className?: string;
}

export function SourceAttribution({ sources, className = "" }: SourceAttributionProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 rounded-xl border border-crimson/12 bg-cream/60 px-4 py-3.5 text-sm text-ink/75 shadow-[0_4px_16px_rgba(26,10,10,0.04)] ${className}`}
    >
      <span className="font-semibold text-crimson">Sources</span>
      {sources.map((s, i) => (
        <span key={s.url ?? s.label} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-crimson/30">·</span>}
          {s.url ? (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-crimson underline decoration-crimson/25 underline-offset-2 hover:decoration-crimson"
            >
              {s.label}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          ) : (
            <span className="font-medium text-crimson">{s.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
