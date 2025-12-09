import type { Metadata } from "next";
import Contact from "../components/layouts/contact";
import Experience from "../components/layouts/experience";
import Hero from "../components/layouts/hero";
import TechStack from "../components/layouts/tech";
import Work from "../components/layouts/work";
import PageSize from "../components/ui/page-size";
import Seperator from "../components/ui/seperator";
import TimeAndLocation from "../components/ui/time-and-location";

export const metadata: Metadata = {
  title: "Parth Madhvani - Frontend Design Engineer",
  description:
    "Frontend design engineer specializing in fast, accessible web interfaces. Building scalable products with React, Next.js, and TypeScript. Currently available for frontend engineering roles.",
  openGraph: {
    title: "Parth Madhvani - Frontend Design Engineer",
    description:
      "Frontend design engineer specializing in fast, accessible web interfaces. Building scalable products with React, Next.js, and TypeScript.",
    url: "https://parthmadhvani.com",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <PageSize />
      <TimeAndLocation />
      <Hero />
      <Seperator />
      <Work />
      <Seperator />
      <TechStack />
      <Seperator />
      <Experience />
      <Seperator />
      <Contact />
    </>
  );
}

