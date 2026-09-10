"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";

type Props = {
  children: React.ReactNode;
  onConfirm: () => void;
  /** How long the hold must last, in ms. */
  duration?: number;
  /** Destructive styling — red fill instead of accent. */
  destructive?: boolean;
  className?: string;
};

/**
 * Hold-to-confirm: a destructive action that needs deliberate intent but no
 * modal.
 *
 * Two details do the work.
 *
 * The fill is a `clip-path: inset()` overlay rather than an animated width, so
 * it composites on the GPU and never reflows the label underneath.
 *
 * The timing is deliberately asymmetric — slow going in (the user is deciding),
 * snappy coming back (the system is responding). A release that unwound as
 * slowly as the press would feel like the button was arguing with you.
 *
 * Escape aborts, and the whole thing is keyboard-operable via Space/Enter hold.
 */
export function HoldToConfirm({
  children,
  onConfirm,
  duration = 1200,
  destructive = true,
  className,
}: Props) {
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setHolding(false);
  }, []);

  const begin = useCallback(() => {
    if (timer.current || done) return;
    setHolding(true);
    timer.current = setTimeout(() => {
      timer.current = null;
      setHolding(false);
      setDone(true);
      onConfirm();
      setTimeout(() => setDone(false), 1400);
    }, duration);
  }, [duration, onConfirm, done]);

  useEffect(() => cancel, [cancel]);

  useEffect(() => {
    if (!holding) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cancel();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [holding, cancel]);

  return (
    <button
      type="button"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        begin();
      }}
      onPointerUp={cancel}
      onPointerCancel={cancel}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          begin();
        }
      }}
      onKeyUp={cancel}
      aria-label={done ? "Confirmed" : "Press and hold to confirm"}
      className={cn(
        "relative isolate select-none overflow-hidden rounded-md border px-3.5 py-2",
        "text-[13px] font-medium",
        "transition-[transform,border-color,color] duration-fast ease-out",
        "active:scale-[0.98] touch-none",
        done
          ? "border-live/50 text-live"
          : destructive
            ? "border-line text-muted hover:border-red-500/40 hover:text-fg"
            : "border-line text-muted hover:border-accent/40 hover:text-fg",
        className,
      )}
    >
      {/* Fill layer. Slow in, fast out — the whole feel lives in these two
          transition declarations. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10",
          destructive ? "bg-red-500/20" : "bg-accent-soft",
        )}
        style={{
          clipPath: holding ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: holding
            ? `clip-path ${duration}ms linear`
            : "clip-path 200ms var(--ease-out)",
        }}
      />
      <span className="relative">{done ? "confirmed" : children}</span>
    </button>
  );
}

export default HoldToConfirm;
