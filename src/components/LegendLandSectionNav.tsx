const SECTIONS = [
  { id: "heisman", label: "Heisman" },
  { id: "icons", label: "Icons" },
  { id: "games", label: "Iconic games" },
  { id: "championships", label: "Championships" },
  { id: "maps", label: "Maps" },
] as const;

export function LegendLandSectionNav() {
  return (
    <nav
      aria-label="Legend Land sections"
      className="sticky top-[4.25rem] z-40 -mx-4 mb-10 border-b border-crimson/10 bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6"
    >
      <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="shrink-0 rounded-full border border-crimson/20 bg-white/90 px-4 py-2 text-sm font-semibold text-crimson transition hover:border-crimson/50 hover:bg-crimson hover:text-cream active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
