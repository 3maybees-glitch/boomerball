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
      className="border-y border-crimson/10 bg-cream/40 py-10"
      aria-labelledby="seo-faq-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2
          id="seo-faq-heading"
          className="font-display text-xl font-bold text-crimson sm:text-2xl"
        >
          {heading}
        </h2>
        <p className="mt-1 text-sm text-ink/70">
          Direct answers about Boomer Ball and the Oklahoma Sooners — sourced and
          citable.
        </p>
        <dl className="mt-6 divide-y divide-crimson/10 rounded-xl border-2 border-crimson/15 bg-white">
          {items.map((item) => (
            <div key={item.question} className="px-4 py-4 sm:px-5">
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
