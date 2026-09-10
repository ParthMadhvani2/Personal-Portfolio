import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../lib/og";
import { shippedCount, spell } from "../../data/products";

export const alt = "Résumé · Parth Madhvani";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: "Résumé",
    title: "Parth Madhvani",
    subtitle: `Design engineer and product engineer. ${spell(shippedCount)[0].toUpperCase()}${spell(shippedCount).slice(1)} SaaS products shipped across web and iOS.`,
    tags: ["Full-stack", "Design engineering", "iOS", "SaaS"],
  });
}
