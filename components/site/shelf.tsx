"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../../lib/cn";
import { Reveal } from "../craft/reveal";
import { Squircle } from "../craft/squircle";
import { products, type Product } from "../../data/products";

/**
 * Wells fill out the last row rather than being a fixed count, so the shelf
 * stays a clean rectangle whatever gets added next, and still reads as having
 * room. A hardcoded number leaves an orphan the moment the product count moves.
 */
const COLS = 6;
const EMPTY_WELLS = (COLS - (products.length % COLS)) % COLS;

const badge: Record<
  Product["status"],
  { label: string; className: string } | null
> = {
  live: null,
  building: { label: "wip", className: "bg-accent text-accent-fg" },
  sunset: { label: "sunset", className: "bg-line-strong text-fg" },
};

/**
 * The shelf.
 *
 * Icons are the products' own, the same files their sites serve, rather than
 * redrawn approximations, because a portfolio showing icons that do not match
 * the real thing is a small lie the visitor can check in one click.
 *
 * Every tile is clipped to a real superellipse, which also quietly fixes
 * SnapCount: its icon ships as an unrounded square and would otherwise be the
 * one tile with hard corners.
 *
 * Hovering a tile dims its neighbours instead of magnifying itself. Dock-style
 * magnification is the obvious move here and it fights the grid; pulling
 * attention back is quieter and it survives being seen twice.
 */
export default function Shelf() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="rounded-xl border border-line bg-bg-subtle p-4 sm:p-6"
      onPointerLeave={() => setActive(null)}
    >
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
        {products.map((p, i) => {
          const b = badge[p.status];
          const dimmed = active !== null && active !== p.slug;

          return (
            <Reveal as="li" key={p.slug} index={i} margin={-20}>
              <Link
                href={`/work/${p.slug}`}
                onPointerEnter={() => setActive(p.slug)}
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive(null)}
                className="group block text-center"
                aria-label={`${p.name}: ${p.summary}`}
              >
                <span
                  className={cn(
                    "relative mx-auto block aspect-square w-full max-w-[74px]",
                    "transition-[transform,opacity,filter] duration-slow ease-out",
                    "group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5",
                    "group-active:translate-y-0 group-active:scale-[0.96]",
                    dimmed && "opacity-40 saturate-50",
                  )}
                >
                  <Squircle
                    as="span"
                    className={cn(
                      "block h-full w-full bg-surface shadow-sm",
                      "transition-shadow duration-slow ease-out group-hover:shadow-lg",
                    )}
                  >
                    {p.icon ? (
                      <Image
                        src={p.icon}
                        alt=""
                        fill
                        sizes="74px"
                        className="object-cover"
                      />
                    ) : null}
                  </Squircle>

                  {b ? (
                    <span
                      className={cn(
                        "absolute -right-1 -top-1 rounded-full px-1.5 py-0.5",
                        "font-mono text-[9px] uppercase leading-none tracking-wide",
                        b.className,
                      )}
                    >
                      {b.label}
                    </span>
                  ) : null}
                </span>

                <span
                  className={cn(
                    "mt-2.5 block truncate text-[11px] text-dim transition-colors duration-fast ease-out",
                    "group-hover:text-fg group-focus-visible:text-fg",
                  )}
                >
                  {p.name}
                </span>
              </Link>
            </Reveal>
          );
        })}

        {Array.from({ length: EMPTY_WELLS }).map((_, i) => (
          <Reveal
            as="li"
            key={`well-${i}`}
            index={products.length + i}
            margin={-20}
            aria-hidden
          >
            <Squircle
              as="span"
              className={cn(
                "mx-auto block aspect-square w-full max-w-[74px]",
                // A recess, not a dashed outline: it should read as a slot waiting
                // to be filled rather than as a missing item. Tokened because it
                // has to sit darker than the shelf in both themes, which one
                // hardcoded colour cannot do.
                "bg-well shadow-[var(--well-shadow)]",
                active !== null && "opacity-40",
                "transition-opacity duration-slow ease-out",
              )}
            />
            <span className="mt-2.5 block text-center text-[11px] text-dim/60">
              {i === 0 ? "next" : "\u00a0"}
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
