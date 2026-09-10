import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../lib/og";
import { products, shippedCount, spell } from "../../data/products";

export const alt = "Work: products in production";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: "Work",
    title: `${spell(shippedCount)[0].toUpperCase()}${spell(shippedCount).slice(1)} products shipped`,
    subtitle:
      "Build write-ups: what was hard, what I owned, and the decisions behind each one.",
    tags: products.map((p) => p.name),
  });
}
