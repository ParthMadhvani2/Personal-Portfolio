/**
 * craft — a small set of interaction components built for this site and kept
 * portable on purpose.
 *
 * Each file is self-contained: React, `lucide-react` for icons, and the `cn`
 * helper. No animation library, no headless-UI dependency, no context to wire
 * up (bar the optional TooltipProvider). Every colour resolves to a CSS custom
 * property, so dropping one into another project means copying the file and
 * pointing four or five variables at your own tokens.
 */
export { CopyButton } from "./copy-button";
export { StatusPill } from "./status-pill";
export { Tooltip, TooltipProvider } from "./tooltip";
export { SegmentedControl } from "./segmented-control";
export { HoldToConfirm } from "./hold-to-confirm";
export { AnimatedNumber } from "./animated-number";
export { SpotlightCard } from "./spotlight-card";
export { Marquee } from "./marquee";
export { Sheet } from "./sheet";
export { ThemeToggle } from "./theme-toggle";
export { themeScript, THEME_KEY } from "../../lib/theme-script";
export { useSpring, useReducedMotion, project, rubberband } from "./use-spring";
export type { SpringConfig } from "./use-spring";
