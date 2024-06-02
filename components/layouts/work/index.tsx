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
        description: "A simple Captions Generator Application ",
        link: "https://frame-phase.netlify.app/",
        isExternal: true,
      },
      {
        title: "Github Landing Page",
        description: "Re-created github.com/home page",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
    ],
  },
  {
    name: "Components.",
    details: [
      {
        title: "Crafts",
        description: "Implementing interfaces and interactions.",
        link: "/crafts",
        isExternal: false,
      },
    ],
  },
  {
    name: "Building.",
    details: [
      {
        title: "FreshFruitHub",
        description: "Your Virtual Marketplace for Fresh Groceries",
        link: "/crafts",
        isExternal: false,
      },
    ],
  },
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
        <p className="text-xl font-semibold text-neutral-500">{description}</p>
      </div>
    </>
  );
};

const Work: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-10">
        {WorkCategory.map((item, index) => {
          return (
            <div key={index}>
              <h1 className="mb-6 text-xl font-semibold text-neutral-200">
                {item.name}
              </h1>
              <div>
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

