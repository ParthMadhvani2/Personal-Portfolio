/**
 * Notes: short observations from shipping, numbered as they accumulate.
 *
 * The genre this borrows from (Design Spells, 60fps) collects details spotted
 * in *other people's* products. The useful inversion for a portfolio is to
 * collect them from your own: these are things that were learned by getting
 * them wrong first, which is not a thing anyone can invent convincingly.
 *
 * House rules for adding one:
 *   - It has to have cost something. No restated best practices.
 *   - Name the product it came from, so it is checkable.
 *   - Three sentences. If it needs more, it is a build write-up, not a note.
 */

export type Note = {
  /** Stable, ascending. Displayed descending. Never renumber, because links break. */
  n: number;
  title: string;
  body: string;
  tags: string[];
  /** Product slug this came out of, or null for general. */
  from: string | null;
  date: string;
};

export const notes: Note[] = [
  {
    n: 14,
    title: "A score with no reason is a number you have to trust",
    body: "Embers ranks leads across five dimensions, and the first version just showed the rank. Nobody used it. Every row now carries the reason it scored what it did (engaged twice in six days, title and company size match), and the same number suddenly became actionable.",
    tags: ["product", "ai"],
    from: "embers",
    date: "2026-08",
  },
  {
    n: 13,
    title: "Fifteen green ticks is homework, not an answer",
    body: "OutboundQA runs fifteen infrastructure checks. Showing fifteen results made the user do the synthesis themselves. Collapsing it to one verdict (Ready, Needs Fix, Do Not Launch) with the checks underneath is the same data doing the work instead of delegating it.",
    tags: ["product"],
    from: "outboundqa",
    date: "2026-06",
  },
  {
    n: 12,
    title: "A tool that says your DNS is wrong should show you the record",
    body: "An audit that asserts without evidence is asking for trust it has not earned, and the first thing a sceptical user does is go check by hand. Printing the actual public record next to each verdict removed that step, and removed most of the support questions with it.",
    tags: ["product", "security"],
    from: "outboundqa",
    date: "2026-06",
  },
  {
    n: 11,
    title: "The onboarding wall is why the second device never gets used",
    body: "SnapCount is a shared counter, so it is worthless if only one person is counting. Requiring an account to join meant the person handed the second device just did not. Guest links with no signup was the single change that made it a multiplayer product rather than a single-player one with a sync feature.",
    tags: ["product", "real-time"],
    from: "snapcount",
    date: "2026-06",
  },
  {
    n: 10,
    title: "SSE, not sockets, when the traffic only goes one way",
    body: "Counts in SnapCount propagate server-to-client and almost never the other way. Server-sent events carry that shape natively and reconnect for free, where a socket layer would have meant writing and testing a reconnect path for a message flow that does not need one.",
    tags: ["real-time", "backend"],
    from: "snapcount",
    date: "2026-05",
  },
  {
    n: 9,
    title: "Retried webhooks are not a rare case",
    body: "Payment providers retry on any non-2xx, including the ones caused by your own deploy. A handler that provisions on every delivery will double-provision eventually, not as an edge case but on a normal Tuesday. Idempotency keys on the handler cost an afternoon; finding out the other way costs a refund and the trust.",
    tags: ["billing", "backend"],
    from: "embers",
    date: "2026-05",
  },
  {
    n: 8,
    title:
      "Retrofitting tenancy onto a live compliance product is not a weekend",
    body: "Hood Cleaning Report had workspaces, roles and soft deletes in the schema before the first customer, which felt like over-building at the time. It was the cheapest decision in the project. Tenancy touches every query, and adding it later means touching every query while people are relying on the answers.",
    tags: ["backend"],
    from: "hood-cleaning-report",
    date: "2026-04",
  },
  {
    n: 7,
    title: "Encrypt third-party tokens even when the database is private",
    body: "CompanyCam OAuth tokens grant access to someone else's account, so a database dump is not just your problem. Fernet encryption at rest means a leaked backup is inert, and the cost is one wrapper on read and write.",
    tags: ["security", "backend"],
    from: "hood-cleaning-report",
    date: "2026-04",
  },
  {
    n: 6,
    title: "The audit log matters more than the share link",
    body: "Compliance reports go out as signed, expiring URLs, which is the obvious half. The half that actually gets asked about is who opened it and when. That is an inspector's question, months later, and the sharing mechanism alone cannot answer it.",
    tags: ["security", "product"],
    from: "hood-cleaning-report",
    date: "2026-03",
  },
  {
    n: 5,
    title: "Render PDFs as HTML, not coordinates",
    body: "Report layouts change constantly and every change in a coordinate-pushing PDF library is arithmetic. Composing typed blocks and rendering through Playwright means the layout is CSS: reviewable in a browser, and the same code path as the on-screen preview.",
    tags: ["pdf", "backend"],
    from: "hood-cleaning-report",
    date: "2026-03",
  },
  {
    n: 4,
    title: "Prompts that run per row are a unit-cost decision",
    body: "Embers classifies every engager on every post, so prompt length is not a style question; it is multiplied by the entire dataset, forever. Designing the prompt against cost per row from the start is much easier than discovering the bill later and having to re-tune it against a live scoring model.",
    tags: ["ai", "backend"],
    from: "embers",
    date: "2026-02",
  },
  {
    n: 3,
    title: "Read the accessibility settings on mount, not in a settings screen",
    body: "The SnapCount iOS app reads Reduce Motion and Reduce Transparency when it launches and changes what actually renders. Treating them as a preference the user sets inside your app misses the point: they already told the system, and asking again is asking them to do it twice.",
    tags: ["ios", "a11y", "motion"],
    from: "snapcount",
    date: "2026-02",
  },
  {
    n: 2,
    title: "Tabular figures, or the layout twitches",
    body: "Any number that updates live (a counter, a timer, a total) will shift its own width as glyphs change unless the figures are tabular. It reads as instability rather than as a typographic detail, and it is one CSS declaration.",
    tags: ["motion", "type"],
    from: "snapcount",
    date: "2026-01",
  },
  {
    n: 1,
    title: "Quarterly tools do not retain",
    body: "OutboundQA worked. The checks were sound and the verdict model held up. But auditing sending domains is something a team does once a quarter, and a product people genuinely need four times a year is a hard business regardless of how good it is. Worth knowing before building the next one.",
    tags: ["product"],
    from: "outboundqa",
    date: "2026-06",
  },
];

export const noteTags = Array.from(
  new Set(notes.flatMap((n) => n.tags)),
).sort();
