import { cn } from "../../../lib/cn";
import LinkText from "../../../components/ui/link";
import Image from "next/image";
import Seperator from "../../../components/ui/seperator";

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn("pb-8", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-10 lg:gap-16 items-start">
        <article className="order-2 lg:order-1">
          <div className="space-y-2">
            <h1 className="text-neutral-50 text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Parth Madhvani{" "}
            </h1>
            <p className="text-neutral-400 text-xl lg:text-2xl font-normal">
              Frontend / Design Engineer
            </p>
          </div>

          <Seperator />

          <div className="space-y-5 text-base lg:text-lg leading-relaxed">
            <p className="text-neutral-400 max-w-2xl">
              I craft fast, thoughtfully designed web interfaces with a strong
              focus on UX, interaction design, and clean engineering. I’ve
              worked with early-stage startups across AI, automation, and
              blockchain—helping teams build 0 → 1 products with clarity, speed,
              and scalable systems.
            </p>

            <p className="text-neutral-200 font-medium max-w-2xl">
              I’m currently exploring frontend or frontend-heavy full-stack
              roles at early-stage startups.
              <br />
            </p>
            <div className="mt-8">
              <LinkText
                href="https://cal.com/parth-madhvani-pjulld/30min"
                target="_blank"
                isExternal={true}
                className="inline-flex items-center gap-2
                       bg-neutral-100 text-neutral-900 
                       px-5 py-2.5 rounded-lg
                       text-sm font-semibold
                       hover:bg-white
                       transition-all duration-200
                       shadow-sm"
              >
                book a 30-min intro call
              </LinkText>
            </div>
            <div className="mt-4 text-neutral-400 text-sm">
              or view my{" "}
              <LinkText
                href="/resume"
                target="_self"
                isExternal={false}
                className="text-neutral-200 underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-400 transition-colors"
              >
                resume
              </LinkText>
            </div>
          </div>
        </article>

        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative group w-full max-w-[240px] lg:max-w-[260px]">
            {/* Subtle glow */}
            <div className="absolute -inset-2 bg-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/media/profile.jpg"
                fill
                className="object-cover object-top
                           shadow-xl shadow-black/30
                           transition-transform duration-500
                           group-hover:scale-105"
                alt="Parth Madhvani - Frontend Design Engineer"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
