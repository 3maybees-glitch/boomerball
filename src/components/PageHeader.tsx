import Image from "next/image";
import type { ReactNode } from "react";
import type { PageTheme } from "@/components/PageShell";
import { cn } from "@/lib/utils";

const themeBackgrounds: Partial<Record<PageTheme, { src: string; position?: string }>> = {
  stats: { src: "/backgrounds/stadium-aerial.webp", position: "center 40%" },
  roster: { src: "/backgrounds/schooner.webp", position: "center 60%" },
  schedule: { src: "/backgrounds/stadium-inside.webp", position: "center 45%" },
  news: { src: "/backgrounds/campus.webp", position: "center 40%" },
  legends: { src: "/backgrounds/schooner-ponies.webp", position: "center 55%" },
  advanced: { src: "/backgrounds/stadium.webp", position: "center 35%" },
};

type PageHeaderProps = {
  title: string;
  description?: string;
  theme?: PageTheme;
  children?: ReactNode;
  className?: string;
  compact?: boolean;
};

export function PageHeader({
  title,
  description,
  theme,
  children,
  className,
  compact = false,
}: PageHeaderProps) {
  const bg = theme ? themeBackgrounds[theme] : undefined;

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-crimson-dark/30 bg-ink",
        compact ? "py-10 sm:py-12" : "py-12 sm:py-16",
        className,
      )}
    >
      {bg && (
        <div className="absolute inset-0">
          <Image
            src={bg.src}
            alt=""
            fill
            priority
            unoptimized
            className="object-cover opacity-40"
            style={{ objectPosition: bg.position }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/75" />
        </div>
      )}
      {!bg && (
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-dark via-ink to-ink" />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="max-w-3xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-cream sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-cream/80 sm:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
