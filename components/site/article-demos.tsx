"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "../../lib/cn";
import { Squircle, squirclePolygon } from "../craft/squircle";
import { products } from "../../data/products";

/* -- 1. the seam ---------------------------------------------------------- */

function Seam() {
  const [show, setShow] = useState(true);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end gap-10">
        {/* Same fill on both, or the reader is comparing colour as well as
            shape and the comparison proves nothing. */}
        <div className="text-center">
          <span
            className="block h-32 w-32 bg-fg"
            style={{ borderRadius: 38 }}
          />
          <p className="mono mt-3 text-[11px] text-dim">border-radius: 38px</p>
        </div>
        <div className="text-center">
          <Squircle className="h-32 w-32 bg-fg" />
          <p className="mono mt-3 text-[11px] text-dim">
            superellipse, n = 4.5
          </p>
        </div>
        {show ? (
          <div className="text-center">
            {/* The rounded rect in accent, the superellipse punched out of it.
                What is left is exactly the area the two shapes disagree on. */}
            <span className="relative block h-32 w-32">
              <span
                className="absolute inset-0 bg-accent"
                style={{ borderRadius: 38 }}
              />
              <span
                className="absolute inset-0 bg-bg-subtle"
                style={{ clipPath: squirclePolygon(4.5) }}
              />
            </span>
            <p className="mono mt-3 text-[11px] text-dim">the difference</p>
          </div>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="h-8 rounded-md border border-line bg-surface px-3 text-[12px] text-muted transition-[transform,background-color,color] duration-fast ease-out hover:bg-surface-hover hover:text-fg active:scale-[0.97]"
      >
        {show ? "Hide overlay" : "Show overlay"}
      </button>
    </div>
  );
}

/* -- 2. the exponent ------------------------------------------------------ */

function Exponent() {
  const [n, setN] = useState(4.5);
  return (
    <div className="flex flex-col items-center gap-6">
      <span
        className="block h-40 w-40 bg-accent transition-none"
        style={{ clipPath: squirclePolygon(n) }}
      />
      <div className="flex w-full max-w-sm items-center gap-4">
        <span className="mono w-16 shrink-0 text-[12px] text-dim tnum">
          n = {n.toFixed(1)}
        </span>
        <input
          type="range"
          min={2}
          max={12}
          step={0.1}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          aria-label="Superellipse exponent"
          className="h-8 flex-1 accent-[rgb(var(--accent))]"
        />
      </div>
      <div className="flex gap-2">
        {[
          [2, "circle"],
          [4.5, "iOS"],
          [12, "square"],
        ].map(([v, label]) => (
          <button
            key={label as string}
            type="button"
            onClick={() => setN(v as number)}
            className={cn(
              "h-7 rounded-md border px-2.5 font-mono text-[11px]",
              "transition-[transform,background-color,color,border-color] duration-fast ease-out active:scale-[0.96]",
              Math.abs(n - (v as number)) < 0.05
                ? "border-accent bg-accent text-accent-fg"
                : "border-line bg-surface text-dim hover:text-fg",
            )}
          >
            {label as string}
          </button>
        ))}
      </div>
    </div>
  );
}

/* -- 3. accuracy ---------------------------------------------------------- */

/** Max chord deviation from the true curve, in px, at a given render size. */
function deviation(steps: number, n = 4.5, px = 74) {
  let worst = 0;
  const pt = (i: number) => {
    const t = (i / steps) * 2 * Math.PI;
    const ct = Math.cos(t);
    const st = Math.sin(t);
    return [
      Math.sign(ct) * Math.abs(ct) ** (2 / n),
      Math.sign(st) * Math.abs(st) ** (2 / n),
    ] as const;
  };
  for (let i = 0; i < steps; i++) {
    const a = pt(i);
    const b = pt(i + 1);
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2;
    const r = (Math.abs(mx) ** n + Math.abs(my) ** n) ** (1 / n);
    worst = Math.max(worst, Math.abs(r - 1) / 2);
  }
  return worst * px;
}

function Accuracy() {
  const rows = [8, 16, 24, 32, 48, 64, 96];
  const max = deviation(8);
  return (
    <div className="w-full max-w-md">
      <ul className="space-y-2">
        {rows.map((s) => {
          const d = deviation(s);
          const chosen = s === 64;
          return (
            <li key={s} className="flex items-center gap-3">
              <span className="mono w-10 shrink-0 text-right text-[11px] text-dim tnum">
                {s}
              </span>
              <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-bg-subtle">
                <span
                  className={cn(
                    "block h-full rounded-full",
                    chosen ? "bg-accent" : "bg-line-strong",
                  )}
                  style={{ width: `${Math.max(1.5, (d / max) * 100)}%` }}
                />
              </span>
              <span
                className={cn(
                  "mono w-16 shrink-0 text-[11px] tnum",
                  chosen ? "text-accent" : "text-dim",
                )}
              >
                {d.toFixed(3)}px
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mono mt-4 text-[11px] text-dim">
        samples, and how far the chord falls inside the curve at 74px
      </p>
    </div>
  );
}

/* -- 4. the shelf --------------------------------------------------------- */

function Shelf() {
  const [clipped, setClipped] = useState(true);
  const shown = products.filter((p) => p.icon).slice(0, 5);
  return (
    <div className="flex flex-col items-center gap-6">
      <ul className="flex flex-wrap justify-center gap-4">
        {shown.map((p) => (
          <li key={p.slug} className="text-center">
            <span
              className="relative block h-16 w-16 overflow-hidden"
              style={
                clipped
                  ? { clipPath: squirclePolygon(4.5) }
                  : { borderRadius: 0 }
              }
            >
              <Image
                src={p.icon!}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <span className="mono mt-2 block text-[10px] text-dim">
              {p.name.split(" ")[0]}
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setClipped((v) => !v)}
        className="h-8 rounded-md border border-line bg-surface px-3 text-[12px] text-muted transition-[transform,background-color,color] duration-fast ease-out hover:bg-surface-hover hover:text-fg active:scale-[0.97]"
      >
        {clipped ? "Remove the clip" : "Clip to superellipse"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------------- */

const registry: Record<string, React.ComponentType> = {
  seam: Seam,
  exponent: Exponent,
  accuracy: Accuracy,
  shelf: Shelf,
};

export default function ArticleDemo({ id }: { id: string }) {
  const D = registry[id];
  return D ? <D /> : null;
}
