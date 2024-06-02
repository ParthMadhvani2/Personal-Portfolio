import LinkText from "../../components/ui/link";
import skillsData from "../../data/techstack.json";

interface SkillCategory {
  category: string;
  skills: string[];
}

const Development: SkillCategory[] = skillsData.Development;
const Design: SkillCategory[] = skillsData.Design;

export const metadata = {
  title: "super powers that I have",
  description: "technical and design skills I have acquired over the years",
};

const TechFlex = () => {
  return (
    <div className="tech-flex">
      <div className="mb-6">
        <h1 className=" mb-2 text-neutral-200 text-xl font-semibold">
          Super Powers that I have
        </h1>

        <p className="text-neutral-500 text-xl font-semibold">
          I've worked with a range of technologies in the web development world.
          From design to development, here are a few things I've learned along
          the way.
        </p>
      </div>
      <div className="my-12">
        <h1 className="text-xl font-semibold text-neutral-200">
          Development skills I have acquired over the years:
        </h1>
        <p className="text-xl font-semibold text-neutral-500 mt-2 mb-6">
          I'm always learning new things and I try to keep this list updated, so
          it's not an exhaustive list.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Development.map((item, index) => (
            <div
              key={index}
              className="border p-5 rounded-xl border-dashed border-neutral-700 hover:bg-neutral-900 transition-all duration-300"
            >
              <h1 className="text-xl font-semibold mb-6">{item.category}</h1>
              <div className="">
                {item.skills.map((skill, skillIndex) => (
                  <div
                    className="mb-3 flex flex-col gap-2 text-neutral-500 font-semibold"
                    key={skillIndex}
                  >
                    <p className="font-semibold">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xl text-neutral-500 mt-2 mb-6 font-semibold">
          Some people call me a{" "}
          <span className="text-neutral-200 font-semibold">
            Full Stack Developer
          </span>{" "}
          but I prefer to call myself a{" "}
          <span className="text-neutral-200 font-semibold">
            Frontend Engineer
          </span>{" "}
          because I love to work on the frontend side of things.
        </p>
      </div>{" "}
      <div className="my-12">
        <h1 className="text-xl font-semibold mb-6 text-neutral-200">
          Design skills I have acquired so far: (I'm still learning)
        </h1>
        <p className="text-xl text-neutral-500 mt-2 mb-6 font-semibold">
          I'm always learning new things and I try to keep this list updated, so
          it's not an exhaustive list.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Design.map((item, index) => (
            <div
              key={index}
              className="border p-5 rounded-xl border-dashed hover:bg-neutral-900 transition-all duration-300 border-neutral-700"
            >
              <h1 className="text-xl font-semibold mb-6">{item.category}</h1>
              <div className="">
                {item.skills.map((skill, skillIndex) => (
                  <div
                    className="mb-3 flex flex-col gap-2 text-neutral-500 font-semibold"
                    key={skillIndex}
                  >
                    <p className="font-semibold">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechFlex;
