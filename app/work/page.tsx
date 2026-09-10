import type { Metadata } from "next";
import Products from "../../components/site/products";
import { site, SITE_URL } from "../../data/site";
import { products } from "../../data/products";

const title = "Work — four products in production";
const description = `Build write-ups for ${products
  .map((p) => p.name)
  .join(
    ", ",
  )}. What was hard, what I owned, and the decisions behind each one.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${SITE_URL}/work`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function WorkIndex() {
  return (
    <>
      <section className="mx-auto max-w-content px-4 pb-2 pt-12 sm:px-6 sm:pt-20">
        <h1 className="display text-[clamp(2.2rem,6vw,3.6rem)] lower">work</h1>
        <p className="prose-body mt-5">
          Four products, all live, all with more than one layer of mine in them.
          Each write-up leads with the problem rather than the stack, because
          the stack is the easy part to explain and the least interesting thing
          about any of them.
        </p>
      </section>
      <Products />
    </>
  );
}
