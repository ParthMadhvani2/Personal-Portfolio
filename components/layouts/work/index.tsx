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
  subtitle?: string;
  details: WorkDetail[];
};

const WorkCategory: WorkCategory[] = [
  {
    name: "Building at Lead Catalyst.",
    subtitle:
      "Full-stack engineer at Lead Catalyst, a SaaS product studio. Three live products I work on end to end: backend, frontend, mobile, billing, and the marketing surfaces.",
    details: [
      {
        title: "Embers",
        description:
          "LinkedIn engagement-to-lead pipeline for founders and ghostwriters. Hourly Apify scrape, 5-dimensional lead scoring, 7-dimension AI ICP matching, voice-matched DM drafts. Django + DRF + Celery + Redis + OpenAI on the backend; React 19 + TanStack Start SSR on Cloudflare Workers; 5-tier billing via Dodo Payments.",
        link: "https://useembers.com",
        isExternal: true,
      },
      {
        title: "Hood Cleaning Report",
        description:
          "NFPA 96 compliance reports for commercial kitchen exhaust contractors. Django + DRF backend with multi-tenant workspaces, CompanyCam OAuth (Fernet-encrypted tokens, HMAC-SHA1 webhooks), Document Vault with signed share URLs and audit logging, block-based PDF generation via Playwright, photo storage on Cloudflare R2.",
        link: "https://hoodcleaningreport.com",
        isExternal: true,
      },
      {
        title: "SnapCount",
        description:
          "Real-time multiplayer tally counter, iOS + web. Expo SDK 53 with TurboModules and Hermes; SSE-based sync over an Express backend; TanStack Start web app on Cloudflare Workers. Marketing site in 5 languages with free SEO tools, programmatic vertical landing pages, and dynamic sitemap.",
        link: "https://snapcount.app",
        isExternal: true,
      },
    ],
  },
  {
    name: "Experiments.",
    details: [
      {
        title: "FramePhase",
        description:
          "AI-powered video caption generator. Next.js + WebAssembly. Earlier personal experiment in browser-side ML inference.",
        link: "https://frame-phase.netlify.app/",
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
      <div className="grid grid-cols-1 gap-10 my-10">
        {WorkCategory.map((item, index) => {
          return (
            <div key={index}>
              <h1 className="mb-2 text-xl font-semibold text-neutral-200">
                {item.name}
              </h1>
              {item.subtitle && (
                <p className="mb-6 text-sm text-neutral-500 leading-relaxed max-w-2xl">
                  {item.subtitle}
                </p>
              )}
              <div className="flex flex-col gap-8">
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
