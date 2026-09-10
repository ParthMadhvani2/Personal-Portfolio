"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../../lib/cn";

type Props = {
  /** Text placed on the clipboard. */
  value: string;
  /** Optional visible label. Omit for an icon-only button. */
  label?: string;
  className?: string;
  /** How long the confirmed state holds, in ms. */
  timeout?: number;
};

/**
 * Copy button with a blur-masked state morph.
 *
 * The blur is the whole trick. A plain crossfade between two icons shows you
 * two distinct objects overlapping for 200ms, which looks wrong however you
 * tune the easing. A couple of pixels of blur during the swap blends them, and
 * the eye reads one object transforming instead of two objects trading places.
 *
 * Press feedback is `scale(0.97)` on `:active` so the button answers the press
 * itself, not the async result.
 */
export function CopyButton({ value, label, className, timeout = 1600 }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return; // clipboard blocked (insecure origin, denied permission)
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), timeout);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy ${label ?? "to clipboard"}`}
      data-copied={copied || undefined}
      className={cn(
        "group relative inline-flex h-8 select-none items-center gap-1.5 rounded-md",
        "border border-line bg-surface px-2.5 text-[13px] font-medium text-muted",
        "transition-[transform,background-color,color,border-color] duration-fast ease-out",
        "hover:bg-surface-hover hover:text-fg active:scale-[0.97]",
        "data-[copied]:border-live/40 data-[copied]:text-live",
        className,
      )}
    >
      {/* Both states occupy the same box so the button never changes width. */}
      <span className="relative grid h-4 w-4 place-items-center">
        <Icon show={!copied}>
          <Copy size={14} strokeWidth={2} />
        </Icon>
        <Icon show={copied}>
          <Check size={14} strokeWidth={2.5} />
        </Icon>
      </span>

      {label ? (
        <span className="relative block">
          <span className="invisible" aria-hidden>
            {/* reserves the wider of the two labels — no layout shift on swap */}
            {label.length >= 6 ? label : "copied"}
          </span>
          <Label show={!copied}>{label}</Label>
          <Label show={copied}>copied</Label>
        </span>
      ) : null}

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

function Icon({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "col-start-1 row-start-1 transition-[opacity,filter,transform] duration-[200ms] ease-out",
        show
          ? "scale-100 opacity-100 blur-0"
          : "scale-[0.6] opacity-0 blur-[3px]",
      )}
    >
      {children}
    </span>
  );
}

function Label({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 whitespace-nowrap transition-[opacity,filter] duration-[200ms] ease-out",
        show ? "opacity-100 blur-0" : "opacity-0 blur-[3px]",
      )}
    >
      {children}
    </span>
  );
}

export default CopyButton;
