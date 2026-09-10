"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";

type Props = {
  value: number;
  /** Rendered before the number, e.g. "$". */
  prefix?: string;
  /** Rendered after the number, e.g. "%" or "ms". */
  suffix?: string;
  /** Locale-aware grouping, on by default. */
  format?: boolean;
  className?: string;
};

/**
 * A number that rolls to its new value one digit at a time.
 *
 * Only the digits that actually changed move: each column is a 0–9 strip
 * translated on the Y axis, so going 199 → 200 rolls three columns while
 * 200 → 201 rolls one. Rolling the whole number for a single-digit change
 * reads as noise.
 *
 * Everything is `font-variant-numeric: tabular-nums`, which is what stops the
 * layout twitching as glyph widths change mid-roll — the reason most
 * hand-rolled counters look unstable.
 *
 * Under reduced motion the value simply updates. A rolling number is
 * decorative; the number is the information.
 */
export function AnimatedNumber({
  value,
  prefix,
  suffix,
  format = true,
  className,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const text = format ? value.toLocaleString("en-US") : String(value);
  const chars = text.split("");

  return (
    <span className={cn("tnum inline-flex items-baseline", className)}>
      {/* The digit strips are decoration. Screen readers get real text, because
          aria-label on a generic span is not reliably announced and role="text"
          only exists in Safari. */}
      <span className="sr-only">{`${prefix ?? ""}${text}${suffix ?? ""}`}</span>
      <span aria-hidden className="inline-flex items-baseline">
        {prefix ? <span>{prefix}</span> : null}
        {chars.map((c, i) =>
          /\d/.test(c) ? (
            <Digit key={i} digit={Number(c)} animate={mounted} />
          ) : (
            <span key={i}>{c}</span>
          ),
        )}
        {suffix ? <span>{suffix}</span> : null}
      </span>
    </span>
  );
}

function Digit({ digit, animate }: { digit: number; animate: boolean }) {
  const first = useRef(true);
  useEffect(() => {
    first.current = false;
  }, []);

  return (
    <span
      className="relative inline-block overflow-hidden tabular-nums"
      style={{ height: "1em", width: "1ch", verticalAlign: "bottom" }}
    >
      <span
        className="absolute inset-x-0 top-0 flex flex-col motion-reduce:!transition-none"
        style={{
          transform: `translateY(${-digit}em)`,
          transition:
            animate && !first.current
              ? "transform 520ms var(--ease-out)"
              : undefined,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} style={{ height: "1em", lineHeight: "1em" }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export default AnimatedNumber;
