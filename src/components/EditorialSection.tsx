import type { ReactNode } from "react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { WesternDivider } from "@/components/WesternDivider";
import { cn } from "@/lib/utils";

type EditorialSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
  delay?: number;
};

export function EditorialSection({
  title,
  description,
  children,
  className,
  divider = true,
  delay = 0,
}: EditorialSectionProps) {
  return (
    <MotionReveal delay={delay} className={cn("scroll-mt-24", className)}>
      <h2 className="font-display text-2xl font-bold tracking-tight text-crimson sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-[60ch] text-base leading-relaxed text-ink/70">
          {description}
        </p>
      )}
      {divider && <WesternDivider className="my-5" />}
      {children}
    </MotionReveal>
  );
}
