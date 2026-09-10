"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type InViewState = {
  /** True once the element has entered the viewport, or if it never will animate. */
  inView: boolean;
  /**
   * True only when the client has confirmed it can actually run the reveal.
   * Server render and no-JS both leave this false, which is what keeps the
   * hidden state from ever being the thing that ships.
   */
  armed: boolean;
};

/**
 * Fires once when the element scrolls into view, then disconnects.
 *
 * The important part is the arming. A reveal implemented the obvious way
 * renders `opacity: 0` on the server, so anything that does not run the
 * observer — no JavaScript, a crawler that does not scroll, a paused tab —
 * gets a blank section. Here the markup ships visible and the client hides it
 * in a layout effect, before paint, and only when it has an
 * IntersectionObserver, reduced motion is off, and the element is genuinely
 * below the fold. If any of that is false the reveal simply never happens,
 * which is the correct failure.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  margin = -80,
): readonly [React.RefObject<T>, InViewState] {
  const ref = useRef<T>(null);
  const [state, setState] = useState<InViewState>({
    inView: true,
    armed: false,
  });

  useIso(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      el.getBoundingClientRect().top < window.innerHeight
    ) {
      return; // stays visible, never animates
    }

    setState({ inView: false, armed: true });

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setState({ inView: true, armed: true });
        io.disconnect();
      },
      { rootMargin: `0px 0px ${margin}px 0px` },
    );
    io.observe(el);

    // Safety net: if the observer has not fired within a few seconds the page
    // is probably not being scrolled at all. Show the content rather than
    // leaving it stranded.
    const bail = window.setTimeout(() => {
      setState({ inView: true, armed: true });
      io.disconnect();
    }, 4000);

    return () => {
      window.clearTimeout(bail);
      io.disconnect();
    };
  }, [margin]);

  return [ref, state] as const;
}
