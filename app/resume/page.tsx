import type { Metadata } from "next";
import LinkText from "../../components/ui/link";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Resume | Parth Madhvani",
  description:
    "View Parth Madhvani's resume - Frontend design engineer with experience in React, Next.js, TypeScript, and building scalable web interfaces.",
  openGraph: {
    title: "Resume | Parth Madhvani",
    description:
      "Frontend design engineer specializing in fast, accessible web interfaces. View resume and experience.",
    url: "https://parthmadhvani.com/resume",
    type: "website",
  },
};

const ResumeView: React.FunctionComponent = () => {
  return (
    <>
      <div className="resume-view-container">
        <div className={'my-10'}>
          <Image
            src={'/media/resume.png'}
            width={'360'}
            height={'200'}
            alt={'resume-cover'}
            className={'resume-cover rounded-md border shadow-lg mx-auto'}
            priority
          />
          <div
            className={
              'resume-viewer-actions-list-wrapper mt-8 mx-auto w-fit flex flex-row items-center justify-start gap-4'
            }>
            <p className="mt-6">
              <LinkText
                href="https://drive.google.com/file/d/1qJW4_-nIwJiPknJekF94SkW2T8EyNXNH/view?usp=sharing"
                target="_blank"
                isExternal={true}
                className="text-black bg-slate-200 p-2 rounded-md hover:brightness-110"
              >
                Resume on Drive
              </LinkText>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeView;
