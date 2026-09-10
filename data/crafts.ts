/**
 * Server-safe metadata for the component library. Kept apart from the demo
 * components themselves so server components (the /crafts page, the sitemap,
 * the OG images) can read names and copy without crossing the client boundary.
 */
export type CraftMeta = {
  id: string;
  name: string;
  /** The principle the component exists to demonstrate. */
  principle: string;
  file: string;
  /** Extra files a copy of this component also needs. */
  deps?: string[];
};

export const crafts: CraftMeta[] = [
  {
    id: "copy-button",
    name: "CopyButton",
    principle:
      "A crossfade between two icons shows you two objects overlapping. Two pixels of blur during the swap makes the eye read one object transforming instead.",
    file: "copy-button.tsx",
  },
  {
    id: "tooltip",
    name: "Tooltip",
    principle:
      "The first one waits out the delay; the rest open instantly while you are still sweeping the row. Each scales from its trigger, not from its own centre.",
    file: "tooltip.tsx",
  },
  {
    id: "segmented-control",
    name: "SegmentedControl",
    principle:
      "The labels are rendered twice and the active copy is clipped to the thumb, so the text changes colour as the thumb passes over it rather than a beat ahead of it.",
    file: "segmented-control.tsx",
  },
  {
    id: "animated-number",
    name: "AnimatedNumber",
    principle:
      "Only the digits that changed roll. Tabular figures stop the layout twitching mid-roll — the reason most hand-rolled counters look unstable.",
    file: "animated-number.tsx",
  },
  {
    id: "hold-to-confirm",
    name: "HoldToConfirm",
    principle:
      "Slow going in, snappy coming back — deliberate where the user is deciding, immediate where the system is responding. The fill is a clip-path, so it never reflows.",
    file: "hold-to-confirm.tsx",
  },
  {
    id: "sheet",
    name: "Sheet",
    principle:
      "1:1 tracking, momentum projected forward on release, the finger's velocity handed to the spring, rubber-banding at the top, interruptible at any frame.",
    file: "sheet.tsx",
    deps: ["use-spring.ts"],
  },
  {
    id: "spotlight-card",
    name: "SpotlightCard",
    principle:
      "Nothing in the physical world tracks you with zero lag. A spring on the pointer position is the whole difference between a gradient and a material.",
    file: "spotlight-card.tsx",
    deps: ["use-spring.ts"],
  },
  {
    id: "marquee",
    name: "Marquee",
    principle:
      "Constant motion is the one case where linear is correct — easing a loop makes it visibly pulse once per cycle. Stops entirely under reduced motion.",
    file: "marquee.tsx",
  },
  {
    id: "status-pill",
    name: "StatusPill",
    principle:
      "The pulse lives on a pseudo-ring rather than the dot, so reduced motion can drop the ring without the dot going with it. Status is never carried by colour alone.",
    file: "status-pill.tsx",
  },
  {
    id: "theme-toggle",
    name: "ThemeToggle",
    principle:
      "The new theme wipes in as a circle centred on the button you just pressed, so the change is anchored to its cause. Degrades to a plain flip without View Transitions.",
    file: "theme-toggle.tsx",
  },
];

export const craftById = (id: string) => crafts.find((c) => c.id === id);
