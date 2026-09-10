import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "../../data/site";
import LocalTime from "./local-time";

const elsewhere = [
  { label: "GitHub", href: site.social.github },
  { label: "X", href: site.social.x },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Product Hunt", href: site.social.productHunt },
  { label: "Book a call", href: site.calendar },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:grid-cols-[1fr_auto] sm:px-6">
        <div>
          <p className="title text-[15px] lower">{site.name}</p>
          <p className="mt-1 text-[13px] text-dim">
            {site.role} · {site.location}
          </p>
          <LocalTime className="mt-3" />
        </div>

        <nav
          aria-label="Elsewhere"
          className="flex flex-wrap items-start gap-x-5 gap-y-2"
        >
          {elsewhere.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-[13px] text-muted transition-colors duration-fast ease-out hover:text-fg"
            >
              {l.label}
              <ArrowUpRight
                size={13}
                className="transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
              />
            </a>
          ))}
          <Link
            href="/crafts"
            className="text-[13px] text-muted transition-colors duration-fast ease-out hover:text-fg"
          >
            Components
          </Link>
          <Link
            href="/colophon"
            className="text-[13px] text-muted transition-colors duration-fast ease-out hover:text-fg"
          >
            Colophon
          </Link>
        </nav>
      </div>

      <div className="mx-auto max-w-content px-4 pb-10 sm:px-6">
        <p className="font-mono text-[11px] text-dim">
          Built with Next.js and no animation library. Source on{" "}
          <a
            href={`${site.social.github}/Personal-Portfolio`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:text-fg hover:decoration-accent"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
