"use client";

import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";

/**
 * A keyboard key.
 *
 * The one thing it does that a styled `<kbd>` does not: it resolves `mod` to ⌘
 * on Apple platforms and Ctrl everywhere else, after mount. Hardcoding ⌘ is
 * wrong for most visitors, and rendering the platform guess on the server
 * guarantees a hydration mismatch — so it starts neutral and settles.
 */
export function Kbd({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [apple, setApple] = useState<boolean | null>(null);

  useEffect(() => {
    setApple(/Mac|iPhone|iPad|iPod/.test(navigator.platform ?? ""));
  }, []);

  const label =
    children === "mod"
      ? apple === null
        ? ""
        : apple
          ? "⌘"
          : "Ctrl"
      : children;

  return (
    <kbd
      className={cn(
        "inline-grid h-5 min-w-[20px] place-items-center rounded-[5px] border border-line",
        "border-b-2 bg-surface px-1.5 font-mono text-[10px] font-medium text-dim",
        className,
      )}
    >
      {/* Reserve the slot so the row does not reflow when the platform resolves. */}
      <span className={label ? "" : "opacity-0"}>{label || "⌘"}</span>
    </kbd>
  );
}

export default Kbd;
