import Image from "next/image";
import Link from "next/link";
import { LOGO_ALT, LOGO_ANIMATED, LOGO_STATIC } from "@/lib/brand";

type SiteLogoVariant = "header" | "hero" | "footer";

type SiteLogoProps = {
  variant?: SiteLogoVariant;
  /** Link to home — use in header/footer nav */
  linked?: boolean;
  /** Use animated asset when available (drop file at LOGO_ANIMATED) */
  animated?: boolean;
  className?: string;
};

const variantConfig: Record<
  SiteLogoVariant,
  { width: number; height: number; imageClass: string }
> = {
  header: {
    width: 120,
    height: 80,
    imageClass: "h-10 w-auto sm:h-12",
  },
  hero: {
    width: 320,
    height: 213,
    imageClass: "h-24 w-auto sm:h-28 lg:h-32",
  },
  footer: {
    width: 140,
    height: 93,
    imageClass: "h-16 w-auto",
  },
};

export function SiteLogo({
  variant = "header",
  linked = false,
  animated = false,
  className = "",
}: SiteLogoProps) {
  const { width, height, imageClass } = variantConfig[variant];
  const src = animated ? LOGO_ANIMATED : LOGO_STATIC;

  const image = (
    <Image
      src={src}
      alt={LOGO_ALT}
      width={width}
      height={height}
      className={`object-contain drop-shadow-md ${imageClass} ${className}`.trim()}
      priority={variant === "header" || variant === "hero"}
    />
  );

  if (linked) {
    return (
      <Link href="/" className="inline-flex shrink-0 items-center">
        {image}
      </Link>
    );
  }

  return image;
}
