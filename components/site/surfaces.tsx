"use client";

import { useState } from "react";
import { cn } from "../../lib/cn";
import Section from "./section";

type Layer = {
  id: string;
  name: string;
  /** What actually gets built at this layer. */
  detail: string;
  stack: string[];
  /** Where the work usually stops for people who only do part of the stack. */
  note?: string;
};

const layers: Layer[] = [
  {
    id: "marketing",
    name: "Marketing site",
    detail:
      "The page the product launches behind. Programmatic landing pages per vertical, a sitemap generated from the routes, free standalone tools as the top of funnel, and copy written to be read rather than to hit a keyword.",
    stack: ["Next.js", "TanStack Start", "next-intl", "Structured data"],
    note: "Usually handed to a contractor. It is the first thing a buyer sees.",
  },
  {
    id: "web",
    name: "Web app",
    detail:
      "Server-rendered at the edge, with a token-based design system underneath so a colour or radius changes in one place. Empty states, loading states and error states are designed, not discovered in QA.",
    stack: ["React 19", "TanStack Start", "Tailwind v4", "Radix", "Zod"],
  },
  {
    id: "ios",
    name: "iOS app",
    detail:
      "Expo on the new architecture (TurboModules and Hermes), with real-time sync and haptics. Accessibility hooks are read on mount, so Reduce Motion and Reduce Transparency actually change what renders.",
    stack: ["Expo SDK 53", "React Native 0.79", "MMKV", "expo-haptics", "EAS"],
  },
  {
    id: "api",
    name: "API",
    detail:
      "Django and DRF, or Express where the workload is streaming. Idempotent webhook handlers, soft deletes, and indexes designed against the queries that actually run rather than added after the first slow page.",
    stack: ["Django 5", "DRF", "Express", "SSE", "PostgreSQL"],
  },
  {
    id: "jobs",
    name: "Background work",
    detail:
      "Scheduled scrapes, LLM classification over every new row, and email. Queued through Celery on Redis, with prompts costed per row because this runs continuously, not on a button press.",
    stack: ["Celery", "Redis", "OpenAI", "Apify", "Resend"],
  },
  {
    id: "billing",
    name: "Billing and auth",
    detail:
      "Multi-tier subscriptions with signature-verified webhooks, JWT cookies with refresh rotation, Google OAuth, and Fernet-encrypted storage for third-party tokens.",
    stack: ["Dodo Payments", "Stripe", "JWT", "Google OAuth", "Fernet"],
    note: "The layer where a quiet bug costs real money.",
  },
];

/**
 * An explorer list: a keyboard-navigable set of rows on the left, one detail
 * panel on the right that crossfades between them.
 *
 * The crossfade carries a couple of pixels of blur while it swaps. Without it
 * you briefly see two paragraphs stacked on each other and the eye reads two
 * objects; with it, one panel appears to become the other.
 */
export default function Surfaces() {
  const [active, setActive] = useState(layers[0].id);
  const current = layers.find((l) => l.id === active) ?? layers[0];

  return (
    <Section
      label="How I work"
      title="the whole surface, not one layer of it"
      intro={
        <>
          A product is not the API. Pick a layer and see what owning it actually
          means.
        </>
      }
    >
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ul
          className="bg-surface p-2"
          role="tablist"
          aria-orientation="vertical"
        >
          {layers.map((l, i) => {
            const selected = l.id === active;
            return (
              <li key={l.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="surface-detail"
                  onClick={() => setActive(l.id)}
                  onPointerEnter={() => setActive(l.id)}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-md px-3 py-3 text-left",
                    "transition-[background-color,transform] duration-fast ease-out",
                    "active:scale-[0.99]",
                    selected ? "bg-bg-subtle" : "hover:bg-bg-subtle/60",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "font-mono text-[11px] transition-colors duration-fast ease-out",
                      selected ? "text-accent" : "text-dim",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-[14px] font-medium transition-colors duration-fast ease-out",
                      selected ? "text-fg" : "text-muted",
                    )}
                  >
                    {l.name}
                  </span>
                  {/* Selection marker slides rather than blinking between rows. */}
                  <span
                    aria-hidden
                    className={cn(
                      "ml-auto h-1.5 w-1.5 rounded-full bg-accent",
                      "transition-[opacity,transform] duration-slow ease-out",
                      selected
                        ? "scale-100 opacity-100"
                        : "scale-[0.4] opacity-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div
          id="surface-detail"
          role="tabpanel"
          className="relative min-h-[280px] bg-surface p-5 sm:p-6"
        >
          {layers.map((l) => (
            <div
              key={l.id}
              aria-hidden={l.id !== current.id}
              className={cn(
                "transition-[opacity,filter] duration-[220ms] ease-out",
                l.id === current.id
                  ? "opacity-100 blur-0"
                  : "pointer-events-none absolute inset-0 p-5 opacity-0 blur-[4px] sm:p-6",
              )}
            >
              <h3 className="title text-[17px] lower">{l.name}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {l.detail}
              </p>

              {l.note ? (
                <p className="mt-4 border-l-2 border-accent/40 pl-3 text-[13px] italic leading-relaxed text-dim">
                  {l.note}
                </p>
              ) : null}

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {l.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-sm border border-line bg-bg-subtle px-2 py-1 font-mono text-[11px] text-dim"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
