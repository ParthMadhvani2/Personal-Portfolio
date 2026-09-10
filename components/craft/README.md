# craft

Fifteen interaction components, kept portable on purpose.

Live demos with source: [parthmadhvani2.vercel.app/crafts](https://parthmadhvani2.vercel.app/crafts)

## Dependencies

React, [`lucide-react`](https://lucide.dev) for icons, and a two-line `cn`
helper. That is the whole list. No animation library, no headless-UI package,
no context to wire up, with one exception noted below.

```ts
// lib/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));
```

## Adopting one

Copy the file. Every colour resolves to a CSS custom property, so point these
at your own tokens and you are done:

| Variable | Used for |
| --- | --- |
| `--bg`, `--bg-subtle` | page and recessed surfaces |
| `--surface`, `--surface-hover` | raised surfaces |
| `--border`, `--border-strong` | hairlines and dividers |
| `--text`, `--text-muted`, `--text-dim` | three levels of text |
| `--accent`, `--accent-fg` | selection, focus, emphasis |
| `--ease-out`, `--dur-fast`, `--dur`, `--dur-slow` | motion tokens |

Colours are stored as raw `R G B` channels, not hex, so Tailwind's alpha
modifier works: `bg-surface/90` compiles to `rgb(var(--surface) / 0.9)`. With a
hex value in the variable the same class compiles to something invalid and
silently paints nothing.

## The components

| Component | What it is | Notes |
| --- | --- | --- |
| `AnimatedNumber` | Digit-rolling counter | Only changed digits move. Optional count-up on first view. |
| `BrowserFrame` | Screenshot in a chrome bar | Reserves its box, so no layout shift. |
| `CommandMenu` | `mod+K` palette | Needs `Kbd`. Ranked matching, no open animation. |
| `CopyButton` | Copy with confirmation | Blur-masked state morph. |
| `HoldToConfirm` | Press-and-hold destructive action | Asymmetric timing, clip-path fill. |
| `Kbd` | Keyboard key | Resolves `mod` to ⌘ or Ctrl after mount. |
| `Marquee` | Infinite ticker | Linear by necessity. Stops under reduced motion. |
| `Reveal` | Scroll-triggered entrance | Ships visible; hides only once it can animate. |
| `SegmentedControl` | Tab switcher | Clip-path colour transition. |
| `Sheet` | Draggable bottom sheet | Needs `useSpring`. Momentum projection, rubber-banding. |
| `SpotlightCard` | Pointer-tracking glow | Independent X and Y springs. |
| `Squircle` | Superellipse clip | Derived from the equation, emits a CSS `polygon()`. |
| `StatusPill` | Labelled status dot | Never carries meaning by colour alone. |
| `ThemeToggle` | Light/dark switch | Circular View Transitions reveal. Needs `themeScript` in `<head>`. |
| `useSpring` | Interruptible spring | Plus `project()` and `rubberband()` helpers. |

`TooltipProvider` is the one optional context: wrap a cluster of tooltips and
the first waits out its delay while the rest open instantly.

## Why there is no animation library

CSS transitions run off the main thread, so they hold up while the browser is
busy parsing a route, which is exactly when a `requestAnimationFrame`-driven
animation starts dropping frames. The spring exists only where a gesture has to
be interruptible and carry velocity, which is the one thing CSS genuinely
cannot do.

Each file carries a comment explaining the principle behind its timing rather
than just what it does. The reasoning is the point; the code is the easy half.
See the [colophon](https://parthmadhvani2.vercel.app/colophon) for the full set
of decisions.

## Accessibility

Every component respects `prefers-reduced-motion` by dropping travel and
keeping opacity. Focus is never removed, only replaced. Status is never carried
by colour alone. Screen readers get final values, not mid-animation ones.

## Licence

MIT. Copy them, change them, ship them. Attribution appreciated, not required.
