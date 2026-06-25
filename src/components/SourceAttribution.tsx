import { ExternalLink } from "lucide-react";

interface SourceAttributionProps {
  sources: { label: string; url: string }[];
  className?: string;
}

export function SourceAttribution({ sources, className = "" }: SourceAttributionProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 rounded-lg border border-crimson/20 bg-cream-dark px-4 py-3 text-sm text-crimson/80 ${className}`}
    >
      <span className="font-semibold text-crimson">Sources:</span>
      {sources.map((s, i) => (
        <span key={s.url} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-crimson/40">·</span>}
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-crimson/30 hover:decoration-crimson"
          >
            {s.label}
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        </span>
      ))}
    </div>
  );
}
