"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Sheet } from "../craft/sheet";
import { Squircle, squirclePolygon } from "../craft/squircle";
import { project, rubberband } from "../craft/use-spring";
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

/* -- sheet article -------------------------------------------------------- */

const HEIGHT = 320;
const CLOSE_FRACTION = 0.45;
const CLOSE_VELOCITY = 350;

/** Distance alone cannot separate a flick from a slow drag. */
function Threshold() {
  const cases = [
    { label: "slow drag", v: 90, hint: "let me look again" },
    { label: "fast flick", v: 900, hint: "go away" },
  ];
  const released = HEIGHT * 0.22;

  return (
    <div className="w-full max-w-md space-y-5">
      {cases.map((c) => {
        const landing = released + project(c.v);
        const dismiss =
          c.v > CLOSE_VELOCITY ||
          (c.v > -CLOSE_VELOCITY && landing > HEIGHT * CLOSE_FRACTION);
        return (
          <div key={c.label}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-[13px] text-fg">{c.label}</span>
              <span className="mono text-[11px] text-dim tnum">{c.v} px/s</span>
            </div>
            <div className="relative h-8 overflow-hidden rounded-md bg-bg-subtle">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 bg-line-strong/60"
                style={{ width: `${(released / HEIGHT) * 100}%` }}
              />
              <span
                aria-hidden
                className="absolute inset-y-0 w-px bg-accent"
                style={{ left: `${Math.min(100, (landing / HEIGHT) * 100)}%` }}
              />
              <span className="absolute inset-y-0 right-2 flex items-center">
                <span
                  className={cn(
                    "mono text-[10px] uppercase tracking-wide",
                    dismiss ? "text-accent" : "text-dim",
                  )}
                >
                  {dismiss ? "dismiss" : "spring back"}
                </span>
              </span>
            </div>
            <p className="mt-1.5 text-[12px] text-dim">
              Released at the same point. Projected to{" "}
              <span className="mono tnum">{Math.round(landing)}px</span>. Meant{" "}
              {c.hint}.
            </p>
          </div>
        );
      })}
    </div>
  );
}

/** The projection function, as a dial. */
function Projection() {
  const [v, setV] = useState(600);
  const released = HEIGHT * 0.2;
  const landing = released + project(v);
  const dismiss =
    v > CLOSE_VELOCITY ||
    (v > -CLOSE_VELOCITY && landing > HEIGHT * CLOSE_FRACTION);

  return (
    <div className="w-full max-w-md">
      <div className="relative h-40 overflow-hidden rounded-lg border border-line bg-bg">
        <span
          aria-hidden
          className="absolute inset-x-0 border-t border-dashed border-line-strong"
          style={{ top: `${CLOSE_FRACTION * 100}%` }}
        />
        <span
          className="mono absolute right-2 text-[10px] text-dim"
          style={{ top: `${CLOSE_FRACTION * 100}%` }}
        >
          dismiss line
        </span>
        {/* the sheet, at release */}
        <span
          aria-hidden
          className="absolute inset-x-0 bg-surface-hover"
          style={{ top: `${(released / HEIGHT) * 100}%`, bottom: 0 }}
        />
        {/* where it is projected to land */}
        <span
          aria-hidden
          className="absolute inset-x-0 h-0.5 bg-accent"
          style={{ top: `${Math.min(99, (landing / HEIGHT) * 100)}%` }}
        />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <span className="mono w-24 shrink-0 text-[12px] text-dim tnum">
          {v} px/s
        </span>
        <input
          type="range"
          min={0}
          max={2000}
          step={10}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label="Release velocity"
          className="h-8 flex-1 accent-[rgb(var(--accent))]"
        />
      </div>
      <p className="mt-2 text-[13px] text-muted">
        Projected {Math.round(project(v))}px further.{" "}
        <span className={dismiss ? "text-accent" : "text-dim"}>
          {dismiss ? "Dismisses." : "Springs back."}
        </span>
      </p>
    </div>
  );
}

/** Progressive resistance past a boundary. */
function Rubberband() {
  const [drag, setDrag] = useState(240);
  const moved = Math.abs(rubberband(-drag, 400));
  return (
    <div className="w-full max-w-md">
      <div className="space-y-3">
        {[
          { label: "you dragged", px: drag, tone: "bg-line-strong" },
          { label: "it moved", px: moved, tone: "bg-accent" },
        ].map((r) => (
          <div key={r.label}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-[13px] text-muted">{r.label}</span>
              <span className="mono text-[11px] text-dim tnum">
                {Math.round(r.px)}px
              </span>
            </div>
            <span className="block h-3 overflow-hidden rounded-full bg-bg-subtle">
              <span
                className={cn("block h-full rounded-full", r.tone)}
                style={{ width: `${(r.px / 700) * 100}%` }}
              />
            </span>
          </div>
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={700}
        step={10}
        value={drag}
        onChange={(e) => setDrag(Number(e.target.value))}
        aria-label="Drag distance past the boundary"
        className="mt-5 h-8 w-full accent-[rgb(var(--accent))]"
      />
    </div>
  );
}

function SheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-9 rounded-md border border-line bg-surface px-3.5 text-[13px] font-medium text-muted transition-[transform,background-color,color] duration-fast ease-out hover:bg-surface-hover hover:text-fg active:scale-[0.97]"
      >
        Open the sheet
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Throw me">
        <h3 className="title text-[17px]">throw me</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          A short fast flick dismisses even from near the top, because the
          release velocity projects past the line. A slow drag to halfway
          springs back.
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          Pull up past the top and it resists rather than stopping. Grab it
          while it is closing and it follows you from wherever it is.
        </p>
      </Sheet>
    </div>
  );
}

/* -- token article -------------------------------------------------------- */

/** Reads back what the browser actually computed, which is the whole point. */
function useComputedBg(ref: React.RefObject<HTMLElement>) {
  const [bg, setBg] = useState("");
  useEffect(() => {
    if (ref.current) setBg(getComputedStyle(ref.current).backgroundColor);
  }, [ref]);
  return bg;
}

function Swatch({
  label,
  varValue,
  varName,
}: {
  label: string;
  varValue: string;
  varName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const bg = useComputedBg(ref);
  const dead = bg === "rgba(0, 0, 0, 0)" || bg === "transparent";
  return (
    <div className="flex-1">
      <div
        className="relative h-24 overflow-hidden rounded-md border border-line"
        // A checkerboard behind it, so "transparent" is visible rather than
        // just looking like a dark swatch on a dark page.
        style={{
          backgroundImage:
            "repeating-conic-gradient(rgb(var(--line-strong, 120 120 130) / .28) 0% 25%, transparent 0% 50%)",
          backgroundSize: "14px 14px",
        }}
      >
        <div
          ref={ref}
          className="absolute inset-0"
          style={
            {
              [varName]: varValue,
              backgroundColor: `rgb(var(${varName}) / 0.9)`,
            } as React.CSSProperties
          }
        />
      </div>
      <p className="mono mt-2.5 text-[11px] text-fg">{label}</p>
      <p className="mono mt-0.5 text-[11px] text-dim">
        {varName}: {varValue}
      </p>
      <p
        className={cn(
          "mono mt-1 text-[11px]",
          dead ? "text-red-400" : "text-live",
        )}
      >
        computed: {bg || "…"}
      </p>
    </div>
  );
}

function TokenBug() {
  return (
    <div className="flex w-full max-w-md gap-5">
      <Swatch
        label="hex in the variable"
        varName="--demo-a"
        varValue="#2f6bff"
      />
      <Swatch label="raw channels" varName="--demo-b" varValue="47 107 255" />
    </div>
  );
}

function TokenAlpha() {
  const alphas = [1, 0.75, 0.5, 0.25];
  return (
    <div className="w-full max-w-md space-y-5">
      {[
        { label: "hex", value: "#2f6bff", name: "--demo-c" },
        { label: "channels", value: "47 107 255", name: "--demo-d" },
      ].map((row) => (
        <div key={row.label}>
          <p className="mono mb-2 text-[11px] text-dim">
            {row.label}: {row.value}
          </p>
          <div
            className="flex gap-2 rounded-md p-2"
            style={{
              backgroundImage:
                "repeating-conic-gradient(rgb(120 120 130 / .28) 0% 25%, transparent 0% 50%)",
              backgroundSize: "12px 12px",
            }}
          >
            {alphas.map((a) => (
              <div key={a} className="flex-1 text-center">
                <span
                  className="block h-12 rounded-[5px]"
                  style={
                    {
                      [row.name]: row.value,
                      backgroundColor: `rgb(var(${row.name}) / ${a})`,
                    } as React.CSSProperties
                  }
                />
                <span className="mono mt-1 block text-[10px] text-dim tnum">
                  {a}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

const registry: Record<string, React.ComponentType> = {
  seam: Seam,
  exponent: Exponent,
  accuracy: Accuracy,
  shelf: Shelf,
  threshold: Threshold,
  projection: Projection,
  rubberband: Rubberband,
  sheet: SheetDemo,
  tokenbug: TokenBug,
  tokenalpha: TokenAlpha,
};

export default function ArticleDemo({ id }: { id: string }) {
  const D = registry[id];
  return D ? <D /> : null;
}
