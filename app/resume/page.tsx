import type { Metadata } from "next";
import LinkText from "../../components/ui/link";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Resume | Parth Madhvani",
  description:
    "Resume for Parth Madhvani. Full-stack engineer shipping three live SaaS products: Embers, Hood Cleaning Report, and SnapCount.",
  openGraph: {
    title: "Resume | Parth Madhvani",
    description:
      "Design engineer + product engineer. Solo founder building three SaaS products in production.",
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
                href="/Parth-Madhvani-Resume.pdf"
                target="_blank"
                isExternal={true}
                className="text-black bg-slate-200 p-2 rounded-md hover:brightness-110"
              >
                Download Resume (PDF)
              </LinkText>{" "}
            </p>
          </div>
          <p className="text-neutral-500 text-sm text-center mt-4 max-w-md mx-auto">
            Or reach out directly:{" "}
            <a
              href="mailto:madhvaniparth2@gmail.com"
              className="text-neutral-300 underline underline-offset-4"
            >
              madhvaniparth2@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResumeView;
