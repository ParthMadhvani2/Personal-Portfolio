import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  notes,
  noteDescription,
  noteFromSlug,
  noteHref,
  noteSlug,
  relatedNotes,
} from "../../../data/notes";
import { productBySlug } from "../../../data/products";
import { site, SITE_URL } from "../../../data/site";
import { StatusPill } from "../../../components/craft/status-pill";

// Next 15 passes route params as a promise.
type Params = { params: Promise<{ slug: string }> };

// One static page per note, so each lesson can rank for its own search instead
// of sharing a single URL with thirteen others.
export function generateStaticParams() {
  return notes.map((n) => ({ slug: noteSlug(n) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const note = noteFromSlug((await params).slug);
  if (!note) return {};
  const description = noteDescription(note);
  return {
    title: note.title,
    description,
    alternates: { canonical: noteHref(note) },
    openGraph: {
      title: `${note.title} · ${site.name}`,
      description,
      url: `${SITE_URL}${noteHref(note)}`,
      type: "article",
      publishedTime: `${note.date}-01`,
      authors: [site.name],
      tags: note.tags,
    },
    twitter: { card: "summary_large_image", title: note.title, description },
  };
}

const pill =
  "group inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-surface px-3.5 text-[13px] font-medium text-fg transition-[transform,background-color] duration-fast ease-out hover:bg-surface-hover active:scale-[0.97]";

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const note = noteFromSlug(slug);
  if (!note) notFound();
  // An old or shortened slug still works, but only one URL gets indexed.
  if (slug !== noteSlug(note)) permanentRedirect(noteHref(note));

  const product = note.from ? productBySlug(note.from) : undefined;
  const related = relatedNotes(note);
  const older = notes.find((n) => n.n === note.n - 1);
  const newer = notes.find((n) => n.n === note.n + 1);
  const url = `${SITE_URL}${noteHref(note)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: note.title,
        description: noteDescription(note),
        articleBody: note.body,
        keywords: note.tags.join(", "),
        datePublished: `${note.date}-01`,
        url,
        mainEntityOfPage: url,
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/notes#blog` },
        ...(product
          ? { about: { "@id": `${SITE_URL}/work/${product.slug}#app` } }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Notes",
            item: `${SITE_URL}/notes`,
          },
          { "@type": "ListItem", position: 3, name: note.title, item: url },
        ],
      },
    ],
  };

  return (
    <article className="mx-auto max-w-content px-4 sm:px-6">
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

      <header className="max-w-prose pt-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <StatusPill tone="accent">
            Note {String(note.n).padStart(2, "0")}
          </StatusPill>
          <time
            dateTime={note.date}
            className="mono text-[11px] uppercase tracking-[0.08em] text-dim tnum"
          >
            {note.date}
          </time>
          {note.tags.map((t) => (
            <span key={t} className="mono text-[11px] text-dim">
              #{t}
            </span>
          ))}
        </div>
        {/* Sentence case, unlike the lowercase page titles: these are claims,
            and they carry proper nouns (DNS, SSE, PDF) that must keep their capitals. */}
        <h1 className="display mt-6 text-[clamp(1.85rem,4.4vw,2.75rem)]">
          {note.title}
        </h1>
      </header>

      <p className="prose-body mt-6 max-w-prose text-[18px] leading-[1.7] text-fg/85">
        {note.body}
      </p>

      {product ? (
        <aside className="mt-12 max-w-prose rounded-lg border border-line bg-surface p-5">
          <div className="flex items-center gap-3">
            {product.icon ? (
              <Image
                src={product.icon}
                alt=""
                width={36}
                height={36}
                className="rounded-[9px] ring-1 ring-line-strong"
              />
            ) : null}
            <div className="min-w-0">
              <p className="label">Learned building</p>
              <p className="mt-1.5 text-[15px] font-medium text-fg">
                {product.name}
              </p>
            </div>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            {product.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/work/${product.slug}`} className={pill}>
              Read the build
              <ArrowRight
                size={14}
                className="transition-transform duration-fast ease-out group-hover:translate-x-0.5"
              />
            </Link>
            {product.status === "live" ? (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className={pill}
              >
                {new URL(product.url).hostname.replace("www.", "")}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
                />
              </a>
            ) : null}
            {product.appStore ? (
              <a
                href={product.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className={pill}
              >
                App Store
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
                />
              </a>
            ) : null}
          </div>
        </aside>
      ) : null}

      {related.length > 0 ? (
        <section className="mt-14 max-w-prose">
          <h2 className="label mb-4">Related notes</h2>
          <ol className="divide-y divide-line border-y border-line">
            {related.map((r) => (
              <li key={r.n}>
                <Link
                  href={noteHref(r)}
                  className="group grid grid-cols-[auto_minmax(0,1fr)] gap-5 py-4 transition-colors duration-fast ease-out"
                >
                  <span className="mono pt-0.5 text-[12px] text-dim tnum">
                    {String(r.n).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium text-fg underline decoration-transparent underline-offset-4 transition-colors duration-fast ease-out group-hover:decoration-accent">
                    {r.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <nav
        aria-label="More notes"
        className="mt-16 grid gap-2 border-t border-line pt-8 sm:grid-cols-2"
      >
        {older ? (
          <Link
            href={noteHref(older)}
            className="group rounded-md border border-line bg-surface px-4 py-3 transition-[background-color,border-color] duration-fast ease-out hover:border-line-strong hover:bg-surface-hover"
          >
            <span className="label">
              Older · {String(older.n).padStart(2, "0")}
            </span>
            <span className="mt-2 block text-[14px] font-medium text-fg">
              {older.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link
            href={noteHref(newer)}
            className="group rounded-md border border-line bg-surface px-4 py-3 text-right transition-[background-color,border-color] duration-fast ease-out hover:border-line-strong hover:bg-surface-hover"
          >
            <span className="label">
              Newer · {String(newer.n).padStart(2, "0")}
            </span>
            <span className="mt-2 block text-[14px] font-medium text-fg">
              {newer.title}
            </span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
