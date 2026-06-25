import { Star } from "lucide-react";

export function WesternDivider() {
  return (
    <div className="flex items-center gap-4 py-4" aria-hidden>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-crimson/40 to-crimson/40" />
      <Star className="h-5 w-5 fill-crimson/20 text-crimson/60" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-crimson/40 to-crimson/40" />
    </div>
  );
}
