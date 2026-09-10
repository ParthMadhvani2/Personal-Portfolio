import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { site } from "../../data/site";
import { organicClicks, products } from "../../data/products";
import { StatusPill } from "../craft/status-pill";
import { AnimatedNumber } from "../craft/animated-number";
import Shelf from "./shelf";

const launched = products.filter((p) => p.launch).length;

const signal: { value: number; suffix?: string; label: string }[] = [
  { value: products.length, label: "products shipped" },
  { value: launched, label: "launched on Product Hunt in 2026" },
  { value: organicClicks, label: "organic search clicks in 90 days" },
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-content px-4 pb-4 pt-12 sm:px-6 sm:pt-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-14">
        <div>
          <div className="rise" style={{ ["--i" as string]: 0 }}>
            <StatusPill tone="live">Available · {site.location}</StatusPill>
          </div>

          <h1 className="display mt-6 text-[clamp(3rem,8.5vw,5.4rem)] lower">
            <span className="line-mask">
              <span style={{ ["--i" as string]: 1 }}>{site.name}</span>
            </span>
          </h1>

          <p className="mt-3 max-w-[24ch] text-[clamp(1.4rem,3.6vw,2.1rem)] leading-[1.12] text-muted">
            <span className="line-mask">
              <span className="editorial" style={{ ["--i" as string]: 2 }}>
                {site.tagline}
              </span>
            </span>
          </p>

          <div className="rise mt-6 space-y-4" style={{ ["--i" as string]: 3 }}>
            <p className="prose-body">
              I&apos;m a design engineer at{" "}
              <a
                href={site.employer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
              >
                {site.employer.name}
              </a>
              . I take a product from the messy version someone describes out
              loud to something in production: schema, API, interface, iOS app,
              billing, and the marketing site it launches behind.
            </p>
            <p className="prose-body">
              Most engineers stop at the API or the component. The interesting
              work is downstream of that: the webhook that must not
              double-charge, the PDF an inspector will read, the empty state
              nobody designed. That&apos;s the part I want.
            </p>
            <p className="prose-body">
              Four of them went out this year:{" "}
              <a
                href={site.social.productHunt}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
              >
                Embers, SnapCount, OutboundQA and Hood Cleaning Report
              </a>
              , all launched on Product Hunt between June and July.
            </p>
          </div>

          <div
            className="rise mt-8 flex flex-wrap items-center gap-3"
            style={{ ["--i" as string]: 4 }}
          >
            <a
              href={site.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-10 items-center gap-2 rounded-md bg-fg px-4 text-[14px] font-semibold text-bg shadow-sm transition-[transform,opacity] duration-fast ease-out hover:opacity-90 active:scale-[0.97]"
            >
              <CalendarDays size={15} strokeWidth={2.2} />
              Book a 30-min call
            </a>
            <Link
              href="/work"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-4 text-[14px] font-medium text-muted transition-[transform,color,background-color] duration-fast ease-out hover:bg-surface-hover hover:text-fg active:scale-[0.97]"
            >
              See the work
            </Link>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-10 items-center gap-1 px-1 text-[14px] text-dim transition-colors duration-fast ease-out hover:text-fg"
            >
              Résumé
              <ArrowUpRight
                size={14}
                className="transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
              />
            </a>
          </div>
        </div>

        {/* On a phone the name has to be the first thing on screen; a portrait
            filling the first viewport says nothing. */}
        <div
          className="rise order-last lg:order-none"
          style={{ ["--i" as string]: 1 }}
        >
          <div className="relative w-full max-w-[190px] sm:max-w-[240px] lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-bg-subtle">
              <Image
                src="/media/profile.jpg"
                alt={`${site.name}, ${site.role}`}
                fill
                sizes="(max-width: 640px) 190px, (max-width: 1024px) 240px, 340px"
                className="object-cover object-top"
                priority
              />
            </div>
            <p className="mono mt-3 text-[11px] text-dim">
              {site.education.degree} · {site.education.years}
            </p>
          </div>
        </div>
      </div>

      {/* The shelf: what he has actually shipped, as the products' own icons. */}
      <div className="mt-14">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <p className="label">Shipped</p>
          <p className="text-[12px] text-dim">five shipped · one slot open</p>
        </div>
        <Shelf />
      </div>

      {/* Signal row: three numbers the eye can land on before it reads a word. */}
      <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {signal.map((s, i) => (
          <div
            key={s.label}
            className={`bg-surface px-4 py-5 sm:px-5 ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <dt className="label mb-2">{String(i + 1).padStart(2, "0")}</dt>
            <dd>
              <span className="title block text-[26px] text-fg">
                <AnimatedNumber value={s.value} suffix={s.suffix} countUp />
              </span>
              <span className="mt-0.5 block text-[13px] text-dim">
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
