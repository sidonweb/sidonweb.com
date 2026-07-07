import "./global.css";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-switch";
import { metaData } from "./config";
import ScrollToTop from "./components/scroll-to-top";

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.name}`,
  },
  description: metaData.description,
  applicationName: metaData.name,
  authors: [{ name: metaData.name, url: metaData.baseUrl }],
  creator: metaData.name,
  publisher: metaData.name,
  category: "technology",
  keywords: [
    "Siddharth Singh",
    "sidonweb",
    "Full Stack Engineer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Real-time systems",
    "Web Developer India",
    "Greater Noida",
  ],
  formatDetection: { telephone: false, address: false, email: false },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
      "application/atom+xml": "/atom.xml",
      "application/feed+json": "/feed.json",
    },
  },
  openGraph: {
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: metaData.ogImage,
        width: 1200,
        height: 630,
        alt: metaData.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.title,
    description: metaData.description,
    site: "@siddonweb",
    creator: "@siddonweb",
    images: [metaData.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060607" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(GeistSans.variable, GeistMono.variable, "scroll-smooth")}
    >
      <body className="antialiased flex flex-col items-center justify-center mx-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-auto min-w-0 flex flex-col px-6 sm:px-4 md:px-0 max-w-[680px] w-full">
            <Navbar />
            {children}
            <Footer />
          </main>
          <Analytics />
          <SpeedInsights />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
