"use client";

import { cn } from "../../lib/cn";
import { useInView } from "./use-in-view";

type Props = {
  children: React.ReactNode;
  /** Stagger index. Each step adds ~55ms. */
  index?: number;
  /** How far below the fold it fires, in px. Negative means "further in". */
  margin?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
} & React.HTMLAttributes<HTMLElement>;

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
  ...rest
}: Props) {
  // Widened for the same reason as SpotlightCard: the element varies with
  // `as`, and the only thing read off the ref is getBoundingClientRect.
  const As = as as React.ElementType;
  const [ref, { inView }] = useInView<HTMLDivElement>(margin);

  return (
    <As
      ref={ref}
      data-hidden={!inView || undefined}
      style={{ transitionDelay: inView ? `${index * 55}ms` : "0ms" }}
      className={cn(
        "transition-[opacity,transform] duration-[520ms] ease-out",
        "data-[hidden]:translate-y-2.5 data-[hidden]:opacity-0",
        "motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </As>
  );
}

export default Reveal;
