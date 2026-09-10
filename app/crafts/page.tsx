import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { crafts } from "../../data/crafts";
import { site, SITE_URL } from "../../data/site";
import CraftDemo from "../../components/site/craft-demos";
import CodeBlock from "../../components/site/code-block";
import { StatusPill } from "../../components/craft/status-pill";

// Sources are read at build time, so the code on the page is always the code
// that ships. It cannot drift from the component the way a pasted snippet does.
export const dynamic = "force-static";

const title = "Crafts: interaction components";
const description =
  "Ten interaction components with their source: a draggable sheet with momentum projection, a blur-masked copy button, a clip-path segmented control. No animation library. Copy the file.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/crafts" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${SITE_URL}/crafts`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

function read(file: string) {
  try {
    return fs
      .readFileSync(
        path.join(process.cwd(), "components", "craft", file),
        "utf8",
      )
      .trimEnd();
  } catch {
    return "// source unavailable at build time";
  }
}

export default function CraftsPage() {
  const sources = Object.fromEntries(
    crafts.flatMap((c) => [c.file, ...(c.deps ?? [])]).map((f) => [f, read(f)]),
  );

  return (
    <>
      <section className="mx-auto max-w-content px-4 pb-4 pt-12 sm:px-6 sm:pt-20">
        <StatusPill tone="accent">{crafts.length} components · MIT</StatusPill>
        <h1 className="display mt-6 text-[clamp(2.2rem,6vw,3.6rem)] lower">
          crafts
        </h1>
        <p className="prose-body mt-5">
          Every one of these came out of a real product, then got pulled back
          out and made portable. They depend on React,{" "}
          <code className="mono text-[13px] text-fg">lucide-react</code> for
          icons, and a two-line{" "}
          <code className="mono text-[13px] text-fg">cn</code> helper. That is
          the whole list. No Framer Motion, no Radix, no context to wire up.
        </p>
        <p className="prose-body mt-3">
          Colours resolve to CSS custom properties, so adopting one means
          copying the file and pointing about six variables at your own tokens.
          Each has a note on the principle it exists to demonstrate, because the
          value is in the reasoning more than the code.
        </p>
      </section>

      <div className="rule mx-auto max-w-content" />

      <div className="mx-auto max-w-content px-4 sm:px-6">
        <ol className="divide-y divide-line">
          {crafts.map((c, i) => (
            <li key={c.id} id={c.id} className="scroll-mt-20 py-14 first:pt-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                <div>
                  <p className="label mb-3">
                    {String(i + 1).padStart(2, "0")} · {c.file}
                  </p>
                  <h2 className="title text-[22px]">{c.name}</h2>
                  <p className="prose-body mt-3 text-[14px]">{c.principle}</p>

                  {c.deps?.length ? (
                    <p className="mono mt-4 text-[11px] text-dim">
                      also needs: {c.deps.join(", ")}
                    </p>
                  ) : null}

                  <div className="mt-6 rounded-lg border border-dashed border-line bg-bg-subtle p-5">
                    <p className="label mb-4">Live</p>
                    <CraftDemo id={c.id} />
                  </div>
                </div>

                <div className="space-y-3">
                  <CodeBlock
                    filename={`components/craft/${c.file}`}
                    code={sources[c.file]}
                  />
                  {c.deps?.map((d) => (
                    <CodeBlock
                      key={d}
                      filename={`components/craft/${d}`}
                      code={sources[d]}
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
