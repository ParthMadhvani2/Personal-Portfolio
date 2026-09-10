import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { display, mono, sans } from "../lib/fonts";
import "./globals.css";
import { keywords, site, SITE_URL } from "../data/site";
import { products } from "../data/products";
import { themeScript } from "../lib/theme-script";
import SiteNav from "../components/site/nav";
import SiteFooter from "../components/site/footer";

const title = `${site.name} · ${site.role}`;
const description = `${site.tagline} ${site.summary}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${site.name}` },
  description,
  keywords,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  applicationName: site.name,
  category: "technology",
  openGraph: {
    type: "profile",
    firstName: "Parth",
    lastName: "Madhvani",
    username: "parthmadhvani2",
    locale: "en_US",
    url: SITE_URL,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    site: site.handle,
    creator: site.handle,
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // One per scheme, so the browser chrome matches the page in both themes
  // instead of pinning black over a light background.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
  ],
};

/**
 * Structured data. A single @graph rather than several disconnected blobs, so
 * the Person, the site and each product are explicitly linked by @id, which is
 * what lets a knowledge panel resolve "who built SnapCount" to this page.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: site.name,
      alternateName: "parthmadhvani2",
      jobTitle: site.role,
      description: site.summary,
      url: SITE_URL,
      image: site.image,
      email: `mailto:${site.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      worksFor: {
        "@type": "Organization",
        name: site.employer.name,
        url: site.employer.url,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: site.education.name,
      },
      knowsAbout: [
        "Design engineering",
        "Product engineering",
        "React",
        "TypeScript",
        "Django",
        "React Native",
        "Cloudflare Workers",
        "PostgreSQL",
        "Interface animation",
      ],
      sameAs: [
        site.social.x,
        site.social.linkedin,
        site.social.github,
        site.social.productHunt,
        site.social.peerlist,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${site.name} · portfolio`,
      description,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
    ...products
      .filter((p) => p.status === "live")
      .map((p) => ({
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/work/${p.slug}#app`,
        name: p.name,
        description: p.summary,
        url: p.url,
        applicationCategory: "BusinessApplication",
        operatingSystem: p.slug === "snapcount" ? "iOS, Web" : "Web",
        author: { "@id": `${SITE_URL}/#person` },
        ...(p.launch
          ? {
              datePublished: p.launch.date,
              sameAs: `https://www.producthunt.com/products/${p.launch.slug}`,
            }
          : {}),
      })),
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Runs before first paint so a stored theme never flashes the wrong one. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Feed auto-discovery. Written by hand because Next 14's
            alternates.types accepts the value and emits nothing. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`Notes · ${site.name}`}
          href="/notes/rss.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-line focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-36F6K164L2"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-36F6K164L2');`}
        </Script>
      </body>
    </html>
  );
}
