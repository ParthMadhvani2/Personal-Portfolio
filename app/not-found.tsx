import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-content flex-col justify-center px-4 py-20 sm:px-6">
      <p className="label mb-4">Error 404</p>
      <h1 className="display text-[clamp(2.4rem,7vw,4rem)] lower">
        nothing here
      </h1>
      <p className="prose-body mt-4">
        This URL doesn&apos;t match a page. It may have moved, or it may never
        have existed. Either way the useful pages are one click away.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {[
          { href: "/", label: "Home" },
          { href: "/work", label: "Work" },
          { href: "/crafts", label: "Crafts" },
          { href: "/resume", label: "Résumé" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-surface px-3.5 text-[13px] font-medium text-muted transition-[transform,color,background-color] duration-fast ease-out hover:bg-surface-hover hover:text-fg active:scale-[0.97]"
          >
            {l.href === "/" ? <ArrowLeft size={14} /> : null}
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
