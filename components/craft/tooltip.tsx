"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/cn";

type Side = "top" | "bottom" | "left" | "right";

type GroupState = { openUntil: number };
const TooltipGroup = createContext<{ get(): GroupState; touch(): void } | null>(
  null,
);

/**
 * Wrap a cluster of tooltips (a toolbar, an icon row) so the *first* one waits
 * out the delay but the rest open instantly while the user is still sweeping
 * across the group. The delay exists to stop tooltips firing on a pointer
 * merely passing through; once the user has demonstrably stopped to read one,
 * that reason is gone, and keeping the delay just makes the toolbar feel slow.
 */
export function TooltipProvider({
  children,
  /** How long instant-mode survives after the last tooltip closes, in ms. */
  grace = 400,
}: {
  children: React.ReactNode;
  grace?: number;
}) {
  const state = useRef<GroupState>({ openUntil: 0 });
  const api = useMemo(
    () => ({
      get: () => state.current,
      touch: () => {
        state.current.openUntil = Date.now() + grace;
      },
    }),
    [grace],
  );
  return <TooltipGroup.Provider value={api}>{children}</TooltipGroup.Provider>;
}

type Props = {
  children: React.ReactNode;
  label: string;
  description?: string;
  side?: Side;
  /** Delay before the first tooltip in a group appears, in ms. */
  delay?: number;
};

export function Tooltip({
  children,
  label,
  description,
  side = "top",
  delay = 350,
}: Props) {
  const group = useContext(TooltipGroup);
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => clear, []);

  const show = useCallback(
    (immediate = false) => {
      clear();
      const skip =
        immediate || (group ? Date.now() < group.get().openUntil : false);
      setInstant(skip);
      if (skip) {
        setOpen(true);
        return;
      }
      timer.current = setTimeout(() => setOpen(true), delay);
    },
    [delay, group],
  );

  const hide = useCallback(() => {
    clear();
    if (open) group?.touch();
    setOpen(false);
  }, [group, open]);

  // Escape closes without moving the pointer — a tooltip must never trap focus
  // or sit stubbornly over the thing you are trying to read.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, hide]);

  return (
    <span
      className="relative inline-flex"
      onPointerEnter={(e) => e.pointerType !== "touch" && show()}
      onPointerLeave={hide}
      onFocus={() => show(true)}
      onBlur={hide}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>

      <span
        id={id}
        role="tooltip"
        data-side={side}
        data-open={open || undefined}
        // The origin is the trigger, not the tooltip's own centre — a popover
        // that scales out of the element you are pointing at keeps the
        // relationship between the two obvious.
        className={cn(
          "pointer-events-none absolute z-50 w-max max-w-[220px] rounded-md",
          "border border-line bg-surface px-2.5 py-1.5 shadow-md",
          "transition-[opacity,transform] ease-out",
          instant ? "duration-0" : "duration-[150ms]",
          "opacity-0 scale-[0.96]",
          "data-[open]:opacity-100 data-[open]:scale-100",
          side === "top" &&
            "bottom-full left-1/2 mb-2 -translate-x-1/2 origin-bottom",
          side === "bottom" &&
            "top-full left-1/2 mt-2 -translate-x-1/2 origin-top",
          side === "left" &&
            "right-full top-1/2 mr-2 -translate-y-1/2 origin-right",
          side === "right" &&
            "left-full top-1/2 ml-2 -translate-y-1/2 origin-left",
        )}
      >
        <span className="block whitespace-nowrap text-[12px] font-medium text-fg">
          {label}
        </span>
        {description ? (
          <span className="mt-0.5 block text-[11px] leading-snug text-dim">
            {description}
          </span>
        ) : null}
      </span>
    </span>
  );
}

export default Tooltip;
