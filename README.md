# Parth Madhvani · Portfolio

**Live:** [parthmadhvani2.vercel.app](https://parthmadhvani2.vercel.app)

From messy problem to working product. I take a product from the version
someone describes out loud to something in production: schema, API, interface,
iOS app, billing, and the marketing site it launches behind.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero, the product shelf, an interactive map of the layers I own, live components, stack, timeline |
| `/work` · `/work/[slug]` | A build write-up per product, opening with a screenshot of the live site |
| `/crafts` | Fifteen interaction components with their real source, read from disk at build time |
| `/notes` | Numbered, tag-filtered observations from shipping, plus long-form articles |
| `/notes/[slug]` | Articles with live interactive demos inline |
| `/colophon` | Every design decision on the site, including the maths |
| `/tech-i-know` | The stack, grouped by depth rather than breadth |
| `/resume` | One page, with a PDF that downloads |

## Products

- **[Embers](https://useembers.com)** · LinkedIn engagement turned into ranked warm leads
- **[Hood Cleaning Report](https://hoodcleaningreport.com)** · NFPA 96 compliance reports for kitchen exhaust contractors
- **[SnapCount](https://snapcount.app)** · Real-time multiplayer tally counter, iOS and web
- **[Diam Jewels](https://diam-jewels.leadcatalyst.in)** · Inventory and accounting for jewellers
- **OutboundQA** · Cold email infrastructure QA. Shipped, launched, sunset.

Four launched on [Product Hunt](https://www.producthunt.com/@parth_madhvani)
between June and July 2026.

## `components/craft`

The interaction components this site is built from, kept portable on purpose.
React, `lucide-react`, and a two-line `cn` helper. No animation library.

See [components/craft/README.md](components/craft/README.md) for the full list,
the token contract, and how to adopt one.

## Design system

Colours are raw `R G B` channels in CSS custom properties so Tailwind's alpha
modifier resolves. Three type registers, each with a job: Instrument Serif for
display, Geist for the interface, Geist Mono for labels and numbers. All
self-hosted, latin subset, 81 KB.

Every decision is written up at [/colophon](https://parthmadhvani2.vercel.app/colophon).

## Running it

```bash
pnpm install
pnpm dev
```

`pnpm build` · `pnpm lint` · `npx tsc --noEmit`

## Responsive testing

`public/_resp.html` loads every page in an iframe at ten widths from 320 to
1920 and reports horizontal overflow, which is the failure that actually breaks
a layout.

```
open http://localhost:3000/_resp.html
> await runAudit()
```

An empty array is a pass. It is noindexed and disallowed in robots.

## Machine-readable

| Path | What it is |
| --- | --- |
| `/notes/rss.xml` | RSS 2.0 feed of the notes, generated from the same data the page renders from. Auto-discoverable from every page. |
| `/llms.txt` | Site structure and quotable facts for language models, per the [llmstxt.org](https://llmstxt.org) convention. Generated, so it cannot go stale. |
| `/sitemap.xml`, `/robots.txt` | Generated from the route and product data. |

## Configuration

`NEXT_PUBLIC_SITE_URL` sets the canonical host for every canonical tag, OG URL,
JSON-LD `@id` and sitemap entry. It defaults to the Vercel URL. **Set it in
Vercel the moment a custom domain is connected**, or canonicals keep pointing at
the old host.

## Brand assets

Generated from this codebase rather than exported from a design tool, so they
cannot drift from the tokens.

- `/brand/linkedin.png` · 1584 × 396
- `/brand/x.png` · 1500 × 500
- `/media/mark.svg` · the mark, display cut
- `/media/mark-small.svg` · favicon cut, heavier stem and a larger counter

Downloadable from [/colophon](https://parthmadhvani2.vercel.app/colophon).

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind, fully token-driven, light and
dark · zero animation dependencies · OG cards generated at build with `next/og`

## Contact

[Email](mailto:madhvaniparth2@gmail.com) ·
[Book a call](https://cal.com/parth-madhvani-pjulld/30min) ·
[LinkedIn](https://www.linkedin.com/in/parthmadhvani2) ·
[X](https://x.com/parthmadhvani2) ·
[Peerlist](https://peerlist.io/parthmadhvani2) ·
[GitHub](https://github.com/ParthMadhvani2)
