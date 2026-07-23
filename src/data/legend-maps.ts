/** Soft-featured Legend Land printable maps — sold via Etsy */

export type LegendMapProduct = {
  id: string;
  title: string;
  shortTitle: string;
  blurb: string;
  highlights: string[];
  priceDisplay: string;
  format: string;
  imageSrc: string;
  imageAlt: string;
  etsyUrl: string;
};

export const LEGEND_MAPS_SHOP_NOTE =
  "Printable digital downloads from Mayhee Creations. Fan-made artwork — not affiliated with or endorsed by the University of Oklahoma.";

export const legendMapProducts: LegendMapProduct[] = [
  {
    id: "world-map",
    title: "Oklahoma Sooners Legend Land World Map",
    shortTitle: "Legend Land World Map",
    blurb:
      "A full-color fantasy sports-history map charting Heisman harbors, championship peaks, coaching citadels, Memorial Stadium traditions, and Norman-inspired landmarks — plus a companion guidebook.",
    highlights: [
      "Heisman Hall & National Championship Peaks",
      "Sooner Schooner Trail & Owen Field",
      "Map + guidebook digital set",
    ],
    priceDisplay: "$7.77",
    format: "Printable digital download",
    imageSrc: "/legend-maps/world-map.jpg",
    imageAlt:
      "Oklahoma Sooners Legend Land World Map printed poster beside an OU helmet",
    etsyUrl:
      "https://www.etsy.com/listing/4531000596/oklahoma-sooners-legend-land-world-map",
  },
  {
    id: "qb-map",
    title: "Oklahoma Sooners Quarterback Legend Land",
    shortTitle: "Quarterback Legend Land",
    blurb:
      "A crimson-and-cream fantasy map devoted to OU’s quarterback lineage — from Wishbone pioneers to Heisman winners — with a matching companion guidebook.",
    highlights: [
      "Baker, Kyler, Bradford, White & more",
      "Owen Field · Palace on the Prairie",
      "Map + guidebook digital set",
    ],
    priceDisplay: "$7.77",
    format: "Printable digital download",
    imageSrc: "/legend-maps/qb-map.jpg",
    imageAlt:
      "Oklahoma Sooners Quarterback Legend Land fantasy map on a wooden desk",
    etsyUrl:
      "https://www.etsy.com/listing/4542533341/oklahoma-sooners-quarterback-legend-land",
  },
];
