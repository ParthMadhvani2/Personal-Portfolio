import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { site, SITE_URL } from "../../data/site";
import { CopyButton } from "../../components/craft/copy-button";
import { StatusPill } from "../../components/craft/status-pill";

const title = "Résumé";
const description = `Résumé for ${site.name} — design engineer and product engineer. Four SaaS products in production across web and iOS.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${SITE_URL}/resume`,
    type: "profile",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-content px-4 pb-4 pt-12 sm:px-6 sm:pt-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <StatusPill tone="live">{site.availability.label}</StatusPill>
          <h1 className="display mt-6 text-[clamp(2.2rem,6vw,3.2rem)] lower">
            résumé
          </h1>
          <p className="prose-body mt-4">
            One page. If you want the long version, the{" "}
            <Link
              href="/work"
              className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
            >
              build write-ups
            </Link>{" "}
            go into what was actually hard on each product.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {/* Points at the file that exists. The old link 404'd. */}
            <a
              href={site.resume}
              download="Parth-Madhvani-Resume.pdf"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-fg px-4 text-[14px] font-semibold text-bg shadow-sm transition-[transform,opacity] duration-fast ease-out hover:opacity-90 active:scale-[0.97]"
            >
              <Download size={15} strokeWidth={2.2} />
              Download PDF
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

          <dl className="mt-10 space-y-3 border-t border-line pt-6">
            {[
              ["Role", site.role],
              ["Now", site.employer.name],
              ["Based", site.location],
              ["Degree", `${site.education.degree}, ${site.education.years}`],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4 text-[13px]">
                <dt className="w-16 shrink-0 text-dim">{k}</dt>
                <dd className="text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="overflow-hidden rounded-lg border border-line bg-surface p-2 shadow-md">
          <Image
            src="/media/resume.png"
            width={900}
            height={1165}
            alt={`${site.name} résumé, one page`}
            className="h-auto w-full rounded-md"
            priority
          />
        </figure>
      </div>
    </div>
  );
}
