// page.tsx  — server component (metadata lives here)
import type { Metadata } from "next";
import WorkClient from "./work-client";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects and work experience of Siddharth Singh — Full Stack Engineer specializing in React, Next.js, Node.js, TypeScript, and real-time systems.",
  openGraph: {
    title: "Work — Siddharth Singh",
    description:
      "Projects and work experience of Siddharth Singh — Full Stack Engineer specializing in React, Next.js, Node.js, TypeScript, and real-time systems.",
    url: "https://sidonweb.com/work",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Work — Siddharth Singh",
    description:
      "Projects and work experience of Siddharth Singh — Full Stack Engineer specializing in React, Next.js, Node.js, TypeScript, and real-time systems.",
  },
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return <WorkClient />;
}
