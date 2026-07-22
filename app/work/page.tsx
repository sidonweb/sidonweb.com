import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Reveal from "../components/reveal";
import ProjectGrid from "../components/project-grid";
import { projects } from "../lib/data";
import { SITE_URL } from "../lib/seo";

const description =
  "Selected full-stack, real-time systems, AI, and product engineering work by Siddharth Singh.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    title: "Work - Siddharth Singh",
    description,
    url: "/work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work - Siddharth Singh",
    description,
  },
};

export default function WorkIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Siddharth Singh - Work",
    description,
    url: `${SITE_URL}/work`,
    author: { "@type": "Person", name: "Siddharth Singh", url: SITE_URL },
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.summary,
      url: `${SITE_URL}/work/${p.slug}`,
      image: `${SITE_URL}${p.image}`,
      keywords: p.stack.join(", "),
      dateCreated: String(p.year),
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal>
        <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          <span className="text-muted">Work</span>
          <span className="h-px w-5 bg-border" />
          <span>{projects.length} projects</span>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <h1 className="mt-5 max-w-2xl font-display text-[2.2rem] font-semibold leading-[1.05] tracking-tight sm:text-[3rem]">
          Products, systems, and tools built to hold up.
        </h1>
      </Reveal>
      <Reveal delay={110}>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      </Reveal>

      <ProjectGrid />

      <div className="mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
        </Link>
      </div>
    </div>
  );
}
