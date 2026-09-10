import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../lib/og";
import { site } from "../data/site";
import { shippedCount, spell } from "../data/products";

export const alt = `${site.name} · ${site.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: site.role,
    title: "Parth Madhvani",
    subtitle:
      site.tagline +
      ` ${spell(shippedCount)[0].toUpperCase()}${spell(shippedCount).slice(1)} products in production across web, iOS and SaaS.`,
    tags: ["React 19", "Django", "Expo", "Cloudflare", "TypeScript"],
  });
}
