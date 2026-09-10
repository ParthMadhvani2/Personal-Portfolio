"use client";

import { useState } from "react";
import { Bell, Github, Keyboard, Settings2, Trash2 } from "lucide-react";
import { AnimatedNumber } from "../craft/animated-number";
import { CopyButton } from "../craft/copy-button";
import { HoldToConfirm } from "../craft/hold-to-confirm";
import { Marquee } from "../craft/marquee";
import { SegmentedControl } from "../craft/segmented-control";
import { Sheet } from "../craft/sheet";
import { SpotlightCard } from "../craft/spotlight-card";
import { StatusPill } from "../craft/status-pill";
import { BrowserFrame } from "../craft/browser-frame";
import { CommandMenu } from "../craft/command-menu";
import { Kbd } from "../craft/kbd";
import { Reveal } from "../craft/reveal";
import { Squircle } from "../craft/squircle";
import { ThemeToggle } from "../craft/theme-toggle";
import { Tooltip, TooltipProvider } from "../craft/tooltip";

function CopyDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CopyButton value="npx create-next-app@latest" label="copy" />
      <CopyButton value="madhvaniparth2@gmail.com" />
    </div>
  );
}

function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1.5">
        {[
          { Icon: Bell, label: "Notifications", note: "⌘ + N" },
          { Icon: Settings2, label: "Settings", note: "⌘ + ," },
          { Icon: Keyboard, label: "Shortcuts", note: "Press ?" },
          { Icon: Github, label: "Repository", note: "Opens GitHub" },
        ].map(({ Icon, label, note }) => (
          <Tooltip key={label} label={label} description={note}>
            <button
              type="button"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface text-muted transition-[transform,background-color,color] duration-fast ease-out hover:bg-surface-hover hover:text-fg active:scale-[0.94]"
            >
              <Icon size={15} />
            </button>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

const RANGES = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
] as const;

function SegmentedDemo() {
  const [range, setRange] = useState<(typeof RANGES)[number]["value"]>("30d");
  const leads = { "7d": 148, "30d": 1206, "90d": 4318 }[range];

  return (
    <div className="flex flex-col gap-4">
      <SegmentedControl
        options={RANGES}
        value={range}
        onChange={setRange}
        aria-label="Date range"
      />
      <p className="title text-[30px] text-fg">
        <AnimatedNumber value={leads} />
        <span className="ml-2 align-middle text-[13px] font-normal text-dim">
          ranked leads
        </span>
      </p>
    </div>
  );
}

function NumberDemo() {
  const [n, setN] = useState(1206);
  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="title text-[30px] text-fg">
        <AnimatedNumber value={n} prefix="$" />
      </p>
      <div className="flex gap-1.5">
        {[-7, 1, 94].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setN((v) => Math.max(0, v + d))}
            className="h-8 rounded-md border border-line bg-surface px-2.5 font-mono text-[12px] text-muted transition-[transform,background-color,color] duration-fast ease-out hover:bg-surface-hover hover:text-fg active:scale-[0.95]"
          >
            {d > 0 ? `+${d}` : d}
          </button>
        ))}
      </div>
    </div>
  );
}

function ThemeDemo() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <span className="text-[13px] text-dim">switches the whole page</span>
    </div>
  );
}

function HoldDemo() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <HoldToConfirm onConfirm={() => setCount((c) => Math.max(0, c - 1))}>
        <span className="inline-flex items-center gap-1.5">
          <Trash2 size={13} /> hold to delete
        </span>
      </HoldToConfirm>
      <span className="text-[13px] text-dim">
        <AnimatedNumber value={count} /> remaining
      </span>
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
        Open sheet
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Drag me">
        <h3 className="title text-[17px] lower">drag the handle</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          Flick it down fast and it goes, even from near the top, because the
          release velocity is projected forward to decide where it would have
          landed. Drag it slowly to halfway and let go, and it springs back. Try
          grabbing it again while it is closing.
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          Pull up past the top and it resists instead of stopping dead.
        </p>
      </Sheet>
    </div>
  );
}

function SpotlightDemo() {
  return (
    <SpotlightCard className="max-w-sm p-5">
      <p className="label mb-2">Card</p>
      <p className="title text-[16px] lower">move your pointer across this</p>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">
        The glow lags very slightly behind the pointer, on a spring, with X and
        Y on independent springs so diagonals do not cut the corner.
      </p>
    </SpotlightCard>
  );
}

function MarqueeDemo() {
  return (
    <Marquee speed={26}>
      {[
        "Django",
        "React 19",
        "Expo",
        "Celery",
        "Postgres",
        "Workers",
        "R2",
        "SSE",
      ].map((t) => (
        <span
          key={t}
          className="rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-[12px] text-muted"
        >
          {t}
        </span>
      ))}
    </Marquee>
  );
}

function SquircleDemo() {
  return (
    <div className="flex flex-wrap items-end gap-5">
      {[2, 4.5, 12].map((n) => (
        <div key={n}>
          <Squircle n={n} className="h-14 w-14 bg-accent" />
          <p className="mono mt-2 text-[10px] text-dim">n = {n}</p>
        </div>
      ))}
      <div>
        <span className="block h-14 w-14 rounded-[16px] bg-line-strong" />
        <p className="mono mt-2 text-[10px] text-dim">rounded rect</p>
      </div>
    </div>
  );
}

function CommandDemo() {
  const items = ["Home", "Work", "Crafts", "Colophon", "Résumé"].map(
    (label) => ({
      id: label,
      group: "Pages",
      label,
      onSelect: () => {},
    }),
  );
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CommandMenu items={items} />
      <span className="flex items-center gap-1.5 text-[13px] text-dim">
        or press <Kbd>mod</Kbd> <Kbd>K</Kbd>
      </span>
    </div>
  );
}

function RevealDemo() {
  return (
    <div className="max-h-[150px] overflow-y-auto rounded-md border border-line bg-bg-subtle p-3">
      <p className="mb-3 text-[12px] text-dim">scroll this box</p>
      <div className="h-[130px]" />
      {["fires once", "then disconnects", "visible without JS"].map((t, i) => (
        <Reveal key={t} index={i} className="mb-2">
          <p className="rounded-md border border-line bg-surface px-3 py-2 text-[13px] text-muted">
            {t}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

function FrameDemo() {
  return (
    <BrowserFrame
      src="/shots/snapcount.png"
      alt="SnapCount home page"
      url="snapcount.app"
      className="max-w-sm"
    />
  );
}

function StatusDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusPill tone="live">Live</StatusPill>
      <StatusPill tone="accent">In review</StatusPill>
      <StatusPill>Archived</StatusPill>
    </div>
  );
}

/* ------------------------------------------------------------------------- */

const registry: Record<string, React.ComponentType> = {
  "copy-button": CopyDemo,
  tooltip: TooltipDemo,
  "segmented-control": SegmentedDemo,
  "animated-number": NumberDemo,
  "hold-to-confirm": HoldDemo,
  sheet: SheetDemo,
  "spotlight-card": SpotlightDemo,
  marquee: MarqueeDemo,
  "status-pill": StatusDemo,
  squircle: SquircleDemo,
  "command-menu": CommandDemo,
  reveal: RevealDemo,
  "browser-frame": FrameDemo,
  "theme-toggle": ThemeDemo,
};

/**
 * Renders one live demo by id. Keyed rather than passed as a prop so the
 * metadata in `data/crafts.ts` stays plain data and server components can read
 * it without crossing the client boundary.
 */
export default function CraftDemo({ id }: { id: string }) {
  const Demo = registry[id];
  return Demo ? <Demo /> : null;
}
