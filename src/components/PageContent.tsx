import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageContentProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export function PageContent({
  children,
  className,
  narrow = false,
}: PageContentProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 py-12 sm:px-6 sm:py-14",
        narrow ? "max-w-4xl" : "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
