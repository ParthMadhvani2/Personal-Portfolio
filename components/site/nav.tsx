"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { ThemeToggle } from "../craft/theme-toggle";
import SiteCommand from "./site-command";
import Image from "next/image";
import { site } from "../../data/site";

/** tier 0 always shows, 1 hides under 420px, 2 hides under 768px. */
const links: { href: string; label: string; tier?: 1 | 2 }[] = [
  { href: "/work", label: "work" },
  { href: "/crafts", label: "crafts" },
  { href: "/notes", label: "notes" },
  { href: "/tech-i-know", label: "stack", tier: 2 },
  { href: "/colophon", label: "colophon", tier: 2 },
  { href: "/resume", label: "resume", tier: 1 },
];

/**
 * A translucent bar the content scrolls under, rather than an opaque strip that
 * permanently eats 56px of the viewport. The bright top edge is the light
 * catching the material, and it is what stops a blurred surface reading as a flat
 * grey rectangle.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // At the top of the page there is nothing behind the bar, so the blur and the
  // border are drawing a line for no reason. They arrive once content is
  // actually passing underneath.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div
        className={cn(
          "material transition-[background-color,border-color,backdrop-filter] duration-slow ease-out",
          "border-b",
          scrolled
            ? "border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-bg/0",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-14 max-w-content items-center gap-0.5 px-4 sm:gap-1 sm:px-6"
        >
          <Link
            href="/"
            className="mr-auto flex shrink-0 items-center gap-2.5 rounded-md py-1 pr-2 transition-opacity duration-fast ease-out hover:opacity-70"
          >
            <Image
              src="/media/mark.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
              priority
            />
            {/* Below 480px the wordmark wraps and shoves the toggle off the bar, so
                the mark carries it alone. */}
            <span className="title hidden text-[15px] lower xs:inline">
              {site.name}
            </span>
          </Link>

          {links.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative shrink-0 rounded-md px-2 py-1.5 text-[13px] font-medium lower sm:px-2.5",
                  "transition-colors duration-fast ease-out",
                  // Two tiers of yielding. The command menu reaches every one
                  // of these, so on a narrow bar they give up their space
                  // rather than pushing the controls off the edge.
                  l.tier === 2 && "hidden md:inline-block",
                  l.tier === 1 && "hidden xs:inline-block",
                  active ? "text-fg" : "text-dim hover:text-fg",
                )}
              >
                {l.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-2 -bottom-[9px] h-px bg-fg sm:inset-x-2.5",
                    "origin-center transition-transform duration-slow ease-out",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}

          <span
            aria-hidden
            className="mx-1 hidden h-4 w-px bg-line xs:block sm:mx-1.5"
          />
          <SiteCommand />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
