import Image from "next/image";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import Reveal from "../reveal";
import CountUp from "../count-up";
import Button from "../button";
import GithubHeatmap from "../github-heatmap";
import { Section } from "./section-shell";
import { profile, facts, links } from "../../lib/data";

export default function Intro() {
  return (
    <Section id="intro" className="pt-8 pb-16 sm:pt-14 sm:pb-32">
      <div className="lg:hidden">
        <div className="relative -mx-5 -mt-10 mb-8 aspect-[4/5] overflow-hidden sm:aspect-[16/9]">
          <Image
            src="/profile.jpg"
            alt="Siddharth Singh, full-stack engineer"
            fill
            sizes="100vw"
            className="duotone object-cover object-top"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
            style={{ background: "linear-gradient(to top, var(--color-bg), transparent)" }}
          />
        </div>
      </div>

      <Reveal className="hidden lg:block">
        <div className="flex flex-wrap items-center gap-2.5 text-[13px] text-muted">
          <span className="inline-flex items-center gap-2 text-fg">
            <span className="pulse-dot h-2 w-2 rounded-full bg-success" />
            Available for work, worldwide
          </span>
          <span className="text-border-strong">/</span>
          <span>{profile.location}</span>
        </div>
      </Reveal>

      <div className="grid gap-10 lg:mt-8 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-12">
        <div>
          <Reveal>
            <h1 className="font-display text-[clamp(2.1rem,4.6vw,3.1rem)] leading-[1.08] tracking-tight text-balance">
              Hi, I&apos;m Siddharth. I build production-ready scalable software.
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-muted">
              I&apos;m Siddharth Singh, a full-stack engineer in {profile.location}.
              I spend most of my time on real-time systems and AI, and I do my best
              work when something important has to stay up and simply can&apos;t
              fail. If you want someone who ships fast and sweats the details that
              matter, I&apos;d love to hear from you.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <Button href={links.resumeUrl} external variant="primary">
                Resume <Download aria-hidden className="h-4 w-4 opacity-80" />
              </Button>
              <Button href={links.calUrl} external variant="secondary">
                Book a call <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="hidden lg:block">
          <figure className="group relative overflow-hidden rounded-2xl border border-border bg-bg-2">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/profile.jpg"
                alt="Siddharth Singh, full-stack engineer"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="duotone object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,5,7,0.9) 0%, rgba(5,5,7,0.2) 34%, rgba(5,5,7,0) 58%)",
                }}
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
              <div>
                <div className="font-display text-sm text-white">Siddharth Singh</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                  full-stack engineer
                </div>
              </div>
              <span className="font-mono text-[10px] text-white/50">IN · 28.5°N</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal>
        <dl className="mt-14 grid grid-cols-2 gap-px border-y border-border bg-border sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-bg px-4 py-5">
              <dd className="font-display text-3xl font-semibold tracking-tight text-fg">
                <CountUp to={f.to} prefix={f.prefix} suffix={f.suffix} />
              </dd>
              <dt className="mt-1 text-[12px] leading-snug text-muted">{f.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {profile.now.map((n) => (
            <a
              key={n.name}
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <span
                className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border ${
                  n.contain ? "bg-white" : "bg-bg-2"
                }`}
              >
                <Image
                  src={n.logo}
                  alt={n.name}
                  fill
                  sizes="48px"
                  className={n.contain ? "object-contain p-1.5" : "object-cover"}
                />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  {n.label}
                </div>
                <div className="mt-0.5 truncate font-display text-[17px] font-semibold tracking-tight text-fg">
                  {n.name}
                </div>
              </div>
              <ArrowUpRight
                aria-hidden
                className="h-[18px] w-[18px] shrink-0 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-fg"
              />
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12">
          <GithubHeatmap user="sidonweb" />
        </div>
      </Reveal>
    </Section>
  );
}
