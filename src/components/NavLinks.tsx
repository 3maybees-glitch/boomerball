"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { href: string; label: string };

type NavLinksProps = {
  links: NavLink[];
  variant?: "desktop" | "mobile";
};

export function NavLinks({ links, variant = "desktop" }: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  if (variant === "mobile") {
    return (
      <>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${
              isActive(link.href)
                ? "bg-cream/20 text-cream"
                : "text-cream/85 hover:bg-crimson-dark/80 hover:text-cream"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isActive(link.href) ? "page" : undefined}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${
            isActive(link.href)
              ? "bg-cream/15 text-cream"
              : "text-cream/85 hover:bg-crimson-dark/70 hover:text-cream"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
