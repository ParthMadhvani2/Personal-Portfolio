import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { crafts } from "../../data/crafts";
import CraftDemo from "./craft-demos";
import Section from "./section";

const featured = ["copy-button", "segmented-control", "hold-to-confirm"];

export default function CraftTeaser() {
  const shown = featured
    .map((id) => crafts.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <Section
      label="Craft"
      title="components, not screenshots"
      intro={
        <>
          The interaction details I care about, extracted into files you can
          copy. No animation library, no headless-UI dependency, one helper
          function. These are live — press them.
        </>
      }
    >
      <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {shown.map(({ id, name, principle }) => (
          <li key={id} className="flex flex-col bg-surface p-5">
            <p className="mono mb-1 text-[12px] text-fg">{name}</p>
            <p className="mb-5 text-[13px] leading-relaxed text-dim">
              {principle}
            </p>
            <div className="mt-auto">
              <CraftDemo id={id} />
            </div>
          </li>
        ))}
      </ul>

      <Link
        href="/crafts"
        className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
      >
        All {crafts.length} components, with source
        <ArrowRight
          size={15}
          className="transition-transform duration-fast ease-out group-hover:translate-x-0.5"
        />
      </Link>
    </Section>
  );
}
