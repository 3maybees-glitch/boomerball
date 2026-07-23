import Image from "next/image";
import { ExternalLink, Map as MapIcon } from "lucide-react";
import {
  LEGEND_MAPS_SHOP_NOTE,
  legendMapProducts,
} from "@/data/legend-maps";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionReveal";

export function LegendMapsShowcase() {
  return (
    <div id="maps" className="scroll-mt-24">
      <MotionStagger className="grid gap-6 lg:grid-cols-2">
        {legendMapProducts.map((product) => (
          <MotionStaggerItem key={product.id}>
            <a
              href={product.etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-crimson/15 bg-white/95 shadow-[0_8px_32px_rgba(26,10,10,0.06)] transition hover:border-crimson/35 hover:shadow-[0_12px_40px_rgba(132,22,23,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-cream-dark">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  fill
                  unoptimized
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent px-4 pb-3 pt-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-crimson">
                    <MapIcon className="h-3 w-3" aria-hidden />
                    On Etsy
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink group-hover:text-crimson sm:text-2xl">
                    {product.shortTitle}
                  </h3>
                  <p className="text-sm font-semibold text-crimson">
                    {product.priceDisplay}
                    <span className="ml-1.5 text-xs font-medium text-ink/45">
                      {product.format}
                    </span>
                  </p>
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                  {product.blurb}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {product.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-snug text-ink/60"
                    >
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson/55"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson underline decoration-crimson/25 underline-offset-4 transition group-hover:decoration-crimson">
                  View on Etsy
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
            </a>
          </MotionStaggerItem>
        ))}
      </MotionStagger>

      <p className="mt-5 max-w-[62ch] text-xs leading-relaxed text-ink/50">
        {LEGEND_MAPS_SHOP_NOTE}
      </p>
    </div>
  );
}
