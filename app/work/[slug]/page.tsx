import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { products, productBySlug } from "../../../data/products";
import { site, SITE_URL } from "../../../data/site";
import { StatusPill } from "../../../components/craft/status-pill";
import { AnimatedNumber } from "../../../components/craft/animated-number";

type Params = { params: { slug: string } };

// Every case study is a static page at build time — one URL per product is four
// more things that can rank, each targeting its own long tail.
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = productBySlug(params.slug);
  if (!p) return {};
  const title = `${p.name} — ${p.kind}`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${title} · ${site.name}`,
      description: p.summary,
      url: `${SITE_URL}/work/${p.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description: p.summary },
  };
}

export default function CaseStudy({ params }: Params) {
  const p = productBySlug(params.slug);
  if (!p) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${SITE_URL}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.name,
        item: `${SITE_URL}/work/${p.slug}`,
      },
    ],
  };

  const others = products.filter((o) => o.slug !== p.slug);

  return (
    <article className="mx-auto max-w-content px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <nav aria-label="Breadcrumb" className="pt-10">
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-[13px] text-dim transition-colors duration-fast ease-out hover:text-fg"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-fast ease-out group-hover:-translate-x-0.5"
          />
          All work
        </Link>
      </nav>

      <header className="max-w-prose pt-8">
        <div className="flex flex-wrap items-center gap-2">
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
          <span className="mono text-[11px] uppercase tracking-[0.08em] text-dim">
            {p.kind}
          </span>
        </div>

        <h1 className="display mt-5 text-[clamp(2.2rem,6vw,3.4rem)] lower">
          {p.name}
        </h1>
        <p className="mt-4 text-[19px] leading-snug text-muted">{p.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {p.status !== "building" && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-4 text-[14px] font-medium text-fg transition-[transform,background-color] duration-fast ease-out hover:bg-surface-hover active:scale-[0.97]"
            >
              {new URL(p.url).hostname.replace("www.", "")}
              <ArrowUpRight
                size={15}
                className="transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
              />
            </a>
          )}
          {p.launch && (
            <a
              href={`https://www.producthunt.com/products/${p.launch.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-10 items-center gap-1.5 px-1 text-[13px] text-dim transition-colors duration-fast ease-out hover:text-fg"
            >
              Launched on Product Hunt, {p.launch.date}
              <ArrowUpRight
                size={13}
                className="transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
              />
            </a>
          )}
        </div>
      </header>

      {/* Column count follows the data. A fixed 3-up leaves an empty cell that
          reads as a missing value rather than a design choice. */}
      {p.figures?.length ? (
        <dl
          className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line"
          style={{
            gridTemplateColumns: `repeat(${p.figures.length}, minmax(0, 1fr))`,
          }}
        >
          {p.figures.map((f) => (
            <div key={f.label} className="bg-surface px-4 py-5">
              <dd className="title text-[26px] text-fg">
                <AnimatedNumber
                  value={f.value}
                  prefix={f.prefix}
                  suffix={f.suffix}
                />
              </dd>
              <dt className="mt-1 text-[13px] text-dim">{f.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}

      <section className="mt-14 max-w-prose">
        <h2 className="label mb-4">The problem</h2>
        <p className="text-[17px] leading-relaxed text-muted">{p.problem}</p>
      </section>

      {p.owned.length > 0 && (
        <section className="mt-12">
          <h2 className="label mb-4">What I owned</h2>
          <ul className="flex flex-wrap gap-2">
            {p.owned.map((o) => (
              <li
                key={o}
                className="rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] text-muted"
              >
                {o}
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.build.length > 0 && (
        <section className="mt-14">
          <h2 className="label mb-6">How it works</h2>
          <ol className="divide-y divide-line border-y border-line">
            {p.build.map((b, i) => (
              <li
                key={b.title}
                className="grid gap-2 py-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8"
              >
                <span className="mono pt-1 text-[11px] text-dim tnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="title text-[17px]">{b.title}</h3>
                  <p className="prose-body mt-2 text-[15px]">{b.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.epilogue ? (
        <section className="mt-14 max-w-prose">
          <h2 className="label mb-4">What happened next</h2>
          <p className="border-l-2 border-line-strong pl-4 text-[16px] leading-relaxed text-muted">
            {p.epilogue}
          </p>
        </section>
      ) : null}

      {p.stack.length > 0 && (
        <section className="mt-12">
          <h2 className="label mb-4">Stack</h2>
          <ul className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li
                key={s}
                className="rounded-sm border border-line bg-bg-subtle px-2.5 py-1.5 font-mono text-[12px] text-dim"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="Other work" className="mt-20 border-t border-line pt-8">
        <p className="label mb-4">Other work</p>
        <ul className="grid gap-2 sm:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/work/${o.slug}`}
                className="group flex items-center justify-between gap-3 rounded-md border border-line bg-surface px-4 py-3 transition-[background-color,border-color] duration-fast ease-out hover:border-line-strong hover:bg-surface-hover"
              >
                <span className="text-[14px] font-medium lower">{o.name}</span>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 text-dim transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
