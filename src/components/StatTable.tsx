interface StatTableProps {
  title: string;
  columns: { key: string; label: string; align?: "left" | "right" }[];
  rows: Record<string, string | number>[];
}

export function StatTable({ title, columns, rows }: StatTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-crimson/15 bg-white shadow-sm">
      <div className="border-b border-crimson/10 bg-crimson px-4 py-3">
        <h3 className="font-display text-lg font-bold text-cream">{title}</h3>
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
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border-2 border-crimson/15 bg-white px-3 py-2.5 text-center shadow-sm"
        >
          <p className="text-xl font-bold tabular-nums text-crimson sm:text-2xl">{stat.value}</p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink/70 sm:text-xs">
            {stat.label}
          </p>
          {stat.sub && <p className="mt-0.5 text-[10px] text-ink/50">{stat.sub}</p>}
        </div>
      ))}
    </div>
  );
}
