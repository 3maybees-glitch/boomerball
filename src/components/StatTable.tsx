interface StatTableProps {
  title: string;
  columns: { key: string; label: string; align?: "left" | "right" }[];
  rows: Record<string, string | number>[];
}

export function StatTable({ title, columns, rows }: StatTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-crimson/12 bg-white/95 shadow-[0_8px_32px_rgba(26,10,10,0.08)]">
      <div className="border-b border-crimson/10 bg-crimson px-5 py-3.5">
        <h3 className="font-display text-lg font-bold tracking-tight text-cream">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-cream-dark bg-cream">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-2.5 font-semibold text-crimson ${
                    col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-cream-dark/80 even:bg-cream/50 hover:bg-cream"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-3 py-2.5 text-ink/90 ${
                      col.align === "right" ? "text-right tabular-nums" : "text-left"
                    }`}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface TeamStatGridProps {
  stats: { label: string; value: string | number; sub?: string }[];
}

export function TeamStatGrid({ stats }: TeamStatGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`rounded-xl px-4 py-4 text-center ${
            index === 0
              ? "col-span-2 bg-crimson text-cream shadow-[0_8px_24px_rgba(132,22,23,0.22)] sm:col-span-2 lg:col-span-2"
              : "border border-crimson/10 bg-white/90 shadow-[0_4px_16px_rgba(26,10,10,0.06)]"
          }`}
        >
          <p
            className={`font-display text-2xl font-bold tabular-nums sm:text-3xl ${
              index === 0 ? "text-cream" : "text-crimson"
            }`}
          >
            {stat.value}
          </p>
          <p
            className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-xs ${
              index === 0 ? "text-cream/80" : "text-ink/60"
            }`}
          >
            {stat.label}
          </p>
          {stat.sub && (
            <p
              className={`mt-0.5 text-[10px] ${
                index === 0 ? "text-cream/65" : "text-ink/45"
              }`}
            >
              {stat.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
