/**
 * Single source of truth for identity, URLs and SEO. Every page, the sitemap,
 * the JSON-LD and the OG images read from here, so there is exactly one place
 * to change the canonical host.
 */

// parthmadhvani.com does not currently resolve. Canonicals pointing at a dead
// host tell Google to prefer a page it cannot fetch, which suppresses the site
// that is actually live — so the default is the URL that serves today. Set
// NEXT_PUBLIC_SITE_URL in Vercel the moment the custom domain is connected and
// every canonical, OG tag and sitemap entry follows.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://parthmadhvani2.vercel.app"
).replace(/\/$/, "");

export const site = {
  name: "Parth Madhvani",
  role: "Design engineer + product engineer",
  // The tagline is his own, carried over from the profile banner so the site
  // and the social presence say the same thing.
  tagline: "From messy problem to working product.",
  summary:
    "I build SaaS products end to end — backend, frontend, iOS, billing, design system, marketing site. Four products launched in 2026.",
  location: "Surat / Bengaluru, India",
  timezone: "Asia/Kolkata",
  email: "madhvaniparth2@gmail.com",
  url: SITE_URL,
  image: `${SITE_URL}/media/profile.jpg`,
  calendar: "https://cal.com/parth-madhvani-pjulld/30min",
  resume: "/media/resume.pdf",
  social: {
    github: "https://github.com/ParthMadhvani2",
    linkedin: "https://www.linkedin.com/in/parthmadhvani2/",
    x: "https://x.com/parthmadhvani2",
    productHunt: "https://www.producthunt.com/@parth_madhvani",
  },
  handle: "@parthmadhvani2",
  employer: { name: "Lead Catalyst", url: "https://leadcatalyst.in/" },
  education: {
    name: "A. D. Patel Institute of Technology",
    degree: "B.E. Information Technology",
    years: "2021 – 2025",
  },
  availability: {
    open: true,
    label: "Open to full-stack / design-engineer roles",
  },
} as const;

/** Terms worth ranking for. Concrete, not stuffed. */
export const keywords = [
  "Parth Madhvani",
  "design engineer",
  "product engineer",
  "full-stack engineer",
  "founding engineer",
  "React 19 engineer",
  "TanStack Start",
  "Django DRF engineer",
  "Expo React Native engineer",
  "Cloudflare Workers",
  "SaaS engineer India",
  "portfolio",
];
