"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "../../lib/cn";
import { notes, noteTags } from "../../data/notes";
import { products } from "../../data/products";
import { AnimatedNumber } from "../craft/animated-number";

const nameOf = (slug: string | null) =>
  products.find((p) => p.slug === slug)?.name ?? null;

export default function NotesList() {
  const [tag, setTag] = useState<string | null>(null);

  const shown = useMemo(
    () => (tag ? notes.filter((n) => n.tags.includes(tag)) : notes),
    [tag],
  );

  return (
    <>
      {/* Tags are the navigation, as in the collections this borrows from —
          but only the ones that exist, and the count updates so the filter
          never lies about how much is behind it. */}
      <div className="mt-8 flex flex-wrap items-center gap-1.5">
        <Chip active={tag === null} onClick={() => setTag(null)}>
          all
        </Chip>
        {noteTags.map((t) => (
          <Chip
            key={t}
            active={tag === t}
            onClick={() => setTag(tag === t ? null : t)}
          >
            {t}
          </Chip>
        ))}
        <p className="ml-auto text-[12px] text-dim tnum">
          <AnimatedNumber value={shown.length} /> of {notes.length}
        </p>
      </div>

      <ol className="mt-10 divide-y divide-line border-t border-line">
        {shown.map((note) => {
          const product = nameOf(note.from);
          return (
            <li key={note.n} id={`n${note.n}`} className="scroll-mt-20 py-8">
              <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-7">
                {/* Numbered so the collection visibly accumulates. Numbers are
                    stable and never reused — they are permalinks. */}
                <a
                  href={`#n${note.n}`}
                  aria-label={`Link to note ${note.n}`}
                  className="mono pt-1 text-[12px] text-dim tnum transition-colors duration-fast ease-out hover:text-accent"
                >
                  {String(note.n).padStart(2, "0")}
                </a>

                <div>
                  <h2 className="title text-[17px]">{note.title}</h2>
                  <p className="prose-body mt-2 text-[15px]">{note.body}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {note.tags.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTag(tag === t ? null : t)}
                        className={cn(
                          "mono text-[11px] transition-colors duration-fast ease-out",
                          tag === t ? "text-accent" : "text-dim hover:text-fg",
                        )}
                      >
                        #{t}
                      </button>
                    ))}
                    <span aria-hidden className="h-3 w-px bg-line" />
                    {product && note.from ? (
                      <Link
                        href={`/work/${note.from}`}
                        className="text-[12px] text-muted underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
                      >
                        from {product}
                      </Link>
                    ) : (
                      <span className="text-[12px] text-dim">general</span>
                    )}
                    <span className="mono ml-auto text-[11px] text-dim tnum">
                      {note.date}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-[14px] text-dim">
          Nothing tagged #{tag} yet.
        </p>
      ) : null}
    </>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border px-2.5 py-1 font-mono text-[11px] lowercase",
        "transition-[transform,background-color,color,border-color] duration-fast ease-out",
        "active:scale-[0.96]",
        active
          ? "border-accent bg-accent text-accent-fg"
          : "border-line bg-surface text-dim hover:bg-surface-hover hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
