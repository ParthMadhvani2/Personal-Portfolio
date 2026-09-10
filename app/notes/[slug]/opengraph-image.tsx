import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../../lib/og";
import { articles, articleBySlug } from "../../../data/articles";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Article";
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const a = articleBySlug(params.slug);
  return ogImage({
    eyebrow: `Article · ${a?.read ?? 5} min`,
    title: a?.title ?? "Article",
    subtitle: a?.summary ?? "",
    tags: a?.tags ?? [],
  });
}
