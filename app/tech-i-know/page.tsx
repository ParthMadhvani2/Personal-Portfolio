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
    "The stack I actually ship with: React 19, TanStack Start, Django + DRF, Celery, OpenAI, Expo, Cloudflare Workers, Dodo Payments. No padding, no listed tech I haven't used in production.",
  openGraph: {
    title: "Tech Stack & Skills | Parth Madhvani",
    description:
      "React 19, TanStack Start, Django + DRF, Celery, OpenAI, Expo, Cloudflare Workers. The stack behind three shipped SaaS products.",
    url: "https://parthmadhvani.com/tech-i-know",
    type: "website",
  },
};

const TechFlex = () => {
  return (
    <div className="tech-flex mt-8">
      <div className="mb-6">
        <h1 className=" mb-2 text-neutral-200 text-xl font-semibold">
          The stack I actually ship with
        </h1>

        <p className="text-neutral-500 text-xl font-semibold">
          Grouped by depth, not breadth. Everything listed here is in production
          in one of the three products I work on (Embers, Hood Cleaning Report,
          SnapCount). Tech I&apos;ve only tinkered with is left out on purpose.
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
          People call me a full-stack engineer. I think of myself as a{" "}
          <span className="text-neutral-200 font-semibold">
            design engineer + product engineer
          </span>
          . Comfortable across the whole stack, but at my best where design,
          frontend, and product decisions meet.
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
