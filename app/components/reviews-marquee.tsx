"use client";

import { useEffect, useRef } from "react";
import { testimonials, type Testimonial } from "../lib/data";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
          className={`h-3 w-3 ${i < n ? "text-warning" : "text-border-strong"}`}
        >
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.7l-4.95 2.6.95-5.5-4-3.9 5.53-.8L10 1.6z" />
        </svg>
      ))}
    </div>
  );
}

function Item({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[270px] shrink-0 flex-col border-l border-border pl-6 pr-8 sm:w-[340px]">
      <Stars n={t.rating} />
      <p className="mt-4 font-display text-[17px] leading-snug tracking-tight text-fg">
        {t.highlight}
      </p>
      <blockquote className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
        {t.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-2 text-[12.5px]">
        <span className="font-medium text-fg">{t.name}</span>
        <span className="text-border-strong">·</span>
        <span className="text-faint">{t.role}</span>
      </figcaption>
    </figure>
  );
}

export default function ReviewsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const paused = useRef(false);
  const resumeTimer = useRef<number | undefined>(undefined);
  const row = [...testimonials, ...testimonials];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    pos.current = el.scrollLeft;
    let raf = 0;
    const tick = () => {
      const half = el.scrollWidth / 2;
      if (!paused.current && half > 0) {
        pos.current += 0.45;
        if (pos.current >= half) pos.current -= half;
        el.scrollLeft = pos.current;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pause = () => {
    window.clearTimeout(resumeTimer.current);
    paused.current = true;
  };
  const resume = (delay: number) => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      if (ref.current) pos.current = ref.current.scrollLeft;
      paused.current = false;
    }, delay);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={pause}
      onMouseLeave={() => resume(300)}
      onPointerDown={pause}
      onPointerUp={() => resume(1600)}
      onPointerCancel={() => resume(1600)}
      onTouchStart={pause}
      onTouchEnd={() => resume(1600)}
      className="marquee-mask -mx-5 flex touch-pan-x cursor-grab select-none gap-0 overflow-x-auto overscroll-x-contain py-1 active:cursor-grabbing sm:-mx-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollBehavior: "auto", WebkitOverflowScrolling: "touch" }}
    >
      <div className="shrink-0 pl-5 sm:pl-10" aria-hidden />
      {row.map((t, i) => (
        <Item key={i} t={t} />
      ))}
      <div className="shrink-0 pr-5 sm:pr-10" aria-hidden />
    </div>
  );
}
