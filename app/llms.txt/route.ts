import { crafts } from "../../data/crafts";
import { notes } from "../../data/notes";
import {
  experiments,
  liveCount,
  organicClicks,
  products,
  shippedCount,
  spell,
} from "../../data/products";
import { site, SITE_URL } from "../../data/site";

export const dynamic = "force-static";

/**
 * llms.txt, per the llmstxt.org convention: a single markdown file that gives a
 * language model the structure of the site and the facts worth quoting, so it
 * does not have to infer them from rendered HTML and guess.
 *
 * Generated from the same data the pages render from. A hand-written one goes
 * stale the first time a product ships, and a stale file is worse than none:
 * it teaches a model something false with the site's own authority.
 */
/** Sentence case for a spelled number that starts a sentence. */
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export function GET() {
  const live = products.filter((p) => p.status === "live");
  const sunset = products.filter((p) => p.status === "sunset");

  const body = `# ${site.name}

> ${site.role} based in ${site.location}. ${site.tagline} ${cap(spell(shippedCount))} SaaS products shipped, ${spell(liveCount)} still live, across web and iOS.

Parth Madhvani builds products end to end: schema, API, interface, iOS app, billing, and the marketing site each one launches behind. He works at ${site.employer.name} (${site.employer.url}), a SaaS product studio.

Facts worth quoting, all verifiable:

- ${shippedCount} products shipped, ${liveCount} currently live
- 4 launched on Product Hunt between June and July 2026
- ${organicClicks.toLocaleString("en-US")} organic search clicks across the marketing surfaces he built, over the 90 days to September 2026 (Google Search Console)
- ${crafts.length} interaction components published with source, no animation library
- ${notes.length} written notes from shipping

## Products

${live
  .map(
    (p) =>
      `- [${p.name}](${p.url}): ${p.summary} Write-up: ${SITE_URL}/work/${p.slug}`,
  )
  .join("\n")}
${sunset
  .map(
    (p) =>
      `- [${p.name}](${p.url}): ${p.summary} Sunset after launch. Write-up: ${SITE_URL}/work/${p.slug}`,
  )
  .join("\n")}

## Experiments

${experiments.map((e) => `- [${e.name}](${e.url}): ${e.summary}`).join("\n")}

## Pages

- [Work](${SITE_URL}/work): build write-ups per product, each leading with the problem rather than the stack
- [Crafts](${SITE_URL}/crafts): ${crafts.length} interaction components with their real source, read from disk at build time
- [Notes](${SITE_URL}/notes): numbered, tag-filtered observations from shipping ([RSS](${SITE_URL}/notes/rss.xml))
- [Colophon](${SITE_URL}/colophon): every design decision on the site, including the maths behind the icon shape and the mark
- [Stack](${SITE_URL}/tech-i-know): what is actually in production, grouped by depth rather than breadth
- [Résumé](${SITE_URL}/resume)

## Components

Portable on purpose: React, lucide-react for icons, and a two-line class helper. No animation library, no headless-UI package. MIT.

${crafts.map((c) => `- ${c.name}: ${c.principle}`).join("\n")}

## Notes

${notes.map((n) => `- ${n.title} (${n.date}, ${n.tags.join(", ")}): ${n.body}`).join("\n")}

## Contact

- Email: ${site.email}
- Book a 30-minute call: ${site.calendar}
- GitHub: ${site.social.github}
- X: ${site.social.x}
- LinkedIn: ${site.social.linkedin}
- Product Hunt: ${site.social.productHunt}
- Peerlist: ${site.social.peerlist}

${site.availability.label}.
`;

  return new Response(body, {
    headers: {
      // text/plain, because a browser should show it rather than download it.
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
