import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../project-data";
import { metaData } from "app/config";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata | undefined> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return;
  }

  const ogImage = `${metaData.baseUrl}/og?title=${encodeURIComponent(project.title)}`;

  return {
    title: `${project.title} | Work`,
    description: project.description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Siddharth Singh`,
      description: project.description,
      type: "article",
      url: `${metaData.baseUrl}/work/${project.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Siddharth Singh`,
      description: project.description,
      images: [ogImage],
    },
  };
}

export default function ProjectDetail({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="py-2 animate-[fadeIn_0.4s_ease-out]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            creator: {
              "@type": "Person",
              name: metaData.name,
            },
            url: `${metaData.baseUrl}/work/${project.slug}`,
            image: `${metaData.baseUrl}${project.imgurl}`,
          }),
        }}
      />

      {/* 1. Top Back Button */}
      <div className="mb-6">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors group focus:outline-none"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            <path
              d="M14 8H2M2 8L6 4M2 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Work
        </Link>
      </div>

      {/* 2. Project Media Container (Video/Gif/Image) */}
      <div className="relative w-full aspect-video border border-neutral-200 dark:border-white/10 p-1 rounded-2xl overflow-hidden mb-8 bg-neutral-55 dark:bg-neutral-950">
        <div className="relative w-full h-full border border-neutral-200 dark:border-white/10 rounded-xl overflow-hidden shadow-inner">
          <Image
            alt={`${project.title} demonstration`}
            src={project.imgurl}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* 3. Links Row (GitHub, Website, Post, Video) */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all focus:outline-none"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </a>
        )}
        {project.links.website && (
          <a
            href={project.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all focus:outline-none"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Website
          </a>
        )}
        {project.links.post && (
          <a
            href={project.links.post}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all focus:outline-none"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">
              <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
            </svg>
            Post
          </a>
        )}
        {project.links.video && (
          <a
            href={project.links.video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all focus:outline-none"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 27 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.1427 2.93734C25.9915 2.37352 25.695 1.85926 25.2827 1.44603C24.8704 1.0328 24.3568 0.73509 23.7933 0.582677C21.7053 0.00934319 13.352 1.01287e-05 13.352 1.01287e-05C13.352 1.01287e-05 5 -0.00932348 2.91067 0.538677C2.3479 0.698872 1.83576 1.00105 1.42342 1.41619C1.01108 1.83133 0.712383 2.3455 0.556002 2.90934C0.00533553 4.99734 1.95353e-06 9.32801 1.95353e-06 9.32801C1.95353e-06 9.32801 -0.00533136 13.68 0.541335 15.7467C0.848002 16.8893 1.748 17.792 2.892 18.1C5.00134 18.6733 13.332 18.6827 13.332 18.6827C13.332 18.6827 21.6853 18.692 23.7733 18.1453C24.3364 17.9919 24.8497 17.6944 25.2628 17.2822C25.6759 16.87 25.9746 16.3574 26.1293 15.7947C26.6813 13.708 26.6853 9.37868 26.6853 9.37868C26.6853 9.37868 26.712 5.02534 26.1427 2.93734ZM10.68 13.34L10.6867 5.34001L17.6293 9.34668L10.68 13.34Z" />
            </svg>

            Video
          </a>
        )}
      </div>

      {/* 4. Project Name & Description */}
      <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {project.title}
        </h2>
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800">
          {project.year}
        </span>
      </div>

      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-10 text-base">
        {project.description}
      </p>

      {/* 5. Bullet Points (Achievements & Details) */}
      <div className="mb-10">
        <h3 className="text-lg font-medium text-neutral-950 dark:text-white mb-4 tracking-tight">
          Key Milestones & Technical Implementation
        </h3>
        <ul className="space-y-3">
          {project.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 6. Tech Stack Used (In the last) */}
      <div className="mb-12 border-t border-dashed border-neutral-300 dark:border-neutral-700 pt-8">
        <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
          Technologies & Tools Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <span
              key={i}
              className="text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-[#0b0c0d] border border-neutral-200 dark:border-neutral-800/80 rounded px-2.5 py-1 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 7. Bottom Back Button */}
      <div className="flex justify-center border-t border-neutral-200 dark:border-neutral-800/60 pt-8 mt-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors group focus:outline-none"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            <path
              d="M14 8H2M2 8L6 4M2 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Work
        </Link>
      </div>
    </section>
  );
}
