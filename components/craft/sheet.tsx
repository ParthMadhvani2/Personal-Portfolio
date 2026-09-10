"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "../../lib/cn";
import { project, rubberband, useReducedMotion, useSpring } from "./use-spring";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  className?: string;
};

const CLOSE_VELOCITY = 350; // px/s. A flick this fast dismisses regardless of distance
const CLOSE_FRACTION = 0.45; // or drag past this share of the sheet's height

/**
 * A bottom sheet you can throw.
 *
 * This is the piece where a CSS transition genuinely cannot get you there, and
 * the reasons are worth naming:
 *
 * **1:1 tracking with the grab offset.** The sheet stays glued to the finger
 * from wherever you grabbed it. Snapping to a fixed point on press breaks the
 * illusion in the first frame.
 *
 * **Momentum projection.** On release it does not snap to whichever end is
 * closer. It asks where the sheet *would* come to rest given the release
 * velocity, using Apple's exponential-decay projection rather than the textbook v²/2a, and
 * commits to the outcome nearest that. A short fast flick dismisses; a long
 * slow drag that stops halfway springs back.
 *
 * **Velocity handoff.** The spring starts at the exact velocity the finger left
 * at, so there is no seam between dragging and animating.
 *
 * **Rubber-banding.** Dragging up past the top meets progressive resistance
 * instead of a wall. A hard stop reads as frozen.
 *
 * **Interruptible.** Grab a sheet that is already animating closed and it
 * follows your finger again from wherever it currently is, because the spring
 * animates from the on-screen value rather than a logical target.
 *
 * Note: the whole panel is the drag surface, which is right for short sheets
 * and wrong for scrollable ones. If you put a scroll region inside, move the
 * pointer handlers onto the grab handle and only allow the drag to start when
 * the region is already at scrollTop 0.
 */
export function Sheet({ open, onClose, children, title, className }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const drag = useRef({
    active: false,
    pointerId: -1,
    startPointerY: 0,
    startY: 0,
    history: [] as { y: number; t: number }[],
  });

  const paint = useCallback((y: number) => {
    const el = panel.current;
    if (!el) return;
    el.style.transform = `translate3d(0, ${y}px, 0)`;
    const h = el.offsetHeight || 1;
    // Scrim opacity tracks the sheet, so the background dims continuously
    // during the drag instead of only at the end.
    scrim.current?.style.setProperty("opacity", String(Math.max(0, 1 - y / h)));
  }, []);

  const y = useSpring(9999, { bounce: 0, duration: 0.38 }, paint);

  const height = () => panel.current?.offsetHeight ?? 0;

  // Open / close. Bounce stays at 0 here: nothing the user did carried
  // momentum, so overshoot would be decoration pretending to be physics.
  const mounted = useRef(false);
  useEffect(() => {
    const settle = () => height() || window.innerHeight;
    if (reduced || !mounted.current) {
      mounted.current = true;
      y.jump(open ? 0 : settle());
      return;
    }
    if (open) {
      const h = height() || window.innerHeight;
      if (y.value.current > h - 1) y.jump(h);
      y.set(0);
    } else {
      y.set(height() || window.innerHeight);
    }
  }, [open, y, reduced]);

  // Escape, and a scroll lock that does not reflow the page.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  function onPointerDown(e: React.PointerEvent) {
    if (drag.current.active) return; // ignore a second finger mid-drag
    const el = panel.current;
    if (!el) return;
    // Capture so tracking survives the pointer leaving the sheet's bounds.
    // Throws NotFoundError if the pointer is no longer active, which happens
    // with synthetic events and with a pointer cancelled by the OS between the
    // event firing and this handler running. A throw here would kill the drag
    // outright, so it is swallowed and tracking continues uncaptured.
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* uncaptured drag still tracks while the pointer is over the sheet */
    }
    y.stop(); // take over from any in-flight animation, at its current value
    drag.current = {
      active: true,
      pointerId: e.pointerId,
      startPointerY: e.clientY,
      // Anchor to wherever the sheet currently *is* on screen. Grab one
      // mid-flight and it keeps its position instead of jumping to a target.
      startY: y.value.current,
      history: [{ y: e.clientY, t: performance.now() }],
    };
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    const el = panel.current;
    if (!el) return;

    // Pure delta: the sheet moves exactly as far as the finger did, from
    // wherever it was grabbed.
    const raw = d.startY + (e.clientY - d.startPointerY);
    // Past the top, resist rather than stop.
    const next = raw < 0 ? rubberband(raw, el.offsetHeight) : raw;
    y.jump(next);

    d.history.push({ y: e.clientY, t: performance.now() });
    if (d.history.length > 6) d.history.shift();
  }

  function onPointerUp(e: React.PointerEvent) {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    d.active = false;

    const h = height() || 1;
    const first = d.history[0];
    const last = d.history[d.history.length - 1];
    const dt = Math.max(1, last.t - first.t);
    const velocity = ((last.y - first.y) / dt) * 1000; // px/s, downward positive

    // Where would it land? Decide from the projection, not the release point.
    const landing = y.value.current + project(velocity);
    const dismiss =
      velocity > CLOSE_VELOCITY ||
      (velocity > -CLOSE_VELOCITY && landing > h * CLOSE_FRACTION);

    // Hand the finger's velocity to the spring. A little bounce is earned here
    // and only here, because the motion that follows continues a real throw.
    if (dismiss) {
      y.set(h, { velocity });
      onClose();
    } else {
      y.set(0, { velocity });
    }
  }

  return (
    <div
      className={cn("fixed inset-0 z-50", !open && "pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        ref={scrim}
        onClick={onClose}
        className="material absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-slow ease-out"
        style={{ opacity: 0 }}
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ transform: "translate3d(0, 100%, 0)" }}
        className={cn(
          "absolute inset-x-0 bottom-0 mx-auto w-full max-w-lg touch-none",
          "rounded-t-xl border border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-lg",
          "will-change-transform",
          className,
        )}
      >
        <div className="flex cursor-grab justify-center py-3 active:cursor-grabbing">
          <span aria-hidden className="h-1 w-9 rounded-full bg-line-strong" />
        </div>
        <div className="px-5 pb-6">{children}</div>
      </div>
    </div>
  );
}

export default Sheet;
