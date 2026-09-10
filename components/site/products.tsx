import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products, experiments } from "../../data/products";
import { SpotlightCard } from "../craft/spotlight-card";
import { StatusPill } from "../craft/status-pill";
import Section from "./section";

export default function Products() {
  return (
    <Section
      id="work"
      label="Work"
      title="four products, in production"
      intro={
        <>
          Not client work and not a tutorial repo. These are live products with
          paying surfaces, and I own more than one layer of each. Every card
          goes to a write-up of what was actually hard.
        </>
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <SpotlightCard as="li" key={p.slug}>
            <div className="flex h-full flex-col p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="label mb-2">
                    {p.kind}
                    {p.launch ? ` · ${p.launch.date}` : ""}
                  </p>
                  <h3 className="title text-[19px] lower">{p.name}</h3>
                </div>
                <StatusPill
                  tone={
                    p.status === "live"
                      ? "live"
                      : p.status === "sunset"
                        ? "neutral"
                        : "accent"
                  }
                >
                  {p.status}
                </StatusPill>
              </div>

              <p className="text-[14px] leading-relaxed text-muted">
                {p.summary}
              </p>

              {p.owned.length > 0 && (
                <div className="mt-4">
                  <p className="label mb-2">Surfaces I own</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.owned.map((o) => (
                      <li
                        key={o}
                        className="rounded-sm border border-line bg-bg-subtle px-2 py-1 font-mono text-[11px] text-dim"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto flex items-center gap-4 pt-6">
                <Link
                  href={`/work/${p.slug}`}
                  className="text-[13px] font-medium text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
                >
                  Read the build
                </Link>
                {p.status !== "building" && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[13px] text-dim transition-colors duration-fast ease-out hover:text-fg"
                  >
                    Visit
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
                    />
                  </a>
                )}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </ul>

      <div className="mt-10">
        <p className="label mb-4">Earlier experiments</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {experiments.map((e) => (
            <li key={e.name}>
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 rounded-lg border border-line bg-surface p-4 transition-[background-color,border-color] duration-slow ease-out hover:border-line-strong hover:bg-surface-hover"
              >
                <span>
                  <span className="title block text-[15px] lower">
                    {e.name}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-dim">
                    {e.summary}
                  </span>
                </span>
                <ArrowUpRight
                  size={15}
                  className="mt-0.5 shrink-0 text-dim transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
