import React from 'react';
import LinkText from "../../components/ui/link";

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
    name: "Crafts.",
    details: [
      {
        title: "iOS inspired application dock",
        description: "Implementing interfaces and interactions.",
        link: "https://frame-phase.netlify.app/",
        isExternal: true,
      },
      {
        title: "a playable textbox with alignment features",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "spotify inspired lyrics control",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "GitHub inspired PR timeline view",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Calendar UI",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Painting using JS",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Shareable content across lists",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Cards animation in deck",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Notion-like component",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "iOS inspired widgets",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "a simple container with tags in marquee",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "GitHub inspired comment textbox with MD support & image paste",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "OTP Verification",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Magical Authentication Flow",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Animated cards grid",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Glass components",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Onboarding flow",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Custom Command Palette",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Toast",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Tailwind Card",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Navbar Hover",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Moving Tailwind Card",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Meteor Effect",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Loader",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Keyboard Events",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Type writter effect",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Hover Gradient Reveal",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Text Gradient",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Gradient Border",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Stacked Cards UI",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Animated Border Gradient",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Gradient Border",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
      },
      {
        title: "Gradient Border",
        description: "Implementing interfaces and interactions.",
        link: "https://github-landing.parthmadhvani2.vercel.app/",
        isExternal: true,
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
      <div className=" flex flex-col my-4 ">
        <LinkText
          href={link}
          isExternal={isExternal}
          className=" text-xl font-semibold text-neutral-200"
        >
          {title}
        </LinkText>
          <p className="text-md font-semibold text-neutral-500">{description}</p>
      </div>
    </>
  );
};

const Crafts: React.FC = () => {

  return (
    <>
      <div className="flex flex-col gap-2 my-10">
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

export default Crafts;
