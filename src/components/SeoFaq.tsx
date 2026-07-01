import type { SeoFaqItem } from "@/data/seo-faq";

type SeoFaqProps = {
  items: SeoFaqItem[];
  heading?: string;
};

export function SeoFaq({
  items,
  heading = "Oklahoma Sooners Football — Quick Answers",
}: SeoFaqProps) {
  return (
    <section
      className="border-y border-crimson/10 bg-cream/35 py-12 sm:py-14"
      aria-labelledby="seo-faq-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2
          id="seo-faq-heading"
          className="font-display text-2xl font-bold tracking-tight text-crimson sm:text-3xl"
        >
          {heading}
        </h2>
        <p className="mt-2 max-w-[50ch] text-base text-ink/70">
          Direct answers about Boomer Ball and the Oklahoma Sooners, sourced and
          citable.
        </p>
        <dl className="mt-8 divide-y divide-crimson/8 rounded-2xl border border-crimson/12 bg-white/95 shadow-[0_8px_32px_rgba(26,10,10,0.06)]">
          {items.map((item) => (
            <div key={item.question} className="px-5 py-5 sm:px-6">
              <dt className="font-display text-base font-bold text-ink">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink/80">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
