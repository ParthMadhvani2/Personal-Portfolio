import LinkText from "../../components/ui/link";
import Image from 'next/image';

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
                href="https://drive.google.com/file/d/1-sI9H2A2M0OFsxidNFJbq5TyLq6jFiA3/view?usp=sharing"
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
