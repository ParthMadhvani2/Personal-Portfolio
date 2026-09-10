import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../lib/og";

export const alt = "Stack — what's actually in production";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    eyebrow: "Stack",
    title: "What's actually running",
    subtitle:
      "Grouped by depth, not breadth. Anything only tinkered with is left off on purpose.",
    tags: ["React 19", "Django 5", "Celery", "Expo", "Workers"],
  });
}
