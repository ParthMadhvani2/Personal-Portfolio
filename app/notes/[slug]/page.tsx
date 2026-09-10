import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { articles, articleBySlug, type Block } from "../../../data/articles";
import { site, SITE_URL } from "../../../data/site";
import ArticleDemo from "../../../components/site/article-demos";
import CodeBlock from "../../../components/site/code-block";
import { StatusPill } from "../../../components/craft/status-pill";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const a = articleBySlug(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/notes/${a.slug}` },
    openGraph: {
      title: `${a.title} · ${site.name}`,
      description: a.summary,
      url: `${SITE_URL}/notes/${a.slug}`,
      type: "article",
      publishedTime: `${a.date}-01`,
      tags: [...a.tags],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.summary,
    },
  };
}

/**
 * Inline formatting, deliberately tiny: backticks for code and nothing else.
 * A full markdown parser is 40kB to render four kinds of emphasis I do not use,
 * and every extra feature is another way for prose to render wrong.
 */
function Inline({ s }: { s: string }) {
  const parts = s.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("`") && p.endsWith("`") ? (
          <code
            key={i}
            className="mono rounded-[4px] border border-line bg-bg-subtle px-1 py-0.5 text-[0.88em] text-fg"
          >
            {p.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return (
              <h2 key={i} className="title mt-14 text-[20px] first:mt-0">
                {b.s}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="prose-body mt-5 text-[16.5px]">
                <Inline s={b.s} />
              </p>
            );
          case "aside":
            return (
              <p
                key={i}
                className="mt-6 border-l-2 border-accent/40 pl-4 text-[15px] italic leading-relaxed text-dim"
              >
                <Inline s={b.s} />
              </p>
            );
          case "code":
            return (
              <div key={i} className="mt-6">
                <CodeBlock filename={b.file ?? "example.ts"} code={b.s} />
              </div>
            );
          case "demo":
            return (
              <figure key={i} className="mt-8">
                {/* The demo is the argument. It gets the full content width and
                    room to breathe, not a thumbnail beside the paragraph. */}
                <div className="flex min-h-[240px] items-center justify-center rounded-lg border border-line bg-bg-subtle px-5 py-10">
                  <ArticleDemo id={b.id} />
                </div>
                {b.caption ? (
                  <figcaption className="mt-3 text-[13px] leading-relaxed text-dim">
                    {b.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
        }
      })}
    </>
  );
}

export default function ArticlePage({ params }: Params) {
  const a = articleBySlug(params.slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/notes/${a.slug}#article`,
    headline: a.title,
    description: a.summary,
    datePublished: `${a.date}-01`,
    keywords: a.tags.join(", "),
    author: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: `${SITE_URL}/notes/${a.slug}`,
  };

  return (
    <article className="mx-auto max-w-content px-4 pb-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="pt-10">
        <Link
          href="/notes"
          className="group inline-flex items-center gap-1.5 text-[13px] text-dim transition-colors duration-fast ease-out hover:text-fg"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-fast ease-out group-hover:-translate-x-0.5"
          />
          All notes
        </Link>
      </nav>

      {/* Measure, not container width. Long-form wants ~68ch and nothing else
          on the page competing with it. */}
      <div className="mx-auto max-w-prose">
        <header className="pt-8">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill tone="accent">Article</StatusPill>
            <span className="mono text-[11px] uppercase tracking-[0.08em] text-dim">
              {a.date} · {a.read} min
            </span>
          </div>
          <h1 className="display mt-5 text-[clamp(2rem,4.6vw,3rem)] lower">
            {a.title}
          </h1>
          <p className="mt-4 text-[18px] leading-snug text-muted">
            {a.summary}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {a.tags.map((t) => (
              <li key={t} className="mono text-[11px] text-dim">
                #{t}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-12 border-t border-line pt-10">
          <Blocks blocks={a.blocks} />
        </div>

        <footer className="mt-16 border-t border-line pt-8">
          <p className="prose-body text-[15px]">
            The component this is about lives in{" "}
            <Link
              href="/crafts#squircle"
              className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
            >
              the library
            </Link>
            , with its source. If you disagree with any of it I would like to
            hear why:{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
            >
              {site.email}
            </a>
            .
          </p>
        </footer>
      </div>
    </article>
  );
}
