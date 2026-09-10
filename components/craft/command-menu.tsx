"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Search } from "lucide-react";
import { Kbd } from "./kbd";

export type CommandItem = {
  id: string;
  label: string;
  /** Grouping header. */
  group: string;
  /** Extra words that should match, but are not shown. */
  keywords?: string;
  hint?: string;
  onSelect: () => void;
};

type Props = { items: CommandItem[]; placeholder?: string };

/**
 * ⌘K menu.
 *
 * Three decisions worth naming.
 *
 * **It does not animate.** This is the one thing on the site opened by a
 * keyboard shortcut, which means it gets used tens of times by anyone who finds
 * it. An entrance animation here is a tax charged on every single use, and at
 * that frequency even 150ms reads as the interface hesitating. Raycast has no
 * open animation for exactly this reason.
 *
 * **Scoring, not substring matching.** A prefix match ranks above a word-start
 * match, which ranks above a match buried mid-word, so typing "cr" puts Crafts
 * first instead of whatever happens to appear earliest in the array.
 *
 * **Focus goes back where it came from.** The trigger element is captured on
 * open and refocused on close, so a keyboard user is not dumped at the top of
 * the document.
 */
export function CommandMenu({ items, placeholder = "Search…" }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  const results = useMemo(() => score(items, query), [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    restoreTo.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        restoreTo.current = document.activeElement as HTMLElement;
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keep the active row in view during keyboard navigation, without smooth
  // scrolling, because held arrow keys would queue a backlog of animations.
  useEffect(() => {
    list.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || (e.key === "n" && e.ctrlKey)) {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp" || (e.key === "p" && e.ctrlKey)) {
      e.preventDefault();
      setIndex((i) => (i - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[index];
      if (item) {
        close();
        item.onSelect();
      }
    }
  }

  if (!open)
    return (
      <Trigger
        onOpen={(from) => {
          restoreTo.current = from;
          setOpen(true);
        }}
      />
    );

  let lastGroup = "";

  return (
    <>
      <Trigger onOpen={() => {}} />
      <div
        className="fixed inset-0 z-[60]"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
      >
        <div className="absolute inset-0 bg-black/50" onClick={close} />
        <div
          className={cn(
            "material absolute left-1/2 top-[12vh] w-[min(560px,calc(100vw-2rem))] -translate-x-1/2",
            "overflow-hidden rounded-lg border border-line bg-surface/95 shadow-lg backdrop-blur-2xl backdrop-saturate-150",
          )}
        >
          <div className="flex items-center gap-3 border-b border-line px-4">
            <input
              ref={input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIndex(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              aria-label="Search"
              className="h-12 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-dim"
            />
            <Kbd>esc</Kbd>
          </div>

          <div ref={list} className="max-h-[46vh] overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="px-3 py-6 text-center text-[13px] text-dim">
                Nothing matches “{query}”.
              </p>
            ) : (
              results.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                return (
                  <div key={item.id}>
                    {header ? (
                      <p className="label px-3 pb-1.5 pt-3">{header}</p>
                    ) : null}
                    <button
                      type="button"
                      data-active={i === index}
                      onPointerMove={() => setIndex(i)}
                      onClick={() => {
                        close();
                        item.onSelect();
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left",
                        "text-[14px] text-muted",
                        // A tint, not a shade. bg-bg-subtle sits 5/255 from the panel in dark
                        // mode: technically a selection, visually nothing.
                        "data-[active=true]:bg-accent/15 data-[active=true]:text-fg",
                      )}
                    >
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint ? (
                        <span className="mono shrink-0 text-[11px] text-dim">
                          {item.hint}
                        </span>
                      ) : null}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Trigger({ onOpen }: { onOpen: (from: HTMLElement) => void }) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      aria-label="Open command menu"
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-2 rounded-md border border-line",
        "bg-surface px-2 text-[12px] text-dim md:px-2.5",
        "transition-[transform,color,background-color] duration-fast ease-out",
        "hover:bg-surface-hover hover:text-fg active:scale-[0.97]",
      )}
    >
      <Search size={14} className="md:hidden" />
      <span className="hidden md:inline">Search</span>
      <span className="hidden items-center gap-1 md:inline-flex">
        <Kbd>mod</Kbd>
        <Kbd>K</Kbd>
      </span>
    </button>
  );
}

/**
 * Ranked match. Prefix beats word-start beats mid-word; ties keep the original
 * order, so an empty query renders the list exactly as it was authored.
 */
function score(items: CommandItem[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items
    .map((item) => {
      const hay = `${item.label} ${item.keywords ?? ""}`.toLowerCase();
      const at = hay.indexOf(q);
      if (at === -1) return null;
      const rank = at === 0 ? 0 : hay[at - 1] === " " ? 1 : 2;
      return { item, rank, at };
    })
    .filter(
      (v): v is { item: CommandItem; rank: number; at: number } => v !== null,
    )
    .sort((a, b) => a.rank - b.rank || a.at - b.at)
    .map((v) => v.item);
}

export default CommandMenu;
