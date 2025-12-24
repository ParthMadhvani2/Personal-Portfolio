import { cn } from "../../../lib/cn";
import LinkText from "../../../components/ui/link";
import Image from "next/image";
import Seperator from "../../../components/ui/seperator";

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn("border-b border-dashed pb-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        <article className="col-span-2">
          <div>
            <div className="heading">
              <h1 className=" text-neutral-200 transition-all duration-300 text-5xl font-extrabold tracking-tighter">
                Parth Madhvani{" "}
              </h1>
              <p className="font-semibold text-neutral-200 mt-2 text-xl transition-all duration-300">
                Frontend / Design Engineer
              </p>
            </div>
          </div>
          <Seperator />
          <div className="description  flex flex-col text-xl font-semibold text-neutral-500 ">
            <p>
              I craft fast, thoughtfully designed web interfaces with a strong focus on UX, interaction design, and clean engineering. I’ve worked with early-stage startups across AI, automation, and blockchain—helping teams build 0 → 1 products with clarity, speed, and scalable systems.
            </p>

            <p className="mt-4 text-neutral-200">
              I’m currently exploring frontend or frontend-heavy full-stack roles at early-stage startups.<br />
            </p>
            <p className="mt-6">
              <LinkText
                href="https://cal.com/parth-madhvani-pjulld/30min"
                target="_blank"
                isExternal={true}
                className="text-black bg-slate-200 p-2 rounded-md hover:brightness-110"
              >
                Book a 30-min intro call
              </LinkText>{" "}
            </p>
            <p className="mt-4">
              or view my → &nbsp;
              <LinkText
                href="/resume"
                target="_self"
                isExternal={false}
                className="text-neutral-200 "
              >
                Resume
              </LinkText>{" "}
            </p>
          </div>
        </article>
        <figure className="col-span-2 hidden lg:block p-4">
          <Image
            src="/media/profile.png"
            width={500}
            height={500}
            className="outline-none
            hover:ring-8 ring-gradient-to-b from-neutral-400 to-neutral-800 ring-neutral-700 border-none hover:ring-offset-4 ring-offset-neutral-600 ring-opacity-50 cursor-pointer
            transition-all duration-300 rounded-xl"
            alt="Parth Madhvani - Frontend Design Engineer"
            priority
          />
        </figure>
      </div>
    </section>
  );
};

export default Hero;

