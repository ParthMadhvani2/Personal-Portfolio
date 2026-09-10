import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../lib/og";

export const alt = "Résumé — Parth Madhvani";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: "Résumé",
    title: "Parth Madhvani",
    subtitle:
      "Design engineer and product engineer. Four SaaS products in production across web and iOS.",
    tags: ["Full-stack", "Design engineering", "iOS", "SaaS"],
  });
}
