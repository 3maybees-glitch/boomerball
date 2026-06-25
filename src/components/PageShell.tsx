import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PageTheme =
  | "home"
  | "roster"
  | "schedule"
  | "stats"
  | "news"
  | "advanced"
  | "legends";

interface PageShellProps {
  theme: PageTheme;
  children: ReactNode;
  className?: string;
}

export function PageShell({ theme, children, className }: PageShellProps) {
  return (
    <div className={cn("page-shell", `page-shell--${theme}`, className)}>
      <div className="page-shell__watermark" aria-hidden />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
