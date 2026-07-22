import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "../../components/reveal";
import Button from "../../components/button";
import { projects } from "../../lib/data";
import { SITE_URL } from "../../lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const url = `/work/${project.slug}`;
  return {
    title: `${project.title} — ${project.kind}`,
    description: project.summary,
    keywords: project.stack,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${project.title} · Siddharth Singh`,
      description: project.tagline,
      url,
      images: [{ url: project.image, alt: `${project.title} preview` }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.summary,
    url: `${SITE_URL}/work/${project.slug}`,
    image: `${SITE_URL}${project.image}`,
    keywords: project.stack.join(", "),
    dateCreated: String(project.year),
    author: { "@type": "Person", name: "Siddharth Singh", url: SITE_URL },
  };

  return (
    <article className="mx-auto max-w-4xl px-5 py-10 sm:px-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Work
        </Link>
      </Reveal>

      <Reveal delay={50}>
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="text-accent-dim">{project.kind}</span>
          <span className="text-border-strong">/</span>
          <span className="text-faint">{project.year}</span>
          <span className="text-border-strong">/</span>
          <span className="inline-flex items-center gap-1.5 text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {project.status}
          </span>
        </div>
      </Reveal>

      <Reveal delay={90}>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.6vw,2.9rem)] font-semibold leading-[1.06] tracking-tight">
          {project.title}
        </h1>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-4 max-w-2xl text-lg leading-snug text-muted text-balance">
          {project.tagline}
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {project.links.map((link, i) => (
            <Button
              key={link.href}
              href={link.href}
              external
              variant={i === 0 ? "primary" : "secondary"}
            >
              {link.label}
              <ArrowUpRight aria-hidden className={`h-4 w-4 ${i === 0 ? "" : "text-faint"}`} />
            </Button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={110}>
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-bg-2">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.7fr] md:gap-14">
        <Reveal>
          <div className="space-y-7 md:sticky md:top-6 md:self-start">
            <div>
              <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Overview
              </div>
              <p className="text-[14px] leading-relaxed text-muted">
                {project.summary}
              </p>
            </div>
            <div>
              <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Stack
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-border bg-surface/60 px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <div>
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
              How it works
            </div>
            <ol className="space-y-0">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex gap-4 border-b border-border py-5 first:pt-0 last:border-0"
                >
                  <span className="shrink-0 font-mono text-xs text-accent-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[14px] leading-relaxed text-fg/85">{h}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 border-t border-border pt-8">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            Next project
          </div>
          <div className="mt-2 flex items-center justify-between gap-4">
            <span className="font-display text-2xl font-semibold tracking-tight text-fg transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
              {next.title}
            </span>
            <ArrowRight className="h-6 w-6 shrink-0 text-faint transition-all group-hover:translate-x-1 group-hover:text-accent" />
          </div>
        </Link>
      </div>
    </article>
  );
}
