# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People deciding whether to hire or work with Parth Madhvani: founders and engineering leads hiring for design-engineer, product-engineer or founding-engineer roles, who arrive from LinkedIn, X, Product Hunt, Peerlist or a résumé link and give the site a minute or two.

Secondary: engineers and designers who land on a component or an article through search or a share, and may copy a component into their own product.

## Product Purpose

A personal portfolio that proves, rather than claims, that Parth takes a product from a messy problem to something in production across every layer: schema, API, interface, iOS app, billing, and the marketing site it launches behind.

Success is a visitor booking the 30-minute call or emailing, having seen enough real evidence to trust the claim.

## Positioning

Design engineer + product engineer who owns the whole product surface, not one layer of it. The differentiator is breadth that is demonstrated: five shipped SaaS products with their real icons, live screenshots, measured traffic, and working interaction components with their source.

## Operating Context

Visitors mostly arrive on a phone or laptop from a social profile, often in a hurry. The site doubles as a reference: `/crafts` components get copied, `/notes` and articles get shared and read in full.

## Capabilities and Constraints

- Next.js 14 App Router, TypeScript, Tailwind, fully token-driven, light and dark themes.
- No animation library; motion is CSS transitions plus one small in-house spring.
- Canonical host is env-driven via `NEXT_PUBLIC_SITE_URL`; `parthmadhvani.com` is not yet connected.
- Deployed on Vercel from `main`.
- The three long-form articles exist on the `parth-madhvani/portfolio-v3-redesign` branch but are **not merged to main** as of 2026-09-23.

## Brand Commitments

- Name: Parth Madhvani. Handle: `@parthmadhvani2`.
- Tagline, his own and carried from his LinkedIn banner: "From messy problem to working product."
- The mark is personal. It stands for Parth only and never has to front a studio or product line. Confirmed 2026-09-23.
- **The mark's initials must read**: a P or PM has to be recognisable in the symbol itself. Confirmed 2026-09-23.
- Voice: lowercase for display and UI labels, sentence case for prose; concrete nouns and numbers over adjectives.
- Rejects anything that reads as AI-generated, in copy or in visuals.
- No AI attribution anywhere in the repository or its PRs.

## Evidence on Hand

- Five products: Embers, Hood Cleaning Report, SnapCount, Diam Jewels (live); OutboundQA (sunset). Real icons in `public/brand/icons/`.
- Four launched on Product Hunt, June to July 2026.
- 5,224 organic search clicks over the 90 days to September 2026, from Google Search Console screenshots he supplied.
- Live-site screenshots in `public/shots/`; Diam Jewels blocks headless capture and has none.
- Fourteen interaction components with source in `components/craft/`.
- Fourteen short notes in `data/notes.ts`.
- Diam Jewels' owned surfaces, build detail and stack are unknown and deliberately left empty. Do not invent them.
- No testimonials, client quotes or press exist. Do not fabricate any.

## Product Principles

1. Prove, do not claim. Every assertion should have something the visitor can click, press or verify.
2. Hand-built over generated. If it could have come from a template, it is not done.
3. The artifact leads. Real products, real icons, real numbers carry the page; decoration serves them.
4. Honest about the arc. Sunset products and failures are shown as what they are.

## Accessibility & Inclusion

Accessibility is a stated personal interest ("coding accessibility" in his Peerlist bio). Respect reduced motion, reduced transparency and increased contrast; never carry meaning by colour alone; keep focus visible.
