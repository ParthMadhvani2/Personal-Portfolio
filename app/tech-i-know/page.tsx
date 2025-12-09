import type { Metadata } from "next";
import skillsData from "../../data/techstack.json";

interface SkillCategory {
  category: string;
  skills: string[];
}

const Development: SkillCategory[] = skillsData.Development;
const Design: SkillCategory[] = skillsData.Design;

export const metadata: Metadata = {
  title: "Tech Stack & Skills | Parth Madhvani",
  description:
    "Complete list of technologies, frameworks, and tools I use for building fast, scalable web applications. React, Next.js, TypeScript, Node.js, PostgreSQL, Docker, and more.",
  openGraph: {
    title: "Tech Stack & Skills | Parth Madhvani",
    description:
      "Technologies and tools I use: React, Next.js, TypeScript, Node.js, PostgreSQL, Docker, and more.",
    url: "https://parthmadhvani.com/tech-i-know",
    type: "website",
  },
};

const TechFlex = () => {
  return (
    <div className="tech-flex mt-8">
      <div className="mb-6">
        <h1 className=" mb-2 text-neutral-200 text-xl font-semibold">
          Superpowers I’ve Built Over the Years
        </h1>

        <p className="text-neutral-500 text-xl font-semibold">
          I’ve worked across the full web stack — from design systems to production-grade engineering.
          Here’s a curated snapshot of the tools and technologies I use (and continue to learn).
        </p>
      </div>
      <div className="my-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Development.map((item, index) => (
            <div
              key={index}
              className="border p-5 rounded-xl border-dashed border-neutral-700 hover:bg-neutral-900 transition-all duration-300"
            >
              <h1 className="text-xl font-semibold mb-6">{item.category}</h1>
              <div className="">
                {item.skills.map((skill, skillIndex) => (
                  <div
                    className="mb-3 flex flex-col gap-2 text-neutral-500 font-semibold"
                    key={skillIndex}
                  >
                    <p className="font-semibold">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xl text-neutral-500 mt-2 mb-6 font-semibold">
          Some people call me a full-stack developer,{" "}
          but I prefer
          <span className="text-neutral-200 font-semibold">
            Frontend Engineer
          </span>{" "}
          because designing and building great user experiences is where I operate best.
        </p>
      </div>{" "}
      <div className="my-12">
        <h1 className="text-xl font-semibold mb-6 text-neutral-200">
          Design skills
        </h1>
        <p className="text-xl text-neutral-500 mt-2 mb-6 font-semibold">
          I enjoy crafting interfaces that are both functional and delightful.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Design.map((item, index) => (
            <div
              key={index}
              className="border p-5 rounded-xl border-dashed hover:bg-neutral-900 transition-all duration-300 border-neutral-700"
            >
              <h1 className="text-xl font-semibold mb-6">{item.category}</h1>
              <div className="">
                {item.skills.map((skill, skillIndex) => (
                  <div
                    className="mb-3 flex flex-col gap-2 text-neutral-500 font-semibold"
                    key={skillIndex}
                  >
                    <p className="font-semibold">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechFlex;
