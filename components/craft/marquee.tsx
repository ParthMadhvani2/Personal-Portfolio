"use client";

import { Children } from "react";
import { cn } from "../../lib/cn";

type Props = {
  children: React.ReactNode;
  /** Seconds for one full pass. Longer = slower. */
  speed?: number;
  reverse?: boolean;
  /** Pause when the pointer is over the track. */
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * An infinite horizontal ticker.
 *
 * Constant motion is the one case where `linear` is correct, because easing a loop
 * makes it visibly pulse once per cycle. The content is duplicated and the
 * track translated by exactly -50%, which is what keeps the seam invisible at
 * any width without measuring anything.
 *
 * Under reduced motion the track stops and becomes a normal scrollable row,
 * because a permanently moving band is exactly the kind of thing that setting
 * exists to switch off.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className,
}: Props) {
  const items = Children.toArray(children);

  return (
    <div
      className={cn(
        "edge-fade group relative flex overflow-hidden",
        "motion-reduce:overflow-x-auto motion-reduce:no-scrollbar",
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            "flex shrink-0 items-center gap-3 pr-3",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            "motion-reduce:!animate-none",
          )}
          style={{
            animation: `marquee-track ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {items}
        </div>
      ))}

      <style>{`
        @keyframes marquee-track {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

export default Marquee;
