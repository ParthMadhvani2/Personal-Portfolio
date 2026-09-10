import { ArrowUpRight, CalendarDays, Mail } from "lucide-react";
import { site } from "../../data/site";
import { CopyButton } from "../craft/copy-button";
import { StatusPill } from "../craft/status-pill";
import Section from "./section";

const elsewhere = [
  { label: "GitHub", handle: "ParthMadhvani2", href: site.social.github },
  { label: "X", handle: "@parthmadhvani2", href: site.social.x },
  {
    label: "LinkedIn",
    handle: "in/parthmadhvani2",
    href: site.social.linkedin,
  },
];

export default function Contact() {
  return (
    <Section id="contact" label="Contact" title="what i'm looking for">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="rounded-lg border border-line bg-surface p-6">
          <StatusPill tone="live">{site.availability.label}</StatusPill>

          <p className="prose-body mt-5">
            A role where I own a product surface end to end rather than a lane
            of it — the kind of scope where the schema decision and the empty
            state are the same person&apos;s problem. Design engineering,
            product engineering, or founding engineer at a team small enough
            that those titles mean the same thing.
          </p>
          <p className="prose-body mt-3">
            If that&apos;s the shape of what you&apos;re hiring for, the fastest
            route is 30 minutes on a call. Otherwise email works and I answer.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={site.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-fg px-4 text-[14px] font-semibold text-bg shadow-sm transition-[transform,opacity] duration-fast ease-out hover:opacity-90 active:scale-[0.97]"
            >
              <CalendarDays size={15} strokeWidth={2.2} />
              Book a 30-min call
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-4 text-[14px] font-medium text-muted transition-[transform,color,background-color] duration-fast ease-out hover:bg-surface-hover hover:text-fg active:scale-[0.97]"
            >
              <Mail size={15} />
              Email
            </a>
            <CopyButton value={site.email} label="address" className="h-10" />
          </div>
        </div>

        <ul className="grid gap-px self-start overflow-hidden rounded-lg border border-line bg-line">
          {elsewhere.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-surface px-5 py-4 transition-colors duration-fast ease-out hover:bg-surface-hover"
              >
                <span className="w-20 text-[14px] font-medium text-fg">
                  {l.label}
                </span>
                <span className="mono truncate text-[12px] text-dim">
                  {l.handle}
                </span>
                <ArrowUpRight
                  size={15}
                  className="ml-auto shrink-0 text-dim transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
