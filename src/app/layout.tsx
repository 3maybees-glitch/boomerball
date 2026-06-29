import type { Metadata } from "next";
import { Bitter, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  pageMetadata,
  siteJsonLdGraph,
} from "@/lib/seo";
import "./globals.css";

const displayFont = Bitter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...pageMetadata({
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Sports",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo/favicon.png",
    apple: "/logo/boomer-ball-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-western-pattern antialiased">
        <JsonLd data={siteJsonLdGraph()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
