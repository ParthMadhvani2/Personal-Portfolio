import { articles } from "../../../data/articles";
import { notes } from "../../../data/notes";
import { products } from "../../../data/products";
import { site, SITE_URL } from "../../../data/site";

export const dynamic = "force-static";

/**
 * Five characters that will silently corrupt a feed if they reach the XML raw.
 * Feed readers are unforgiving: one stray ampersand in a note and the whole
 * document fails to parse, not just the item that contains it.
 */
function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS requires RFC-822, not ISO. Readers that accept ISO are being generous. */
function rfc822(yyyymm: string) {
  const [y, m] = yyyymm.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, 1, 9)).toUTCString();
}

const productName = (slug: string | null) =>
  products.find((p) => p.slug === slug)?.name ?? null;

export function GET() {
  const longform = articles
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${esc(`${SITE_URL}/notes/${a.slug}`)}</link>
      <guid isPermaLink="true">${esc(`${SITE_URL}/notes/${a.slug}`)}</guid>
      <pubDate>${rfc822(a.date)}</pubDate>
      <description>${esc(a.summary)}</description>
${a.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const items = notes
    .map((n) => {
      const from = productName(n.from);
      const body = from ? `${n.body}\n\nFrom building ${from}.` : n.body;
      const url = `${SITE_URL}/notes#n${n.n}`;
      return `    <item>
      <title>${esc(n.title)}</title>
      <link>${esc(url)}</link>
      <!-- The anchor is the permalink, so the guid is stable across edits. -->
      <guid isPermaLink="true">${esc(url)}</guid>
      <pubDate>${rfc822(n.date)}</pubDate>
      <description>${esc(body)}</description>
${n.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const latest = notes[0]?.date ?? "2026-01";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`Notes · ${site.name}`)}</title>
    <link>${SITE_URL}/notes</link>
    <description>${esc(
      "Short observations from shipping SaaS products. Things that cost something to learn, mostly by getting them wrong first.",
    )}</description>
    <language>en</language>
    <managingEditor>${esc(`${site.email} (${site.name})`)}</managingEditor>
    <lastBuildDate>${rfc822(latest)}</lastBuildDate>
    <atom:link href="${SITE_URL}/notes/rss.xml" rel="self" type="application/rss+xml"/>
${longform}
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
