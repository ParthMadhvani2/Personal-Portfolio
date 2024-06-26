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
    description: "JavaScript library",
    icon: <SiIcons.SiReact />,
    link: "https://reactjs.org",
    isExternal: true,
  },
  {
    name: "TypeScript",
    description: "Typed JavaScript",
    icon: <SiIcons.SiTypescript />,
    link: "https://www.typescriptlang.org",
    isExternal: true,
  },
  {
    name: "Next.js",
    description: "React framework",
    icon: <SiIcons.SiNextdotjs />,
    link: "https://nextjs.org",
    isExternal: true,
  },
  {
    name: "Tailwind CSS",
    description: "CSS framework",
    link: "https://tailwindcss.com",
    icon: <SiIcons.SiTailwindcss />,
    isExternal: true,
  },
  {
    name: "Figma",
    description: "design tool",
    link: "https://figma.com",
    icon: <SiIcons.SiFigma />,
    isExternal: true,
  },
  {
    name: "framer motion",
    link: "https://www.framer.com/motion/",
    description: "animation library",
    icon: <SiIcons.SiFramer />,
    isExternal: true,
  },
];

const TechStack: React.FC = () => {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-500">
        Super cool tech stack i know about
        <span className="text-neutral-200 font-semibold ml-4  hidden sm:inline-block">
          :hover on the icons:
        </span>
      </h1>

      <div className="grid grid-cols-6 gap-2 mb-6 ">
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
          This is not an exhaustive list.
        </p>
        <p className="text-xl font-semibold text-neutral-500 mb-6 mt-2">
          I'm always learning new things and I try to keep this list updated.
        </p>
      </div>
      <div className="text-xl font-semibold text-neutral-500">
        All the tech I know about is listed →{" "}
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

