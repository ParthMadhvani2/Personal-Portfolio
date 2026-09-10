"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";

type Props = {
  children: React.ReactNode;
  /** Stagger index. Each step adds ~55ms. */
  index?: number;
  /** How far below the fold it fires, in px. Negative means "further in". */
  margin?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Reveals its children when they scroll into view: once, then it stops.
 *
 * The point is the *once*. A page-load entrance animation on content below the
 * fold plays to nobody: by the time the visitor scrolls down it finished
 * minutes ago, so it costs the same work and buys nothing. Worse, if anything
 * pauses animations (a background tab, an occluded window, a screenshot
 * pipeline), the content is stranded at opacity 0.
 *
 * So the observer disconnects after firing, the element is visible by default
 * for anyone without IntersectionObserver or JavaScript, and reduced motion
 * skips straight to the resting state rather than fading.
 */
export function Reveal({
  children,
  index = 0,
  margin = -80,
  className,
  as = "div",
}: Props) {
  // Widened for the same reason as SpotlightCard: the element varies with
  // `as`, and the only thing read off the ref is getBoundingClientRect.
  const As = as as React.ElementType;
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    // Already on screen at mount (above the fold): show without waiting for a
    // scroll that may never come.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { rootMargin: `0px 0px ${margin}px 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    <As
      ref={ref}
      data-shown={shown || undefined}
      style={{ transitionDelay: shown ? `${index * 55}ms` : "0ms" }}
      className={cn(
        "translate-y-2.5 opacity-0 transition-[opacity,transform] duration-[520ms] ease-out",
        "data-[shown]:translate-y-0 data-[shown]:opacity-100",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </As>
  );
}

export default Reveal;
