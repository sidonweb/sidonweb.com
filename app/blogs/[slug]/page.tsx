import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/lib/posts";
import { metaData } from "app/config";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${metaData.baseUrl}/blogs/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="pt-8 sm:pt-10">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                headline: post.metadata.title,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                description: post.metadata.summary,
                image: post.metadata.image
                  ? `${metaData.baseUrl}${post.metadata.image}`
                  : `${metaData.baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
                url: `${metaData.baseUrl}/blogs/${post.slug}`,
                author: { "@type": "Person", name: metaData.name, url: metaData.baseUrl },
                publisher: { "@type": "Person", name: metaData.name },
                mainEntityOfPage: `${metaData.baseUrl}/blogs/${post.slug}`,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: metaData.baseUrl },
                  { "@type": "ListItem", position: 2, name: "Blog", item: `${metaData.baseUrl}/blogs` },
                  { "@type": "ListItem", position: 3, name: post.metadata.title, item: `${metaData.baseUrl}/blogs/${post.slug}` },
                ],
              },
            ],
          }),
        }}
      />

      <Link
        href="/blogs"
        className="group inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to writing
      </Link>

      <header className="mt-8 mb-10">
        <time className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
          {formatDate(post.metadata.publishedAt)}
        </time>
        <h1 className="title mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {post.metadata.title}
        </h1>
      </header>

      <article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>

      <div className="mt-16 border-t border-neutral-200 dark:border-white/10 pt-8">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to all posts
        </Link>
      </div>
    </section>
  );
}
