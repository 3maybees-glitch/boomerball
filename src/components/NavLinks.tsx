"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type NavLinkItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

type NavLinksProps = {
  links: NavLinkItem[];
  variant?: "desktop" | "mobile";
};

function linkClassName(active: boolean, variant: "desktop" | "mobile") {
  if (variant === "mobile") {
    return `shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${
      active
        ? "bg-cream/20 text-cream"
        : "text-cream/85 hover:bg-crimson-dark/80 hover:text-cream"
    }`;
  }

  return `rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${
    active
      ? "bg-cream/15 text-cream"
      : "text-cream/85 hover:bg-crimson-dark/70 hover:text-cream"
  }`;
}

function isPathActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavDropdown({
  item,
  pathname,
  variant,
}: {
  item: NavLinkItem;
  pathname: string;
  variant: "desktop" | "mobile";
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const children = item.children ?? [];
  const childActive = children.some((child) => isPathActive(pathname, child.href));
  const parentActive = isPathActive(pathname, item.href) || childActive;
  const isMobile = variant === "mobile";

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
      onMouseEnter={isMobile ? undefined : () => setOpen(true)}
      onMouseLeave={isMobile ? undefined : () => setOpen(false)}
    >
      <div className="inline-flex items-center">
        <Link
          href={item.href}
          aria-current={isPathActive(pathname, item.href) ? "page" : undefined}
          className={`${linkClassName(parentActive, variant)} rounded-r-none pr-1.5`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={menuId}
          aria-label={`${item.label} submenu`}
          onClick={() => setOpen((value) => !value)}
          className={`${linkClassName(parentActive, variant)} rounded-l-none pl-1`}
        >
          <ChevronDown
            className={`${isMobile ? "h-3 w-3" : "h-3.5 w-3.5"} transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      </div>
      {open && (
        <div
          id={menuId}
          role="menu"
          className={`absolute left-0 top-full z-50 border border-cream/20 bg-crimson-dark shadow-[0_16px_36px_rgba(26,10,10,0.4)] ${
            isMobile
              ? "mt-1 min-w-[10.5rem] rounded-lg py-1"
              : "min-w-[11.5rem] rounded-lg py-1.5"
          }`}
        >
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              aria-current={isPathActive(pathname, child.href) ? "page" : undefined}
              className={`block transition ${
                isMobile
                  ? "px-3 py-2 text-xs font-medium"
                  : "px-3.5 py-2 text-sm font-medium"
              } ${
                isPathActive(pathname, child.href)
                  ? "bg-cream/20 text-cream"
                  : "text-cream/90 hover:bg-cream/10 hover:text-cream"
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function NavLinks({ links, variant = "desktop" }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) =>
        link.children?.length ? (
          <NavDropdown
            key={link.href}
            item={link}
            pathname={pathname}
            variant={variant}
          />
        ) : (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isPathActive(pathname, link.href) ? "page" : undefined}
            className={linkClassName(isPathActive(pathname, link.href), variant)}
          >
            {link.label}
          </Link>
        ),
      )}
    </>
  );
}
