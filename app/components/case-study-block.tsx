"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import Reveal from "./reveal";
import { caseStudies } from "../lib/data";

export default function CaseStudyBlock() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = badgeRef.current;
    if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  return (
    <div className="relative mt-6" onMouseMove={onMove}>
      <div
        ref={badgeRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden will-change-transform transition-transform duration-300 ease-out md:block"
      >
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-black px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_8px_22px_-6px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out ${
            active ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          Read case study <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-6">
        {caseStudies.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 2) * 70}>
            <Link
              href={`/work/${c.slug}`}
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
              className="group block md:cursor-none"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-bg-2">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={`${c.title} — ${c.kind} case study by Siddharth Singh`}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-border-strong" />
                  </div>
                )}
              </div>

              <div className="mt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-fg">
                    {c.title}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-muted">
                    {c.year}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em]">
                  <span className="text-accent-strong">Case study</span>
                  <span className="text-border-strong">/</span>
                  <span className="text-muted">{c.kind}</span>
                </div>
                <p className="mt-3 line-clamp-2 text-[14.5px] leading-relaxed text-fg/75">
                  {c.tagline}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.accentStack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-bg-2 px-2.5 py-0.5 font-mono text-[10.5px] text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
