import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./components/sidebar";
import CommandPalette from "./components/command-palette";
import MobileDock from "./components/mobile-dock";
import AskWidget from "./components/ask-widget";
import ScrollReset from "./components/scroll-reset";
import { SITE_URL, structuredData } from "./lib/seo";
import { getBlogPosts } from "./lib/posts";
// @ts-ignore
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const description =
  "I'm Siddharth Singh, a full-stack engineer in Greater Noida, India. I build fast, reliable real-time systems and AI tools with React, Next.js, TypeScript, Node.js and Kafka. Open to full-time roles and freelance.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Siddharth Singh — Full-stack Engineer in India | Real-time & AI",
    template: "%s · Siddharth Singh",
  },
  description,
  applicationName: "Siddharth Singh",
  authors: [{ name: "Siddharth Singh", url: SITE_URL }],
  creator: "Siddharth Singh",
  publisher: "Siddharth Singh",
  category: "technology",
  keywords: [
    "Siddharth Singh",
    "full-stack engineer",
    "full-stack developer India",
    "React developer",
    "Next.js developer",
    "TypeScript engineer",
    "Node.js developer",
    "real-time systems",
    "distributed systems",
    "Kafka",
    "WebSockets",
    "RAG",
    "AI engineer",
    "PostgreSQL",
    "Greater Noida",
    "hire software engineer India",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  formatDetection: { email: false, telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    firstName: "Siddharth",
    lastName: "Singh",
    username: "sidonweb",
    title: "Siddharth Singh — Full-stack Engineer",
    description,
    url: SITE_URL,
    siteName: "Siddharth Singh",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddharth Singh — Full-stack Engineer",
    description,
    creator: "@siddonweb",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getBlogPosts().map((p) => ({
    slug: p.slug,
    title: p.metadata.title,
  }));
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <ScrollReset />
        <div className="lg:grid lg:h-[100dvh] lg:grid-cols-[268px_1fr] lg:overflow-hidden">
          <Sidebar />
          <main
            id="scroll-root"
            className="relative pb-28 lg:h-[100dvh] lg:overflow-y-auto lg:pb-0"
          >
            {children}
          </main>
        </div>
        <MobileDock />
        <AskWidget />
        <CommandPalette posts={posts} />
      </body>
    </html>
  );
}
