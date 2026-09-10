# Parth Madhvani · Portfolio

**Live:** [parthmadhvani2.vercel.app](https://parthmadhvani2.vercel.app)

From messy problem to working product. I take a product from the version someone
describes out loud to something in production: schema, API, interface, iOS app,
billing, and the marketing site it launches behind.

## What's in here

| Route                    | What it is                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `/`                      | Hero, product grid, an interactive map of the layers I own, live components, stack, timeline |
| `/work` · `/work/[slug]` | A build write-up per product: the problem, what I owned, the decisions                       |
| `/crafts`                | Ten interaction components with their real source, read from disk at build time              |
| `/tech-i-know`           | The stack, grouped by depth rather than breadth                                              |
| `/resume`                | One page, with a PDF that actually downloads                                                 |

## The products

- **[Embers](https://useembers.com)** · LinkedIn engagement turned into ranked warm leads. Scoring engine, ICP classifier, dashboard, billing, marketing.
- **[Hood Cleaning Report](https://hoodcleaningreport.com)** · NFPA 96 compliance reports for kitchen exhaust contractors. CompanyCam OAuth, document vault, PDF pipeline.
- **[SnapCount](https://snapcount.app)** · Real-time multiplayer tally counter, iOS and web. Expo on the new architecture, SSE sync, five-language marketing site.
- **OutboundQA** · The fourth. Write-up pending.

## `components/craft`

The interaction components this site is built from, kept portable on purpose.
Each file depends on React, `lucide-react` for icons, and a two-line `cn`
helper. No animation library, no headless-UI package, no context to wire up.
Colours resolve to CSS custom properties, so adopting one means copying the file
and pointing about six variables at your own tokens. MIT.

`CopyButton` · `Tooltip` · `SegmentedControl` · `AnimatedNumber` ·
`HoldToConfirm` · `Sheet` · `SpotlightCard` · `Marquee` · `StatusPill` ·
`ThemeToggle`, plus `useSpring`, a small interruptible spring with Apple's
momentum projection and rubber-banding helpers.

Every component carries a comment explaining the principle behind its timing
rather than just what it does. See them running at
[/crafts](https://parthmadhvani2.vercel.app/crafts).

## Running it

```bash
pnpm install
pnpm dev
```

## Configuration

`NEXT_PUBLIC_SITE_URL` sets the canonical host for every canonical tag, OG URL,
JSON-LD `@id` and sitemap entry. It defaults to the Vercel URL. **Set it in
Vercel the moment a custom domain is connected.** Otherwise canonicals keep
pointing at the old host.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind (fully token-driven, light and
dark) · zero animation dependencies · OG cards generated at build with
`next/og`.

## Contact

[Email](mailto:madhvaniparth2@gmail.com) ·
[Book a call](https://cal.com/parth-madhvani-pjulld/30min) ·
[LinkedIn](https://www.linkedin.com/in/parthmadhvani2) ·
[X](https://x.com/parthmadhvani2) ·
[GitHub](https://github.com/ParthMadhvani2)
