import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../lib/og";
import { crafts } from "../../data/crafts";

export const alt = "Crafts — interaction components with source";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: "Components",
    title: "Crafts",
    subtitle: `${crafts.length} interaction components with their source. No animation library — copy the file.`,
    tags: ["Sheet", "Tooltip", "Segmented", "Copy", "Spotlight"],
  });
}
