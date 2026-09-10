"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/cn";
import { ThemeToggle } from "../craft/theme-toggle";
import SiteCommand from "./site-command";
import Image from "next/image";
import { site } from "../../data/site";

const links: { href: string; label: string; minor?: boolean }[] = [
  { href: "/work", label: "work" },
  { href: "/crafts", label: "crafts" },
  { href: "/notes", label: "notes" },
  { href: "/tech-i-know", label: "stack", minor: true },
  { href: "/colophon", label: "colophon", minor: true },
  { href: "/resume", label: "resume" },
];

/**
 * A translucent bar the content scrolls under, rather than an opaque strip that
 * permanently eats 56px of the viewport. The bright top edge is the light
 * catching the material — it is what stops a blurred surface reading as a flat
 * grey rectangle.
 */
export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      <div className="material border-b border-line bg-bg/70 backdrop-blur-xl backdrop-saturate-150">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-14 max-w-content items-center gap-0.5 px-4 sm:gap-1 sm:px-6"
        >
          <Link
            href="/"
            className="mr-auto flex items-center gap-2.5 rounded-md py-1 pr-2 transition-opacity duration-fast ease-out hover:opacity-70"
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
                  "relative rounded-md px-2 py-1.5 text-[13px] font-medium lower sm:px-2.5",
                  "transition-colors duration-fast ease-out",
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
