import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ViewContainer from "../components/layouts/view-container";
import Layout from "../components/layouts";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Parth Madhvani - Frontend Design Engineer",
    template: "%s | Parth Madhvani",
  },
  description:
    "Frontend design engineer specializing in fast, accessible web interfaces. Building scalable products with React, Next.js, and TypeScript. Currently available for frontend engineering roles.",
  keywords: [
    "frontend engineer",
    "Design Engineer",
    "Backend Engineer",
    "TypeScript Engineer",
    "Web3 Developer",
    "UI/UX",
  ],
  authors: [{ name: "Parth Madhvani" }],
  creator: "Parth Madhvani",
  publisher: "Parth Madhvani",
  metadataBase: new URL("https://parthmadhvani.com"),
  alternates: {
    canonical: "https://parthmadhvani.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parthmadhvani.com",
    siteName: "Parth Madhvani - Portfolio",
    title: "Parth Madhvani - Frontend Design Engineer",
    description:
      "Frontend design engineer specializing in fast, accessible web interfaces. Building scalable products with React, Next.js, and TypeScript.",
    images: [
      {
        url: "https://parthmadhvani.com/media/profile.png",
        width: 1200,
        height: 630,
        alt: "Parth Madhvani - Frontend Design Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@parthmadhvani2",
    creator: "@parthmadhvani2",
    title: "Parth Madhvani - Frontend Design Engineer",
    description:
      "Crafting fast, accessible web interfaces with React, Next.js & TypeScript",
    images: ["https://parthmadhvani.com/media/profile.png"],
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
};

const manrope = Manrope({
  subsets: ["latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-36F6K164L2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-36F6K164L2');
        `}
      </Script>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Parth Madhvani",
            jobTitle: "Frontend Design Engineer",
            url: "https://parthmadhvani.com",
            sameAs: [
              "https://twitter.com/parthmadhvani2",
              "https://linkedin.com/in/parthmadhvani",
              "https://github.com/ParthMadhvani2",
            ],
            image: "https://parthmadhvani.com/media/profile.png",
            description:
              "Frontend design engineer specializing in fast, accessible web interfaces built with React, Next.js, and TypeScript.",
          }),
        }}
      />
      <html lang="en" className={manrope.className}>
        <head>
          <link rel="shortcut icon" href="/media/favicon.png" />
          <link rel="canonical" href="https://parthmadhvani.com" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <Script async src="https://cdn.splitbee.io/sb.js" strategy="afterInteractive" />
        </head>
        <body>
          <Layout>
            <ViewContainer>{children}</ViewContainer>
          </Layout>
        </body>
      </html>
    </>
  );
}