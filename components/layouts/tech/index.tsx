import LinkText from "../../../components/ui/link";
import Tooltip from "../../../components/ui/tooltip";
import React from "react";
import * as SiIcons from "react-icons/si";

interface TechIKnow {
  name: string;
  description?: string;
  link?: string;
  icon?: React.ReactNode;
  isExternal: boolean;
}

const TechIKnow: TechIKnow[] = [
  {
    name: "React",
    description: "Scalable UI architecture",
    icon: <SiIcons.SiReact />,
    link: "https://reactjs.org",
    isExternal: true,
  },
  {
    name: "Next.js",
    description: "Full-stack React framework",
    icon: <SiIcons.SiNextdotjs />,
    link: "https://nextjs.org",
    isExternal: true,
  },
  {
    name: "TypeScript",
    description: "Type-safe application development",
    icon: <SiIcons.SiTypescript />,
    link: "https://www.typescriptlang.org",
    isExternal: true,
  },
  {
    name: "Node.js",
    description: "Backend services & APIs",
    icon: <SiIcons.SiNodedotjs />,
    link: "https://nodejs.org",
    isExternal: true,
  },
  {
    name: "PostgreSQL",
    description: "Production-grade relational database",
    icon: <SiIcons.SiPostgresql />,
    link: "https://www.postgresql.org",
    isExternal: true,
  },
  {
    name: "Redis",
    description: "Caching & real-time data layer",
    icon: <SiIcons.SiRedis />,
    link: "https://redis.io",
    isExternal: true,
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first UI styling",
    icon: <SiIcons.SiTailwindcss />,
    link: "https://tailwindcss.com",
    isExternal: true,
  },
  {
    name: "Docker",
    description: "Containerized deployment",
    icon: <SiIcons.SiDocker />,
    link: "https://www.docker.com",
    isExternal: true,
  },
];

const TechStack: React.FC = () => {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-500">
        technologies i work with daily
        <span className="text-neutral-200 font-semibold ml-2 hidden sm:inline-block">
          :hover on the icons:
        </span>
      </h1>

      <div className="grid grid-cols-8 gap-2 mb-6">
        {TechIKnow.map((item, index) => {
          return (
            <div key={index}>
              {item.icon ? (
                <Tooltip
                  text={item.name}
                  description={item.description}
                  position="top"
                >
                  <div className="p-4 rounded-full bg-neutral-800 my-3 cursor-pointer group hover:bg-neutral-700">
                    <div className="flex flex-col items-center justify-center text-xl lg:text-3xl text-neutral-400 group-hover:text-neutral-200 transition-all duration-200">
                      {item.icon}
                    </div>
                  </div>
                </Tooltip>
              ) : (
                <h1 className="text-xl font-semibold mb-6 text-neutral-700">
                  {item.name}
                </h1>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <p className="text-xl font-semibold text-neutral-500">
          this is a curated selection of the tools, frameworks, and platforms i use to build fast, scalable, and delightful products.
        </p>
      </div>
      <div className="text-xl font-semibold text-neutral-500">
        All the tech I know is listed →{" "}
        <LinkText
          className="mb-6 text-xl font-semibold text-neutral-200"
          href="/tech-i-know"
          isExternal={false}
        >
          here
        </LinkText>
      </div>
    </div>
  );
};

export default TechStack;

