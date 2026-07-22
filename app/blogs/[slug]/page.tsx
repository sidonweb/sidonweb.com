import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPosts, getPost, formatDate, parseTags } from "../../lib/posts";
import { SITE_URL } from "../../lib/seo";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { title, summary, publishedAt } = post.metadata;
  const url = `/blogs/${post.slug}`;
  return {
    title,
    description: summary,
    keywords: parseTags(post.metadata.tags),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: summary,
      url,
      publishedTime: publishedAt,
      authors: ["Siddharth Singh"],
    },
    twitter: { card: "summary_large_image", title, description: summary },
  };
}

const PROSE = [
  "prose prose-invert mt-10 max-w-none",
  "prose-headings:font-sans prose-headings:tracking-tight prose-headings:text-fg",
  "prose-h2:mt-12 prose-h2:mb-3 prose-h2:text-[1.45rem] prose-h2:font-semibold",
  "prose-h3:mt-9 prose-h3:mb-2 prose-h3:text-[1.2rem] prose-h3:font-semibold",
  "prose-h4:text-[1.05rem] prose-h4:font-medium",
  "prose-p:text-[15px] prose-p:leading-relaxed",
  "prose-li:text-[15px] prose-li:leading-relaxed",
  "prose-a:text-accent-strong prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
  "prose-strong:text-fg prose-strong:font-semibold",
  "prose-code:before:content-none prose-code:after:content-none prose-code:font-normal",
  "prose-blockquote:border-l-accent prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-muted",
  "prose-hr:border-border prose-img:rounded-xl prose-img:border prose-img:border-border",
  "prose-pre:border prose-pre:border-border prose-pre:bg-bg-2",
].join(" ");

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getBlogPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const post = posts[index];
  const next = posts[(index + 1) % posts.length];
  const tags = parseTags(post.metadata.tags);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: post.metadata.summary,
    keywords: tags.join(", "),
    url: `${SITE_URL}/blogs/${post.slug}`,
    author: { "@type": "Person", name: "Siddharth Singh", url: SITE_URL },
    publisher: { "@type": "Person", name: "Siddharth Singh" },
    mainEntityOfPage: `${SITE_URL}/blogs/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:px-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Blogs
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt)}
          </time>
          <span className="text-border-strong">/</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h1 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,2.7rem)] font-semibold leading-[1.08] tracking-tight text-balance">
          {post.metadata.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted text-pretty">
          {post.metadata.summary}
        </p>
        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {tags.slice(0, 6).map((t) => (
              <span
                key={t}
                className="rounded border border-border-soft bg-bg-2 px-1.5 py-0.5 font-mono text-[10.5px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-8 border-t border-border" />

      <div className={PROSE}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      <div className="mt-16 border-t border-border pt-8">
        <Link href={`/blogs/${next.slug}`} className="group block">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            Next post
          </div>
          <div className="mt-2 flex items-center justify-between gap-4">
            <span className="font-display text-xl font-semibold tracking-tight text-fg transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
              {next.metadata.title}
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-faint transition-all group-hover:translate-x-1 group-hover:text-accent" />
          </div>
        </Link>
      </div>
    </article>
  );
}
