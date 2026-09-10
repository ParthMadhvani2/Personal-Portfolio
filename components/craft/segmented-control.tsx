"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/cn";

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  "aria-label": string;
  className?: string;
};

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Segmented control with a clip-path colour transition.
 *
 * The label row is rendered twice. The lower copy is styled inactive; the upper
 * copy is styled active and clipped to exactly the selected segment. Sliding
 * the clip in lockstep with the thumb means the text colour changes *as the
 * thumb passes over it*, pixel by pixel, which you cannot get by timing a
 * `color` transition on each label, where the text always flips slightly ahead
 * of or behind the thumb.
 *
 * Arrow keys move the selection, as a native radio group would.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  ...rest
}: Props<T>) {
  const list = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const [rect, setRect] = useState({ left: 0, width: 0, track: 0 });
  const [ready, setReady] = useState(false);

  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  const measure = useCallback(() => {
    const el = items.current[index];
    const parent = list.current;
    if (!el || !parent) return;
    // Track width is measured here and kept in state rather than read off the
    // ref during render, where it would be null on first pass and stale after.
    setRect({
      left: el.offsetLeft,
      width: el.offsetWidth,
      track: parent.offsetWidth,
    });
  }, [index]);

  useIsoLayoutEffect(() => {
    measure();
    // Skip the transition on first paint so the thumb doesn't slide in from 0.
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [measure]);

  useEffect(() => {
    if (!list.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(list.current);
    return () => ro.disconnect();
  }, [measure]);

  function onKeyDown(e: React.KeyboardEvent) {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + options.length) % options.length;
    onChange(options[next].value);
    items.current[next]?.focus();
  }

  const track = rect.track || 1;
  const right = Math.max(0, 100 - ((rect.left + rect.width) / track) * 100);
  const left = (rect.left / track) * 100;
  const clip = `inset(0 ${right}% 0 ${left}%)`;

  const transition = ready
    ? "transition-[transform,width,clip-path] duration-slow ease-in-out"
    : "";

  return (
    <div
      ref={list}
      role="radiogroup"
      onKeyDown={onKeyDown}
      className={cn(
        "relative isolate inline-flex rounded-lg border border-line bg-bg-subtle p-1",
        className,
      )}
      {...rest}
    >
      {/* thumb */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 left-0 -z-10 rounded-md bg-surface shadow-sm",
          transition,
        )}
        style={{ width: rect.width, transform: `translateX(${rect.left}px)` }}
      />

      {/* base (inactive) layer */}
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={(el) => {
            items.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          tabIndex={o.value === value ? 0 : -1}
          onClick={() => onChange(o.value)}
          className={cn(
            "relative rounded-md px-3 py-1.5 text-[13px] font-medium text-dim",
            "transition-transform duration-fast ease-out active:scale-[0.97]",
          )}
        >
          {o.label}
        </button>
      ))}

      {/* active layer, clipped to the thumb */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 flex p-1 text-fg",
          transition,
        )}
        style={{ clipPath: clip }}
      >
        {options.map((o) => (
          <span
            key={o.value}
            className="rounded-md px-3 py-1.5 text-[13px] font-semibold"
          >
            {o.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SegmentedControl;
