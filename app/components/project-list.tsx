import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./reveal";
import { projects } from "../lib/data";

export default function ProjectList({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <div className="mt-6">
      {items.map((p, i) => (
        <Reveal key={p.slug} delay={Math.min(i, 5) * 35}>
          <Link
            href={`/work/${p.slug}`}
            className="group flex items-center gap-4 border-t border-border py-4 last:border-b sm:gap-5 sm:py-5"
          >
            <span className="hidden w-6 shrink-0 font-mono text-xs text-faint sm:block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-bg-2 sm:h-12 sm:w-20">
              <Image
                src={p.image}
                alt={`${p.title} thumbnail`}
                fill
                sizes="80px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[17px] font-semibold tracking-tight text-fg sm:text-lg">
                {p.title}
              </h3>
              <p className="mt-0.5 truncate font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                {p.kind}
              </p>
            </div>
            <span className="hidden shrink-0 font-mono text-xs text-muted sm:block">
              {p.year}
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
