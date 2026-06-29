import type { Metadata } from "next";
import { Bitter, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LOGO_STATIC } from "@/lib/brand";
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
  title: {
    default: "Boomer Ball | Oklahoma Sooners Football Analytics",
    template: "%s | Boomer Ball",
  },
  description:
    "Fan-inspired Oklahoma Sooners college football analytics — 2025 season stats, roster, schedule, news, and premium advanced metrics. Boomer Sooner!",
  metadataBase: new URL("https://boomerball.app"),
  icons: {
    icon: "/logo/favicon.png",
    apple: "/logo/boomer-ball-icon.png",
  },
  openGraph: {
    title: "Boomer Ball — Sooners Football Analytics",
    description: "Crimson & cream stats for Sooner Nation. boomerball.app",
    siteName: "Boomer Ball",
    images: [
      {
        url: LOGO_STATIC,
        width: 1536,
        height: 1024,
        alt: "Boomer Ball logo",
      },
    ],
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
