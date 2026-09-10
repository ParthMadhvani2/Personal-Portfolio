import type { Metadata } from "next";
import Link from "next/link";
import data from "../../data/techstack.json";
import { site, SITE_URL } from "../../data/site";
import { SpotlightCard } from "../../components/craft/spotlight-card";
import { StatusPill } from "../../components/craft/status-pill";

type Group = { category: string; skills: string[] };

const development: Group[] = data.Development;
const design: Group[] = data.Design;

const total = [...development, ...design].reduce(
  (n, g) => n + g.skills.length,
  0,
);

const title = "Stack: what's actually in production";
const description =
  "React 19, TanStack Start, Django 5 + DRF, Celery, OpenAI, Expo SDK 53, Cloudflare Workers, Dodo Payments. Grouped by depth, not breadth. Anything only tinkered with is left off.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tech-i-know" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${SITE_URL}/tech-i-know`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

function Grid({ groups, offset = 0 }: { groups: Group[]; offset?: number }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g, i) => (
        <SpotlightCard as="li" key={g.category} className="p-5">
          <p className="label mb-4">
            {String(offset + i + 1).padStart(2, "0")}
          </p>
          <h3 className="title mb-4 text-[16px]">{g.category}</h3>
          <ul className="space-y-2">
            {g.skills.map((s) => (
              <li
                key={s}
                className="relative pl-4 text-[13px] leading-relaxed text-muted"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-line-strong"
                />
                {s}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      ))}
    </ul>
  );
}

export default function StackPage() {
  return (
    <div className="mx-auto max-w-content px-4 pb-4 pt-12 sm:px-6 sm:pt-20">
      <StatusPill tone="accent">{total} entries · all shipped</StatusPill>

      <h1 className="display mt-6 text-[clamp(2.2rem,6vw,3.6rem)] lower">
        the stack i ship with
      </h1>

      <p className="prose-body mt-5">
        Grouped by depth rather than breadth. Everything here is running in
        production in one of{" "}
        <Link
          href="/work"
          className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
        >
          the products
        </Link>
        . Tech I&apos;ve only read about or tried in a weekend project is left
        off, because a stack list that includes everything tells you nothing.
      </p>

      <section className="mt-14">
        <h2 className="label mb-6">Engineering</h2>
        <Grid groups={development} />
      </section>

      <section className="mt-16">
        <div className="mb-6 max-w-prose">
          <h2 className="label mb-3">Design</h2>
          <p className="text-[15px] leading-relaxed text-muted">
            People call me a full-stack engineer. I read myself as a design
            engineer: comfortable across the stack, but at my most useful where
            design, frontend and product decisions land on the same desk.
          </p>
        </div>
        <Grid groups={design} offset={development.length} />
      </section>

      <p className="prose-body mt-14 border-t border-line pt-8">
        The clearest evidence of the design half is{" "}
        <Link
          href="/crafts"
          className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
        >
          the component library
        </Link>{" "}
        , ten interaction components with their source and the reasoning behind
        each timing decision.
      </p>
    </div>
  );
}
