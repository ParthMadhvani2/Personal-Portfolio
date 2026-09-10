import type { Metadata } from "next";
import { articles } from "../../data/articles";
import { notes } from "../../data/notes";
import { site, SITE_URL } from "../../data/site";
import { Rss } from "lucide-react";
import { StatusPill } from "../../components/craft/status-pill";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NotesList from "../../components/site/notes-list";

const title = "Notes: things shipping taught me";
const description =
  "Short observations from building four SaaS products: idempotent webhooks, why SSE beat sockets, why fifteen green ticks is homework, and why quarterly tools do not retain.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/notes" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${SITE_URL}/notes`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title, description },
};

/**
 * Each note is exposed as its own structured item so the collection is legible
 * to a crawler as a list of distinct observations rather than one long page.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/notes#blog`,
  name: title,
  description,
  url: `${SITE_URL}/notes`,
  author: { "@id": `${SITE_URL}/#person` },
  blogPost: notes.map((n) => ({
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/notes#n${n.n}`,
    headline: n.title,
    articleBody: n.body,
    keywords: n.tags.join(", "),
    datePublished: `${n.date}-01`,
    author: { "@id": `${SITE_URL}/#person` },
  })),
};

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-content px-4 pb-4 pt-12 sm:px-6 sm:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-wrap items-center gap-3">
        <StatusPill tone="accent">{notes.length} notes</StatusPill>
        <a
          href="/notes/rss.xml"
          className="group inline-flex items-center gap-1.5 text-[12px] text-dim transition-colors duration-fast ease-out hover:text-fg"
        >
          <Rss size={13} />
          RSS
        </a>
      </div>
      <h1 className="display mt-6 text-[clamp(2.2rem,6vw,3.6rem)] lower">
        notes
      </h1>
      <p className="prose-body mt-5">
        Collections like this usually catalogue details spotted in other
        people&apos;s products. These are from mine. Things that cost something
        to learn, mostly by getting them wrong first, while shipping four SaaS
        products in a year.
      </p>
      <p className="prose-body mt-3">
        Three sentences each. If it needs more than that, it is a{" "}
        <a
          href="/work"
          className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
        >
          build write-up
        </a>
        , not a note.
      </p>

      {articles.length > 0 ? (
        <section className="mt-12">
          <p className="label mb-4">Longer pieces</p>
          <ul className="grid gap-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/notes/${a.slug}`}
                  className="group flex items-start justify-between gap-5 rounded-lg border border-line bg-surface p-5 transition-[background-color,border-color] duration-slow ease-out hover:border-line-strong hover:bg-surface-hover"
                >
                  <span className="min-w-0">
                    <span className="title block text-[17px]">{a.title}</span>
                    <span className="prose-body mt-1.5 block text-[14px]">
                      {a.summary}
                    </span>
                    <span className="mono mt-3 block text-[11px] text-dim">
                      {a.date} · {a.read} min ·{" "}
                      {a.tags.map((t) => `#${t}`).join(" ")}
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    className="mt-1 shrink-0 text-dim transition-transform duration-fast ease-out group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <NotesList />
    </div>
  );
}
