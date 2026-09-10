import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../../lib/og";
import { products, productBySlug } from "../../../data/products";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Build write-up";
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const p = productBySlug(params.slug);
  return ogImage({
    eyebrow: p?.kind ?? "Work",
    title: p?.name ?? "Work",
    subtitle: p?.summary ?? "",
    tags: p?.stack.slice(0, 4) ?? [],
  });
}
