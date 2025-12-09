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
        description: "AI-powered caption generator built with Next.js and AWS Transcribe. Designed for speed, accessibility, and creator workflows.",
        link: "https://frame-phase.netlify.app/",
        isExternal: true,
      },
      {
        title: "Token Portfolio",
        description: "Portfolio tracker for monitoring token holdings with live pricing, analytics, and wallet integration.",
        link: "https://token-portfolio-parth.vercel.app/",
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
              <div className="flex justify-evenly items-center w-auto">
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

