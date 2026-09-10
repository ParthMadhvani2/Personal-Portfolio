export type Product = {
  slug: string;
  name: string;
  /** One line. What it is, for whom. No adjectives. */
  summary: string;
  url: string;
  status: "live" | "building" | "sunset";
  /** Path to the product's real app icon in /public/brand/icons. */
  icon?: string;
  /** Screenshot of the live site, captured headless from the real URL. */
  shot?: string;
  /** Category shown as an eyebrow. */
  kind: string;
  year: string;
  /** What was actually hard, stated plainly. */
  problem: string;
  /** Owned surfaces: the reason this reads as product work, not ticket work. */
  owned: string[];
  /** Specific engineering decisions. Nouns and constraints, not claims. */
  build: { title: string; detail: string }[];
  stack: string[];
  /** Small figures the eye can land on. Counts, not invented percentages. */
  figures?: {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
  }[];
  /** Product Hunt launch: month, and the slug on his maker profile. */
  launch?: { date: string; slug: string };
  /** For retired products: what happened and what it taught. */
  epilogue?: string;
};

export const products: Product[] = [
  {
    slug: "embers",
    shot: "/shots/embers.png",
    icon: "/brand/icons/embers.png",
    name: "Embers",
    summary:
      "Turns LinkedIn engagement into a ranked queue of warm leads for founders and ghostwriters.",
    url: "https://useembers.com",
    status: "live",
    kind: "LinkedIn lead pipeline",
    year: "2026",
    problem:
      "People who post on LinkedIn get engagement they can't act on. The likes and comments are the warmest signal they will ever get, and they sit in a notification list that decays in a day. Reading them by hand does not scale past a couple of posts a week.",
    owned: [
      "Scoring engine",
      "ICP classifier",
      "Dashboard",
      "Billing",
      "Marketing site",
    ],
    build: [
      {
        title: "Hourly scrape, normalised",
        detail:
          "Apify actors run on a schedule and land raw engagement in Postgres through a normalisation layer, so a change in LinkedIn's shape is one adapter to fix rather than a migration.",
      },
      {
        title: "Scoring across five dimensions",
        detail:
          "A lead's rank comes from engagement recency, frequency, comment intent, title match and company size. Every row carries the reason it scored what it did. A number with no explanation is a number nobody trusts.",
      },
      {
        title: "ICP matching across seven dimensions",
        detail:
          "OpenAI structured outputs classify each profile against the user's stated ICP. Prompts are built to be cheap per row, because this runs over every engager on every post.",
      },
      {
        title: "Voice-matched DM drafts",
        detail:
          "Drafts are generated against samples of the user's own writing, so the message that goes out sounds like them and not like a template.",
      },
      {
        title: "Five-tier billing",
        detail:
          "Dodo Payments with webhook signature verification and idempotent handlers, so a retried webhook cannot double-provision a plan.",
      },
    ],
    stack: [
      "Django 5",
      "DRF",
      "Celery",
      "Redis",
      "PostgreSQL",
      "OpenAI",
      "Apify",
      "React 19",
      "TanStack Start",
      "Cloudflare Workers",
      "Dodo Payments",
    ],
    figures: [
      { value: 2975, label: "organic search clicks, 90 days" },
      { value: 7, label: "ICP dimensions" },
      { value: 5, label: "billing tiers" },
    ],
    launch: { date: "June 2026", slug: "embers" },
  },
  {
    slug: "hood-cleaning-report",
    shot: "/shots/hood-cleaning-report.png",
    icon: "/brand/icons/hoodcleaningreport.png",
    name: "Hood Cleaning Report",
    summary:
      "NFPA 96 compliance reports for commercial kitchen exhaust contractors.",
    url: "https://hoodcleaningreport.com",
    status: "live",
    kind: "Compliance SaaS",
    year: "2026",
    problem:
      "A hood cleaning crew finishes a job and owes the client an inspection-ready report with before and after photos, measurements and a signature. Most of them assemble it by hand from a phone camera roll, or pay a VA to retype it. The report is the deliverable the whole job is billed against, and it is the part nobody has time for.",
    owned: [
      "Multi-tenant backend",
      "CompanyCam integration",
      "Document vault",
      "PDF pipeline",
      "Field drafting",
    ],
    build: [
      {
        title: "CompanyCam OAuth, encrypted at rest",
        detail:
          "Third-party tokens are Fernet-encrypted in the database and webhooks are verified with HMAC-SHA1. Photos arrive from the crew's existing tool, so nobody has to change how they shoot a job.",
      },
      {
        title: "Document vault with signed share URLs",
        detail:
          "Reports go out as expiring signed links rather than attachments, and every view is written to an audit log, which is the part that matters when an inspector asks who saw what and when.",
      },
      {
        title: "AI drafts the compliance fields",
        detail:
          "The imported photo set is used to draft the NFPA 96 and ANSI-IKECA C10 fields, which the technician reviews rather than types. The review step is not optional: this is a document an inspector reads, so a wrong field is worse than an empty one.",
      },
      {
        title: "Block-based PDF generation",
        detail:
          "Reports are composed from typed blocks and rendered through Playwright, so the layout is real HTML and CSS rather than a coordinate-pushing PDF library.",
      },
      {
        title: "Multi-tenant from the first migration",
        detail:
          "Workspaces, roles and soft deletes were in the schema before the first customer, because retrofitting tenancy onto a live compliance product is not a weekend.",
      },
    ],
    stack: [
      "Django 5",
      "DRF",
      "PostgreSQL",
      "Playwright",
      "Cloudflare R2",
      "CompanyCam API",
      "React",
      "Tailwind v4",
    ],
    figures: [
      { value: 64, label: "organic search clicks, 90 days" },
      { value: 2, label: "compliance standards covered" },
    ],
    launch: { date: "July 2026", slug: "hoodcleaningreport" },
  },
  {
    slug: "snapcount",
    shot: "/shots/snapcount.png",
    icon: "/brand/icons/snapcount.png",
    name: "SnapCount",
    summary: "Real-time multiplayer tally counter for iOS and the web.",
    url: "https://snapcount.app",
    status: "live",
    kind: "iOS + web app",
    year: "2026",
    problem:
      "Counting things with other people is a genuinely shared task (door counts, wine inventory, reps, scores), and every tally app on the store assumes one person and one device. The moment a second person helps, you are reconciling two numbers by shouting across a room.",
    owned: ["iOS app", "Sync layer", "Web app", "Marketing site"],
    build: [
      {
        title: "Expo SDK 53 on the new architecture",
        detail:
          "TurboModules and Hermes, with iOS accessibility hooks wired from the start: the app reads Reduce Motion and Reduce Transparency rather than assuming everyone wants the animation.",
      },
      {
        title: "Server-sent events for sync",
        detail:
          "Counts propagate over SSE on an Express backend. SSE rather than sockets because the traffic is one-directional and the reconnect story is free.",
      },
      {
        title: "Guests join with a link",
        detail:
          "No account, no install. The person you handed the clipboard to should not have to sign up first. An onboarding wall on a shared counter is the reason the second device never gets used.",
      },
      {
        title: "Data you can take with you",
        detail:
          "Groups, goals, full activity history, and CSV and JSON export, with ready-made templates for events, wine inventory, sports and church. Billing is pay-once lifetime rather than a subscription, which is the right shape for a tool someone reaches for a few times a month.",
      },
      {
        title: "Edge-rendered web app",
        detail:
          "TanStack Start on Cloudflare Workers, so the web counter opens at the same speed anywhere the iOS app is used.",
      },
      {
        title: "Marketing site built for search",
        detail:
          "Five languages, free standalone SEO tools as the top of funnel, programmatic landing pages per vertical, and a sitemap generated from the routes rather than maintained by hand.",
      },
    ],
    stack: [
      "Expo SDK 53",
      "React Native 0.79",
      "TurboModules",
      "Express",
      "SSE",
      "TanStack Start",
      "Cloudflare Workers",
    ],
    figures: [
      { value: 2185, label: "organic search clicks, 90 days" },
      { value: 5, label: "marketing languages" },
      { value: 2, label: "platforms" },
    ],
    launch: { date: "June 2026", slug: "snapcount" },
  },
  {
    slug: "diam-jewels",
    icon: "/brand/icons/diam-jewels.png",
    name: "Diam Jewels",
    summary:
      "Inventory and accounting for jewellers: gold, diamonds, stones, sales, purchases and ledgers in one place.",
    url: "https://diam-jewels.leadcatalyst.in",
    status: "live",
    kind: "Inventory and accounting",
    year: "2026",
    problem:
      "A jeweller's stock is not a list of items, it is weight and purity that change as pieces are made, broken and remade. Most shops track that across a paper ledger for the metal, a spreadsheet for the stones and an accountant who reconciles the two later. The gap between them is where the margin quietly goes.",
    // TODO(parth): fill in `owned`, `build` and `stack`. Left thin deliberately
    // rather than invented, because I do not know which surfaces were yours.
    owned: [],
    build: [],
    stack: [],
  },
  {
    slug: "outboundqa",
    shot: "/shots/outboundqa.png",
    icon: "/brand/icons/outboundqa.svg",
    name: "OutboundQA",
    summary:
      "Catches cold email infrastructure problems before a campaign goes out, not after it burns a domain.",
    url: "https://outboundqa.com",
    status: "sunset",
    kind: "Outbound infrastructure QA",
    year: "2026",
    problem:
      "Cold email fails for boring reasons. A missing DMARC record, a tracking domain without SSL, an inbox on a domain registered three weeks ago. Nobody finds out until sends are already landing in spam, and by then the domain reputation is spent. The checks all exist as separate lookup tools, which is why nobody runs all of them.",
    owned: [
      "Check engine",
      "Verdict model",
      "Report generation",
      "Marketing site",
    ],
    build: [
      {
        title: "Fifteen checks, one verdict",
        detail:
          "SPF, DKIM, DMARC, MX, domain age, blacklist presence and tracking-domain SSL, run across every sending domain, inbox and tracking domain in an uploaded CSV.",
      },
      {
        title: "Ready, Needs Fix, or Do Not Launch",
        detail:
          "Fifteen green ticks is not an answer; it is homework. The output is one of three verdicts with the exact fix for each failure, because the person uploading the CSV wants to know whether to press send today.",
      },
      {
        title: "Evidence, not assertions",
        detail:
          "Every result shows the public record it was derived from. A tool that says your DMARC is wrong without showing the record it read is asking for trust it has not earned.",
      },
      {
        title: "Shareable client report",
        detail:
          "Agencies run this for clients, so the report is the deliverable: a link they can forward rather than a screenshot they have to explain.",
      },
    ],
    stack: [
      "DNS lookups",
      "SPF/DKIM/DMARC parsing",
      "Blacklist APIs",
      "TypeScript",
      "React",
    ],
    figures: [
      { value: 15, label: "infrastructure checks" },
      { value: 3, label: "possible verdicts" },
    ],
    launch: { date: "June 2026", slug: "outboundqa" },
    /** Shipped, launched, ran, retired. That is a complete arc, not a gap. */
    epilogue:
      "Sunsetted after launch. The checks were sound and the verdict model held up; the problem was that a domain audit is something a team does once a quarter, not a thing they come back to weekly. Worth knowing before building the next one.",
  },
];

export const experiments = [
  {
    name: "Crypto Trading Dashboard",
    url: "https://crypto-trading-dashboard-2.vercel.app/",
    summary:
      "Real-time crypto market dashboard: live price feeds over WebSockets, interactive charting, filtering, watchlists and price alerts. Built to see how far a data-dense trading surface could go before it needed a backend.",
    stack: ["Next.js 15", "React 19", "TypeScript", "WebSockets", "Chart.js"],
  },
  {
    name: "FramePhase",
    url: "https://frame-phase.netlify.app/",
    summary:
      "Video caption generator that transcribes in the browser and lets you restyle captions inline. An earlier experiment in client-side ML inference.",
    stack: ["Next.js", "WebAssembly", "AWS Transcribe"],
  },
];

/**
 * Counts, derived. Every "four products" written by hand in page copy is a
 * claim that goes stale the next time something ships, so nothing hardcodes it.
 */
export const shippedCount = products.length;

/**
 * Organic search clicks across the marketing surfaces, from Google Search
 * Console for the 90 days to September 2026. Worth stating because the SEO work
 * on those sites is mine, and traffic is the only claim on this page that a
 * reader could not otherwise verify by clicking through.
 */
export const organicClicks = products.reduce(
  (n, p) =>
    n + (p.figures?.find((f) => f.label.startsWith("organic"))?.value ?? 0),
  0,
);
export const liveCount = products.filter((p) => p.status === "live").length;
export const launchedCount = products.filter((p) => p.launch).length;

const WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

/** Small numbers read better spelled out in prose. */
export function spell(n: number) {
  return WORDS[n] ?? String(n);
}

export function productBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
