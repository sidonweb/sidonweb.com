import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";
import PageHeader from "app/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Siddharth Singh on full-stack engineering, React, Next.js, system design, and building for the real world.",
  alternates: {
    canonical: "/blogs",
  },
};

export default function BlogPosts() {
  const allBlogs = getBlogPosts().sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  );

  return (
    <section>
      <PageHeader
        label="Writing"
        title="Thoughts, opinions & ideas"
        description="Notes on engineering, system design, and the things I learn while building."
      />

      <div className="mt-10 flex flex-col">
        {allBlogs.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group -mx-3 rounded-xl px-3 py-5 hover:bg-neutral-50 dark:hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-4">
                {post.metadata.title}
              </h2>
              <time className="shrink-0 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                {formatDate(post.metadata.publishedAt, false)}
              </time>
            </div>
            {post.metadata.summary && (
              <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                {post.metadata.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
