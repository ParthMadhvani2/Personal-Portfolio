"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { products, shippedCount } from "../../data/products";

type Proof = {
  href: string;
  title: string;
  detail: string;
  icon?: string;
};

type Role = {
  id: "design" | "product" | "founding";
  name: string;
  /** Short measured hint shown on the role node. */
  hint: string;
  proof: Proof[];
};

const bySlug = (slug: string) => products.find((p) => p.slug === slug);
const launched = products.filter((p) => p.launch).length;

/** A product's first three owned surfaces, the evidence of product-level scope. */
function ownedProof(slug: string): Proof | null {
  const p = bySlug(slug);
  if (!p || p.owned.length === 0) return null;
  return {
    href: `/work/${p.slug}`,
    title: p.name.toLowerCase(),
    detail: p.owned.slice(0, 3).join(" · "),
    icon: p.icon,
  };
}

const snap = bySlug("snapcount");
const oqa = bySlug("outboundqa");

const ROLES: Role[] = [
  {
    id: "design",
    name: "design engineer",
    hint: "14 components",
    proof: [
      {
        href: "/crafts",
        title: "14 interaction components",
        detail: "copy button, segmented control, hold to confirm: with source, no animation library",
      },
      {
        href: "/colophon",
        title: "the mark",
        detail: "a P set on a 3×5 grid, generated from one script",
      },
      ...(snap
        ? [
            {
              href: `/work/${snap.slug}`,
              title: "snapcount",
              detail: "the iOS app reads Reduce Motion and Reduce Transparency",
              icon: snap.icon,
            },
          ]
        : []),
    ],
  },
  {
    id: "product",
    name: "product engineer",
    hint: "whole surface",
    proof: ["embers", "hood-cleaning-report", "snapcount"]
      .map(ownedProof)
      .filter((p): p is Proof => p !== null),
  },
  {
    id: "founding",
    name: "founding engineer",
    hint: `${shippedCount} shipped`,
    proof: [
      {
        href: "/work",
        title: `${shippedCount} shipped, ${launched} launched on product hunt`,
        detail: "every layer owned, from the schema to the page it launches behind",
      },
      ...(oqa
        ? [
            {
              href: `/work/${oqa.slug}`,
              title: "outboundqa",
              detail: "launched, then sunset. the write-up says why",
              icon: oqa.icon,
            },
          ]
        : []),
    ],
  },
];

/*
 * Wire geometry. Role nodes are fixed-height rows (56px, 12px gaps), so the
 * three branch paths are exact rather than measured: the source sits at the
 * vertical centre (y = 96) and each branch elbows at x = 60 into its node.
 */
const WIRES = [
  "M0 96 H52 Q60 96 60 88 V36 Q60 28 68 28 H120",
  "M0 96 H120",
  "M0 96 H52 Q60 96 60 104 V156 Q60 164 68 164 H120",
];

/**
 * "I do my best work as" → three roles, each opening the evidence behind it.
 * A radio group underneath: arrow keys move between roles, as a native
 * radio would. The travelling dot is decoration and disappears under
 * reduced motion; the active wire's colour carries the state on its own.
 */
export default function RoleMap() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const role = ROLES[active];

  function onKey(e: React.KeyboardEvent, i: number) {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % ROLES.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i + ROLES.length - 1) % ROLES.length
          : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-5 sm:p-6">
      <div className="grid items-center gap-4 sm:grid-cols-[auto_120px_minmax(0,1fr)] sm:gap-0">
        <p className="w-fit rounded-md border border-line-strong bg-bg px-4 py-3 text-[15px] font-medium text-fg">
          i do my best work as
        </p>

        {/* branches: desktop only; on phones the list below carries the structure */}
        <div className="relative hidden h-[192px] w-[120px] sm:block" aria-hidden>
          <svg viewBox="0 0 120 192" className="absolute inset-0 h-full w-full overflow-visible">
            {WIRES.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                strokeWidth={i === active ? 1.5 : 1}
                className={cn(
                  "transition-[stroke] duration-slow ease-out",
                  i === active ? "stroke-accent" : "stroke-line-strong",
                )}
              />
            ))}
          </svg>
          <span
            key={active}
            className="wire-dot absolute left-0 top-0 h-[7px] w-[7px] rounded-full bg-accent"
            style={{ offsetPath: `path("${WIRES[active]}")` }}
          />
        </div>

        <div
          role="radiogroup"
          aria-label="Roles I'm looking for"
          className="relative grid gap-3 pl-4 before:absolute before:bottom-7 before:left-0 before:top-0 before:w-px before:bg-line-strong sm:pl-0 sm:before:hidden"
        >
          {ROLES.map((r, i) => {
            const on = i === active;
            return (
              <button
                key={r.id}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "relative flex h-14 items-center justify-between gap-3 rounded-md border px-4 text-left transition-[border-color,background-color,color,transform] duration-fast ease-out active:scale-[0.99]",
                  "before:absolute before:-left-4 before:top-1/2 before:h-px before:w-4 before:bg-line-strong sm:before:hidden",
                  on
                    ? "border-accent bg-accent-soft text-fg"
                    : "border-line bg-bg text-muted hover:border-line-strong hover:text-fg",
                )}
              >
                <span className="text-[15px] font-medium">{r.name}</span>
                <span className="mono text-[11.5px] text-dim">{r.hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul
        key={role.id}
        className="role-proof mt-5 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
        style={{ "--n": role.proof.length } as React.CSSProperties}
        aria-live="polite"
      >
        {role.proof.map((p, i) => (
          <li key={p.href + p.title} className="bg-surface" style={{ "--i": i } as React.CSSProperties}>
            <Link
              href={p.href}
              className="group flex h-full items-start gap-3 bg-surface px-4 py-4 transition-colors duration-fast ease-out hover:bg-surface-hover"
            >
              {p.icon ? (
                <Image
                  src={p.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="mt-0.5 shrink-0 rounded-[7px]"
                />
              ) : null}
              <span className="min-w-0">
                <span className="block text-[14px] font-medium text-fg">{p.title}</span>
                <span className="mt-1 block text-[13px] leading-snug text-muted">{p.detail}</span>
              </span>
              <ArrowUpRight
                size={14}
                className="ml-auto mt-1 shrink-0 text-dim transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
