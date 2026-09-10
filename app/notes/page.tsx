import type { Metadata } from "next";
import { notes } from "../../data/notes";
import { site, SITE_URL } from "../../data/site";
import { StatusPill } from "../../components/craft/status-pill";
import NotesList from "../../components/site/notes-list";

const title = "Notes — things shipping taught me";
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

      <StatusPill tone="accent">{notes.length} notes</StatusPill>
      <h1 className="display mt-6 text-[clamp(2.2rem,6vw,3.6rem)] lower">
        notes
      </h1>
      <p className="prose-body mt-5">
        Collections like this usually catalogue details spotted in other
        people&apos;s products. These are from mine — things that cost something
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

      <NotesList />
    </div>
  );
}
