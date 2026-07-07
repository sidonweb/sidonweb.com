import Image from "next/image";
import Link from "next/link";
import { projects } from "../work/project-data";

/**
 * Featured project rows for the home page. Pulls the top projects straight
 * from the existing work data and links through to /work.
 */
export default function FeaturedWork({ limit = 3 }: { limit?: number }) {
  const featured = projects.slice(0, limit);

  return (
    <div>
      <div className="flex flex-col gap-1">
        {featured.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group -mx-3 flex items-center gap-4 sm:gap-5 rounded-xl px-3 py-3 hover:bg-neutral-50 dark:hover:bg-white/[0.03] transition-colors"
          >
            <div className="relative aspect-[16/10] w-32 sm:w-40 shrink-0 overflow-hidden rounded-lg ring-1 ring-black/5 dark:ring-white/10 bg-neutral-100 dark:bg-white/5">
              <Image
                src={project.imgurl}
                alt={`${project.title} preview`}
                fill
                sizes="160px"
                className="object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-baseline gap-3">
                <h3 className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
                  {project.year}
                </span>
                <span className="ml-auto text-neutral-300 dark:text-neutral-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-neutral-500 dark:group-hover:text-neutral-300">
                  →
                </span>
              </div>

              <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>

              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/work"
        className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
      >
        View all projects
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </div>
  );
}
