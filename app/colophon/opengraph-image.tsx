import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../lib/og";

export const alt = "Colophon: how this site is built";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: "Design notes",
    title: "Colophon",
    subtitle:
      "Every decision on this site written down: the superellipse, the easing curves, and what the mark is a graph of.",
    tags: ["Type", "Motion", "Squircle", "A11y"],
  });
}
