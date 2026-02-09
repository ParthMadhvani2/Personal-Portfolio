import React from "react";
import LinkText from "../../ui/link";

type WorkDetail = {
  title: string;
  description: string;
  link: string;
  isExternal?: boolean;
};

type WorkCategory = {
  name: string;
  details: WorkDetail[];
};

const WorkCategory: WorkCategory[] = [
  {
    name: "Projects.",
    details: [
      {
        title: "FramePhase",
        description: "AI-powered caption generator built with Next.js and WebAssembly. Developed a cutting-edge Captions Generator Application that transcribes videos and applies adjustable captions with a user- friendly editor.",
        link: "https://frame-phase.netlify.app/",
        isExternal: true,
      },
      {
        title: "Crypto Trading Dashboard",
        description: "A modern, responsive cryptocurrency trading dashboard built with Next.js 15, React 19, and TypeScript. Features real-time market data, interactive charts, advanced filtering, watchlist management, and price alerts with a professional-grade user interface.",
        link: "https://crypto-trading-dashboard-2.vercel.app/",
        isExternal: true,
      },
    ],
  },
  // {
  //   name: "Components.",
  //   details: [
  //     {
  //       title: "Crafts",
  //       description: "A collection of handcrafted UI components and micro-interactions. I explore patterns around motion, accessibility, and systematic design.",
  //       link: "/crafts",
  //       isExternal: false,
  //     },
  //   ],
  // },
  // {
  //   name: "Newsletter.",
  //   details: [
  //     {
  //       title: "Subscribe",
  //       description: "I write about interface design, design systems, and product engineering.",
  //       link: "/newsletter",
  //       isExternal: true,
  //     },
  //   ],
  // },
];

const WorkItem: React.FC<WorkDetail> = ({
  title,
  description,
  link,
  isExternal,
}) => {
  return (
    <>
      <div className=" flex flex-col gap-2 ">
        <LinkText
          href={link}
          isExternal={isExternal}
          className=" text-xl font-semibold text-neutral-200"
        >
          {title}
        </LinkText>
        <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
      </div>
    </>
  );
};

const Work: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-2 my-10">
        {WorkCategory.map((item, index) => {
          return (
            <div key={index}>
              <h1 className="mb-6 text-xl font-semibold text-neutral-200">
                {item.name}
              </h1>
              <div className="flex justify-center items-center  gap-10">
                {item.details.map((detail, index) => {
                  return (
                    <WorkItem
                      key={index}
                      title={detail.title}
                      description={detail.description}
                      link={detail.link}
                      isExternal={detail.isExternal}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Work;

