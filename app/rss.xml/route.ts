import { NextResponse } from "next/server";
import { getBlogPosts, parseTags } from "../lib/posts";
import { SITE_URL } from "../lib/seo";

const FEED_TITLE = "Siddharth Singh - Full-stack Engineer";
const FEED_DESCRIPTION =
  "Essays and notes on real-time systems, AI, and full-stack engineering by Siddharth Singh.";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getBlogPosts();
  const latestPostDate = posts[0]?.metadata.publishedAt;
  const lastBuildDate = latestPostDate
    ? new Date(latestPostDate).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blogs/${post.slug}`;
      const categories = parseTags(post.metadata.tags)
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");

      return `<item>
  <title>${escapeXml(post.metadata.title)}</title>
  <link>${url}</link>
  <guid>${url}</guid>
  <description>${escapeXml(post.metadata.summary)}</description>
  <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
  ${categories}
</item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(FEED_TITLE)}</title>
  <link>${SITE_URL}</link>
  <description>${escapeXml(FEED_DESCRIPTION)}</description>
  <language>en</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <generator>Next.js</generator>
  ${items}
</channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
