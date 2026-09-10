import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../lib/og";
import { products } from "../../data/products";

export const alt = "Work — four products in production";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: "Work",
    title: "Four products, live",
    subtitle:
      "Build write-ups: what was hard, what I owned, and the decisions behind each one.",
    tags: products.map((p) => p.name),
  });
}
