import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "../components/reveal";
import { getBlogPosts, formatDate, parseTags } from "../lib/posts";
import { SITE_URL } from "../lib/seo";

const description =
  "Essays and notes on real-time systems, AI, and full-stack engineering by Siddharth Singh.";

export const metadata: Metadata = {
  title: "Blogs",
  description,
  alternates: { canonical: "/blogs" },
  openGraph: {
    type: "website",
    title: "Blogs · Siddharth Singh",
    description,
    url: "/blogs",
  },
  twitter: { card: "summary_large_image", title: "Blogs · Siddharth Singh", description },
};

export default function BlogIndex() {
  const posts = getBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Siddharth Singh — Blogs",
    url: `${SITE_URL}/blogs`,
    author: { "@type": "Person", name: "Siddharth Singh", url: SITE_URL },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.metadata.title,
      datePublished: p.metadata.publishedAt,
      description: p.metadata.summary,
      url: `${SITE_URL}/blogs/${p.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal>
        <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          <span className="text-muted">Blogs</span>
          <span className="h-px w-5 bg-border" />
          <span>{posts.length} posts</span>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <h1 className="mt-5 max-w-xl font-display text-[2.2rem] font-semibold leading-[1.05] tracking-tight sm:text-[3rem]">
          Notes on building things that hold up.
        </h1>
      </Reveal>
      <Reveal delay={110}>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      </Reveal>

      <ol className="mt-14 border-t border-border">
        {posts.map((p, i) => (
          <li key={p.slug}>
            <Reveal>
              <Link
                href={`/blogs/${p.slug}`}
                className="group grid gap-x-8 gap-y-3 border-b border-border py-9 sm:grid-cols-[132px_1fr]"
              >
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:flex-col sm:items-start sm:gap-2 sm:pt-1.5">
                  <span className="tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <time dateTime={p.metadata.publishedAt}>
                    {formatDate(p.metadata.publishedAt)}
                  </time>
                  <span className="sm:text-faint">{p.readingTime} min</span>
                </div>

                <div>
                  <h2 className="font-display text-[1.4rem] font-semibold leading-snug tracking-tight text-fg decoration-border-strong underline-offset-4 transition-colors group-hover:underline sm:text-[1.7rem]">
                    {p.metadata.title}
                  </h2>
                  <p className="mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-muted">
                    {p.metadata.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-faint">
                    {parseTags(p.metadata.tags)
                      .slice(0, 3)
                      .map((t, j) => (
                        <span key={t} className="flex items-center gap-2">
                          {j > 0 && <span className="text-border-strong">·</span>}
                          {t}
                        </span>
                      ))}
                    <span className="ml-auto inline-flex translate-x-0 items-center gap-1 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>

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
