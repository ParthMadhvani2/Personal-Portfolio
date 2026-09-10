"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "../../lib/cn";
import { THEME_KEY } from "../../lib/theme-script";
import { useReducedMotion } from "./use-spring";

type Theme = "light" | "dark";
const KEY = THEME_KEY;

/**
 * Theme toggle with a circular View Transitions reveal.
 *
 * The new theme wipes in as an expanding circle centred on the button you just
 * pressed, so the change is anchored to its cause rather than appearing to come
 * from nowhere. Where `startViewTransition` is unavailable it degrades to a
 * plain attribute flip — the feature is the polish, never the function.
 *
 * The abrupt light/dark jump is exactly the kind of brightness change reduced
 * motion is meant to soften, so that path skips the reveal too.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as Theme | null;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(stored ?? system);
    setReady(true);
  }, []);

  const apply = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    localStorage.setItem(KEY, next);
    setTheme(next);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (!doc.startViewTransition || reduced) {
      apply(next);
      return;
    }

    const rect = btn.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : innerWidth / 2;
    const cy = rect ? rect.top + rect.height / 2 : innerHeight / 2;
    // Radius to the furthest corner, so the circle always clears the viewport.
    const r = Math.hypot(
      Math.max(cx, innerWidth - cx),
      Math.max(cy, innerHeight - cy),
    );

    const transition = doc.startViewTransition(() => apply(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${cx}px ${cy}px)`,
            `circle(${r}px at ${cx}px ${cy}px)`,
          ],
        },
        {
          duration: 520,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }, [theme, apply, reduced]);

  return (
    <button
      ref={btn}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "relative grid h-8 w-8 place-items-center rounded-md border border-line",
        "bg-surface text-muted transition-[transform,color,background-color] duration-fast ease-out",
        "hover:bg-surface-hover hover:text-fg active:scale-[0.94]",
        className,
      )}
    >
      {/* The icon shows where the click takes you, matching the label. Until
          the stored preference is read neither renders, rather than guessing
          and visibly flipping on hydration. */}
      <span
        className={cn(
          "col-start-1 row-start-1 transition-[opacity,transform] duration-[200ms] ease-out",
          ready && theme === "light"
            ? "rotate-0 opacity-100"
            : "-rotate-90 opacity-0",
        )}
      >
        <Moon size={15} strokeWidth={2} />
      </span>
      <span
        className={cn(
          "absolute transition-[opacity,transform] duration-[200ms] ease-out",
          ready && theme === "dark"
            ? "rotate-0 opacity-100"
            : "rotate-90 opacity-0",
        )}
      >
        <Sun size={15} strokeWidth={2} />
      </span>
    </button>
  );
}

export default ThemeToggle;
