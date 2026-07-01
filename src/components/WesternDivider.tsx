import { cn } from "@/lib/utils";

export function WesternDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-crimson/35 to-crimson/50" />
      <div className="h-1.5 w-1.5 rotate-45 bg-crimson/70" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-crimson/35 to-crimson/50" />
    </div>
  );
}
