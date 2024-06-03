import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ViewContainer from "../components/layouts/view-container";
import Layout from "../components/layouts";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Parth Madhvani",
    template: "%s | Parth Madhvani",
  },
  description:
    "Hey! I am an engineer (designer, most of the times), learning how to build and design scalable websites and applications.",
  twitter: {
    card: "summary_large_image",
    site: "@parthmadhvani2",
    creator: "@parthmadhvani2",
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
      <html lang="en" className={manrope.className}>
        <head>
          <link rel="shortcut icon" href="/media/favicon.png" />
          <meta name="title" content="Parth Madhvani" />
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