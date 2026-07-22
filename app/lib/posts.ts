import fs from "fs";
import path from "path";

export type PostMeta = {
  title: string;
  publishedAt: string;
  summary: string;
  tags: string;
  image?: string;
};

export type Post = {
  slug: string;
  metadata: PostMeta;
  content: string;
  readingTime: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function normalizeContent(content: string): string {
  return content.replace(/<Image\b[\s\S]*?\/?>/g, (block) => {
    const src = block.match(/src=["']([^"']+)["']/)?.[1];
    const alt = block.match(/alt=["']([^"']+)["']/)?.[1] ?? "";
    return src ? `\n![${alt}](${src})\n` : "";
  });
}

function parseFrontmatter(file: string) {
  const regex = /---\s*([\s\S]*?)\s*---/;
  const match = regex.exec(file);
  const block = match ? match[1] : "";
  const content = file.replace(regex, "").trim();
  const metadata: Partial<PostMeta> = {};
  block
    .trim()
    .split("\n")
    .forEach((line) => {
      const [key, ...rest] = line.split(": ");
      if (!key) return;
      const value = rest.join(": ").trim().replace(/^['"](.*)['"]$/, "$1");
      metadata[key.trim() as keyof PostMeta] = value;
    });
  return { metadata: metadata as PostMeta, content };
}

export function getBlogPosts(): Post[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => path.extname(f) === ".mdx");

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const parsed = parseFrontmatter(raw);
      const content = normalizeContent(parsed.content);
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        slug: path.basename(file, ".mdx"),
        metadata: parsed.metadata,
        content,
        readingTime: Math.max(1, Math.round(words / 200)),
      };
    })
    .sort(
      (a, b) =>
        +new Date(b.metadata.publishedAt) - +new Date(a.metadata.publishedAt),
    );
}

export function getPost(slug: string): Post | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
  const value = date.includes("T") ? date : `${date}T00:00:00`;
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function parseTags(tags?: string): string[] {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
