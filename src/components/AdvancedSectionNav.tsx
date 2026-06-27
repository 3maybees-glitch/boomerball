"use client";

import {
  Award,
  BarChart3,
  BookOpen,
  GraduationCap,
  LayoutGrid,
} from "lucide-react";

export const ADVANCED_SECTIONS = [
  { id: "stats-guide", label: "Stats Guide", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "preseason-grades", label: "Grades", icon: Award },
  { id: "formations", label: "Formations", icon: LayoutGrid },
  { id: "recruiting", label: "Recruiting", icon: GraduationCap },
] as const;

/** Header (~64px) + sticky sub-nav (~52px) */
const SCROLL_OFFSET = 120;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export function AdvancedSectionNav() {
  return (
    <nav
      aria-label="Advanced page sections"
      className="sticky top-[3.6rem] z-40 -mx-4 mb-8 border-b border-crimson/15 bg-cream/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6"
    >
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">
        Jump to section
      </p>
      <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ADVANCED_SECTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-crimson/20 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink transition hover:border-crimson hover:bg-crimson hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
          >
            <Icon className="h-3.5 w-3.5 opacity-80" aria-hidden />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
