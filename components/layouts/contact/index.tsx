import LinkText from "../../../components/ui/link";

interface ContactProps {
  contactType: string;
  contactLink: string;
}
interface ContactCategory {
  name: string;
  details: ContactProps[];
}

const ContactCategory: ContactCategory[] = [
  {
    name: "Twitter",
    details: [
      {
        contactType: "@parthmadhvani2",
        contactLink: "https://twitter.com/parthmadhvani2",
      },
    ],
  },
  {
    name: "LinkedIn",
    details: [
      {
        contactType: "Parth Madhvani",
        contactLink: "https://www.linkedin.com/in/parthmadhvani2/",
      },
    ],
  },
  {
    name: "GitHub",
    details: [
      {
        contactType: "ParthMadhvani2",
        contactLink: "https://github.com/ParthMadhvani2",
      },
    ],
  },
  {
    name: "Schedule a meet",
    details: [
      {
        contactType: "@parthmadhvani2",
        contactLink: "https://cal.com/parth-madhvani-pjulld/30min",
      },
    ],
  },
  {
    name: "Resume",
    details: [
      {
        contactType: "@parthmadhvani2",
        contactLink: "/resume",
      },
    ],
  },
];

const Contact: React.FC = () => {
  return (
    <div>
      <h1 className=" text-xl font-semibold text-neutral-500 mb-6">
        You can reach me at:{" "}
        <LinkText
          href="https://twitter.com/parthmadhvani2"
          target="_blank"
          className="text-neutral-200"
          isExternal={false}
        >
          @parthmadhvani2
        </LinkText>{" "}
        or{" "}
        <LinkText
          href="mailto:madhvaniparth2@gmail.com"
          target="_blank"
          className="text-neutral-200"
          isExternal={false}
        >
          madhvaniparth2@gmail.com
        </LinkText>
      </h1>
      <p className="text-neutral-500 mb-6 font-semibold text-xl">
        I’m currently open to frontend engineering roles — feel free to reach out or say hi.
      </p>
      <h1 className="text-xl font-semibold text-neutral-500 mb-6">
        Find me on:
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ContactCategory.map((item, index) => {
          return (
            <div key={index}>
              {item.details.map((detail, index) => {
                return (
                  <LinkText
                    key={index}
                    href={detail.contactLink}
                    target="_self"
                    isExternal={true}
                    className="text-xl font-semibold text-neutral-200"
                  >
                    {item.name}
                  </LinkText>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;

