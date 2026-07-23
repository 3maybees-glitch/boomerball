import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LegalDocumentProps = {
  children: ReactNode;
  className?: string;
};

export function LegalDocument({ children, className }: LegalDocumentProps) {
  return (
    <article
      className={cn(
        "legal-document rounded-2xl border border-crimson/12 bg-white/95 p-6 shadow-[0_4px_20px_rgba(26,10,10,0.06)] sm:p-8",
        className,
      )}
    >
      {children}
    </article>
  );
}

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="legal-document__section">
      <h2 className="font-display text-xl font-bold text-crimson">{title}</h2>
      <div className="legal-document__body">{children}</div>
    </section>
  );
}
