import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../../lib/og";
import { notes, noteFromSlug, noteSlug } from "../../../data/notes";
import { productBySlug } from "../../../data/products";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "A note from shipping";
export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((n) => ({ slug: noteSlug(n) }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const note = noteFromSlug(params.slug);
  const from = note?.from ? productBySlug(note.from)?.name : null;
  return ogImage({
    eyebrow: note
      ? `Note ${String(note.n).padStart(2, "0")}${from ? ` · from ${from}` : ""}`
      : "Notes",
    title: note?.title ?? "Notes",
    subtitle: "Things shipping taught me",
    tags: note?.tags ?? [],
  });
}
