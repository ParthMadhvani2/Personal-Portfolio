import type { Metadata } from "next";
import Link from "next/link";
import { site, SITE_URL } from "../../data/site";
import { crafts } from "../../data/crafts";
import Squircle from "../../components/craft/squircle";
import { StatusPill } from "../../components/craft/status-pill";

const title = "Colophon: how this site is built";
const description =
  "Every decision on this site, written down: the superellipse behind the icons, why the easing curves are custom, why there is no animation library, and what the mark is a graph of.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/colophon" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${SITE_URL}/colophon`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title, description },
};

const type = [
  {
    role: "Display",
    face: "Manrope 700–800",
    detail: "−0.033em tracking, 1.02 leading",
  },
  {
    role: "Title",
    face: "Manrope 600",
    detail: "−0.02em tracking, 1.15 leading",
  },
  {
    role: "Body",
    face: "Manrope 400",
    detail: "0 tracking, 1.65 leading, 65ch measure",
  },
  {
    role: "Label",
    face: "JetBrains Mono 400",
    detail: "+0.1em tracking, uppercase, 11px",
  },
];

const easings = [
  {
    name: "--ease-out",
    value: "cubic-bezier(0.23, 1, 0.32, 1)",
    use: "Anything entering or responding to a press",
  },
  {
    name: "--ease-in-out",
    value: "cubic-bezier(0.77, 0, 0.175, 1)",
    use: "Anything moving across the screen",
  },
  {
    name: "--ease-drawer",
    value: "cubic-bezier(0.32, 0.72, 0, 1)",
    use: "Sheets, when a spring would be overkill",
  },
];

const durations = [
  { name: "--dur-fast", value: "120ms", use: "Press feedback, hover colour" },
  { name: "--dur", value: "180ms", use: "Tooltips, small popovers" },
  { name: "--dur-slow", value: "260ms", use: "Thumbs, dropdowns, card lift" },
];

export default function Colophon() {
  return (
    <div className="mx-auto max-w-content px-4 pb-4 pt-12 sm:px-6 sm:pt-20">
      <StatusPill tone="accent">Design notes</StatusPill>
      <h1 className="display mt-6 text-[clamp(2.2rem,6vw,3.6rem)] lower">
        colophon
      </h1>
      <p className="prose-body mt-5">
        A portfolio that claims attention to detail and then hides the details
        is asking to be taken on faith. So here is every decision on this site,
        including the ones that are arguable.
      </p>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-16">
        <h2 className="label mb-5">01 · The mark</h2>
        <div className="grid gap-8 rounded-lg border border-line bg-surface p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10">
          <Squircle className="h-24 w-24 shrink-0 bg-[#0F1B33]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/mark.svg"
              alt=""
              width={96}
              height={96}
              className="h-full w-full"
            />
          </Squircle>
          <div>
            <h3 className="title text-[17px]">A P, built from the system</h3>
            <p className="prose-body mt-2 text-[15px]">
              The first version of this mark was a damped spring plotted from{" "}
              <code className="mono text-[13px] text-fg">
                y(t) = A·e^(−ζωt)·cos(ω_d·t)
              </code>
              . It was a nice idea and a bad mark. At 96px it read as a stray
              &ldquo;w&rdquo;; at 16px it read as lint. A mark has one job
              before it has any others, which is to survive a browser tab.
            </p>
            <p className="prose-body mt-3 text-[15px]">
              So: a P. The counter is a superellipse, the same curve as the tile
              and as every product icon on the site, which is the part that
              makes it belong to this system rather than to a typeface. A P is
              left-heavy, so it sits fractionally right of true centre to read
              as centred.
            </p>
            <p className="prose-body mt-3 text-[15px]">
              Two cuts, for the reason type needs them. The display cut has a
              tighter counter; the favicon cut carries a heavier stem and a
              slightly <em>larger</em> counter, because a hole that looks
              correct at 96px clogs shut at 16.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-16">
        <h2 className="label mb-5">02 · The icon shape</h2>
        <div className="rounded-lg border border-line bg-surface p-6">
          <div className="flex flex-wrap items-end gap-8">
            {[
              { n: 2, label: "n = 2 · ellipse" },
              { n: 4.5, label: "n = 4.5 · used here" },
              { n: 12, label: "n = 12 · near-square" },
            ].map((s) => (
              <div key={s.n}>
                <Squircle n={s.n} className="h-20 w-20 bg-accent" />
                <p className="mono mt-2.5 text-[11px] text-dim">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="prose-body mt-6 text-[15px]">
            Every tile on this site is clipped to a superellipse,{" "}
            <code className="mono text-[13px] text-fg">|x|ⁿ + |y|ⁿ = 1</code>,
            not a rounded rectangle. A rounded rectangle joins a straight edge
            to a circular arc, and curvature jumps at the seam. The eye reads
            that discontinuity as a faintly pinched corner without being able to
            name it. A superellipse has continuous curvature the whole way
            round.
          </p>
          <p className="prose-body mt-3 text-[15px]">
            The path is sampled from the equation rather than copied from the
            bezier constants that circulate for this, so it is checkable: every
            point satisfies the equation to within floating-point error, and 32
            samples land within ~1.1px of the true curve on a 1024px icon.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-16">
        <h2 className="label mb-5">03 · Type</h2>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-bg-subtle">
                {["Role", "Face", "Tracking and leading"].map((h) => (
                  <th key={h} className="label px-4 py-3 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {type.map((t) => (
                <tr key={t.role} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-[14px] font-medium text-fg">
                    {t.role}
                  </td>
                  <td className="mono px-4 py-3 text-[12px] text-muted">
                    {t.face}
                  </td>
                  <td className="mono px-4 py-3 text-[12px] text-dim">
                    {t.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="prose-body mt-4 text-[15px]">
          Tracking is size-specific. Large type reads too loose without negative
          tracking; small type needs a little positive. One{" "}
          <code className="mono text-[13px] text-fg">letter-spacing</code> value
          across a whole site is wrong somewhere by definition.
        </p>
        <p className="prose-body mt-3 text-[15px]">
          Lowercase is a voice, applied to display headings and UI labels. It is
          deliberately <em>not</em> a{" "}
          <code className="mono text-[13px] text-fg">text-transform</code> on{" "}
          <code className="mono text-[13px] text-fg">*</code>, which lowercases
          NFPA and iOS too, and the result reads as a bug rather than a choice.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-16">
        <h2 className="label mb-5">04 · Motion</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface p-5">
            <h3 className="title mb-4 text-[15px]">Easing</h3>
            <ul className="space-y-3">
              {easings.map((e) => (
                <li key={e.name}>
                  <p className="mono text-[12px] text-fg">{e.name}</p>
                  <p className="mono mt-0.5 text-[11px] text-dim">{e.value}</p>
                  <p className="mt-1 text-[13px] text-muted">{e.use}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-surface p-5">
            <h3 className="title mb-4 text-[15px]">Duration</h3>
            <ul className="space-y-3">
              {durations.map((d) => (
                <li key={d.name}>
                  <p className="mono text-[12px] text-fg">
                    {d.name} <span className="text-dim">{d.value}</span>
                  </p>
                  <p className="mt-1 text-[13px] text-muted">{d.use}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-dim">
              Nothing on this site uses <code className="mono">ease-in</code>.
              It starts slow, which delays movement at the exact moment the user
              is watching hardest. A 300ms <code className="mono">ease-in</code>{" "}
              dropdown feels slower than a 300ms{" "}
              <code className="mono">ease-out</code> one.
            </p>
          </div>
        </div>
        <p className="prose-body mt-4 text-[15px]">
          The command menu has no open animation at all. It is opened by
          keyboard shortcut, so it gets used tens of times by anyone who finds
          it, and an entrance is a tax charged on every use.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-16">
        <h2 className="label mb-5">05 · Dependencies</h2>
        <div className="rounded-lg border border-line bg-surface p-6">
          <p className="prose-body text-[15px]">
            There is no animation library here. All {crafts.length} components
            in{" "}
            <Link
              href="/crafts"
              className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
            >
              the library
            </Link>{" "}
            run on CSS transitions, Pointer Events, and one small spring built
            on{" "}
            <code className="mono text-[13px] text-fg">
              requestAnimationFrame
            </code>
            .
          </p>
          <p className="prose-body mt-3 text-[15px]">
            That is not minimalism for its own sake. CSS transitions run off the
            main thread, so they hold up while the browser is busy parsing a
            route, which is precisely when a Framer Motion animation driven by{" "}
            <code className="mono text-[13px] text-fg">
              requestAnimationFrame
            </code>{" "}
            starts dropping frames. The spring exists only where a gesture has
            to be interruptible and carry velocity, which is the one thing CSS
            genuinely cannot do.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {[
              "next",
              "react",
              "tailwindcss",
              "lucide-react",
              "clsx",
              "tailwind-merge",
            ].map((d) => (
              <li
                key={d}
                className="rounded-sm border border-line bg-bg-subtle px-2.5 py-1.5 font-mono text-[12px] text-dim"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-16">
        <h2 className="label mb-5">06 · Accessibility</h2>
        <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
          {[
            [
              "prefers-reduced-motion",
              "Travel and springs drop out; opacity and colour stay, because they carry meaning. Reduced motion means gentler, not absent.",
            ],
            [
              "prefers-reduced-transparency",
              "Translucent chrome becomes solid rather than merely less blurred.",
            ],
            [
              "prefers-contrast: more",
              "Borders promote to the strong token and muted text promotes to full contrast.",
            ],
            [
              "Focus",
              "Never removed, only replaced: a 2px accent ring with offset, on :focus-visible so pointer users never see it.",
            ],
            [
              "Colour",
              "No status is carried by colour alone; every dot has a label beside it.",
            ],
            [
              "Headings",
              "One h1 per page, no skipped levels. The previous site used h1 for all twenty-odd headings.",
            ],
          ].map(([k, v]) => (
            <li
              key={k}
              className="grid gap-1 p-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6"
            >
              <p className="mono text-[12px] text-fg">{k}</p>
              <p className="text-[14px] leading-relaxed text-muted">{v}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-16">
        <h2 className="label mb-5">07 · Brand assets</h2>
        <div className="rounded-lg border border-line bg-surface p-6">
          <p className="prose-body text-[15px]">
            The social banners are generated from this codebase rather than
            exported from a design tool, so they cannot drift from the tokens
            and they can be regenerated after any change. The product icons sit
            on the mark&apos;s own damped curve, and the layout keeps the
            message clear of the avatar crop on both platforms.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {[
              {
                href: "/brand/linkedin.png",
                label: "LinkedIn banner",
                size: "1584 × 396",
              },
              { href: "/brand/x.png", label: "X header", size: "1500 × 500" },
              { href: "/media/mark.svg", label: "Mark", size: "SVG" },
              {
                href: "/media/mark-small.svg",
                label: "Mark, small cut",
                size: "SVG",
              },
            ].map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  download
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-bg-subtle px-3 py-2 text-[13px] text-muted transition-[transform,background-color,color] duration-fast ease-out hover:bg-surface-hover hover:text-fg active:scale-[0.97]"
                >
                  {a.label}
                  <span className="mono text-[11px] text-dim">{a.size}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="prose-body mt-16 border-t border-line pt-8">
        Disagree with any of it? I would genuinely like to hear why.{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
        >
          {site.email}
        </a>
        .
      </p>
    </div>
  );
}
