import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../lib/og";
import { notes } from "../../data/notes";

export const alt = "Notes — things shipping taught me";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: `${notes.length} notes`,
    title: "Notes",
    subtitle:
      "Short observations from shipping four SaaS products — things that cost something to learn, mostly by getting them wrong first.",
    tags: ["backend", "product", "real-time", "security", "a11y"],
  });
}
