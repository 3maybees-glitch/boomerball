import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "success" | "neutral";

const variantStyles: Record<CalloutVariant, string> = {
  info: "border-blue-300/50 bg-blue-50/90 text-blue-950",
  warning: "border-amber-300/60 bg-amber-50/90 text-amber-950",
  success: "border-green-300/50 bg-green-50/90 text-green-950",
  neutral: "border-crimson/15 bg-white/90 text-ink/80",
};

type CalloutProps = {
  children: ReactNode;
  variant?: CalloutVariant;
  className?: string;
};

export function Callout({
  children,
  variant = "neutral",
  className,
}: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3.5 text-sm leading-relaxed shadow-[0_4px_16px_rgba(26,10,10,0.04)]",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
