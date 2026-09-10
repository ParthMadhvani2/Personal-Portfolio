"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "../../lib/cn";
import { useReducedMotion, useSpring } from "./use-spring";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Radius of the glow in px. */
  size?: number;
  as?: "div" | "article" | "li";
};

/**
 * A card with a spotlight that follows the pointer on a spring.
 *
 * Binding the glow straight to the pointer position looks artificial, because
 * nothing in the physical world tracks you with zero lag. Running the position
 * through a spring gives it a trace of momentum and weight, and that is the
 * entire difference between "a gradient that follows the mouse" and something
 * that feels like a material.
 *
 * X and Y get their own independent springs. A single spring over 2D distance
 * desynchronises the moment the two axes have different velocities, which shows
 * up as the glow cutting a corner on diagonal movement.
 *
 * This is decoration and it knows it: it writes CSS custom properties from
 * inside a rAF loop rather than through React state, it never runs on touch or
 * coarse pointers, and it turns itself off entirely under reduced motion.
 */
export function SpotlightCard({
  children,
  className,
  size = 380,
  as = "div",
}: Props) {
  // Widened deliberately: the element varies with `as`, and pinning the ref to
  // one tag's interface buys nothing here — the only thing read off it is
  // getBoundingClientRect, which every element has.
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const write = useCallback((axis: "x" | "y", v: number) => {
    ref.current?.style.setProperty(`--spot-${axis}`, `${v}px`);
  }, []);

  const x = useSpring(0, { bounce: 0, duration: 0.45 }, (v) => write("x", v));
  const y = useSpring(0, { bounce: 0, duration: 0.45 }, (v) => write("y", v));

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    const onEnter = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // Jump on entry rather than springing in from the last position, or the
      // glow swings across the card every time you re-enter it.
      x.jump(e.clientX - r.left);
      y.jump(e.clientY - r.top);
      el.style.setProperty("--spot-opacity", "1");
    };
    const onLeave = () => el.style.setProperty("--spot-opacity", "0");

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, reduced]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "group relative isolate overflow-hidden rounded-lg border border-line bg-surface",
        "transition-colors duration-slow ease-out hover:border-line-strong",
        className,
      )}
      style={{ ["--spot-opacity" as string]: "0" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-slow ease-out motion-reduce:hidden"
        style={{
          opacity: "var(--spot-opacity)",
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--accent-soft), transparent 70%)`,
        }}
      />
      {children}
    </Tag>
  );
}

export default SpotlightCard;
