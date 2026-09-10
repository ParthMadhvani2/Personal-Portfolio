import type { Metadata } from "next";
import Hero from "../components/site/hero";
import Products from "../components/site/products";
import Surfaces from "../components/site/surfaces";
import StackBand from "../components/site/stack-band";
import CraftTeaser from "../components/site/craft-teaser";
import Experience from "../components/site/experience";
import Contact from "../components/site/contact";
import { site } from "../data/site";

export const metadata: Metadata = {
  // The root layout's default title already reads correctly for this page, so
  // it is not overridden here, because a template applied to the homepage would
  // duplicate the name.
  alternates: { canonical: "/" },
  description: `${site.tagline} ${site.summary} Embers, Hood Cleaning Report, SnapCount and OutboundQA.`,
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="rule mx-auto max-w-content" />
      <Products />
      <div className="rule mx-auto max-w-content" />
      <Surfaces />
      <div className="rule mx-auto max-w-content" />
      <CraftTeaser />
      <div className="rule mx-auto max-w-content" />
      <StackBand />
      <div className="rule mx-auto max-w-content" />
      <Experience />
      <div className="rule mx-auto max-w-content" />
      <Contact />
    </>
  );
}
