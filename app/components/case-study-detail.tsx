import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ImageIcon } from "lucide-react";
import Reveal from "./reveal";
import Button from "./button";
import type { CaseStudy } from "../lib/data";

function Figure({ caption, image }: { caption: string; image?: string }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-2xl border border-border bg-bg-2">
      {image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image src={image} alt={caption} fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center">
          <ImageIcon className="h-6 w-6 text-border-strong" />
        </div>
      )}
      <figcaption className="border-t border-border px-4 py-3 text-[12.5px] leading-relaxed text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function CaseStudyDetail({
  study,
  next,
}: {
  study: CaseStudy;
  next: { slug: string; title: string };
}) {
  return (
    <article className="mx-auto max-w-4xl px-5 py-10 sm:px-10 sm:py-14">
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
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent-strong">
            Case study
          </span>
          <span className="text-accent-dim">{study.kind}</span>
          <span className="text-border-strong">/</span>
          <span className="text-faint">{study.year}</span>
          <span className="text-border-strong">/</span>
          <span className="inline-flex items-center gap-1.5 text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {study.status}
          </span>
        </div>
      </Reveal>

      <Reveal delay={90}>
        <h1 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.1rem)] font-semibold leading-[1.05] tracking-tight">
          {study.title}
        </h1>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-4 max-w-2xl text-[1.35rem] leading-snug text-muted text-balance">
          {study.tagline}
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {study.links.map((link, i) => (
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

      {study.image ? (
        <Reveal delay={110}>
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-bg-2">
            <Image
              src={study.image}
              alt={`${study.title} preview`}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      ) : (
        <Reveal delay={110}>
          <div className="mt-10 flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-bg-2">
            <ImageIcon className="h-7 w-7 text-border-strong" />
          </div>
        </Reveal>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-[1.7fr_1fr] md:gap-14">
        <Reveal>
          <p className="text-[1.05rem] leading-relaxed text-fg/85">{study.lead}</p>
        </Reveal>
        <Reveal delay={70}>
          <dl className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface/50 p-5 sm:grid-cols-2 md:grid-cols-1">
            {study.meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  {m.label}
                </dt>
                <dd className="mt-1 text-[13.5px] leading-snug text-fg/85">{m.value}</dd>
              </div>
            ))}
            <div className="sm:col-span-2 md:col-span-1">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Built with
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {study.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-surface/60 px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
        {study.sections.map((s) => (
          <Reveal key={s.n}>
            <section>
              <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                <span className="text-accent-dim">{s.n}</span>
                <span className="h-px w-5 bg-border" />
                <span>{s.kicker}</span>
              </div>
              <h2 className="mt-4 max-w-2xl font-display text-[1.6rem] font-semibold leading-[1.15] tracking-tight text-fg sm:text-[2rem]">
                {s.heading}
              </h2>

              {s.body.map((p, i) => (
                <p
                  key={i}
                  className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg/75"
                >
                  {p}
                </p>
              ))}

              {s.bullets && (
                <ul className="mt-6 max-w-2xl space-y-3">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-fg/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dim" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {s.steps && (
                <ol className="mt-7 grid gap-3 sm:grid-cols-2">
                  {s.steps.map((step, i) => (
                    <li
                      key={i}
                      className="rounded-xl border border-border bg-surface/50 p-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/10 font-mono text-[10px] text-accent-strong">
                          {i + 1}
                        </span>
                        <span className="font-display text-[15px] font-semibold tracking-tight text-fg">
                          {step.label}
                        </span>
                      </div>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </li>
                  ))}
                </ol>
              )}

              {s.figure && <Figure caption={s.figure} image={s.image} />}
            </section>
          </Reveal>
        ))}
      </div>

      {study.comparison && (
        <Reveal>
          <section className="mt-20">
            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              <span>{study.comparison.title}</span>
            </div>
            <h2 className="mt-4 font-display text-[1.6rem] font-semibold leading-[1.15] tracking-tight text-fg sm:text-[2rem]">
              {study.comparison.note}
            </h2>
            <div className="mt-7 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr>
                    {study.comparison.columns.map((c, i) => (
                      <th
                        key={c}
                        className={`border-b border-border pb-3 pr-4 font-mono text-[10.5px] uppercase tracking-[0.14em] ${
                          i === 1 ? "text-accent-strong" : "text-faint"
                        }`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {study.comparison.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`border-b border-border py-4 pr-4 align-top text-[13.5px] leading-relaxed ${
                            ci === 0
                              ? "font-medium text-fg/85"
                              : ci === 1
                                ? "text-fg/85"
                                : "text-muted"
                          }`}
                        >
                          {cell === "" ? (
                            <span className="inline-flex items-center gap-1.5 text-success">
                              <Check className="h-4 w-4" /> Nothing left to chase
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {study.metrics.map((m) => (
            <div key={m.label} className="bg-bg p-6">
              <div className="font-display text-4xl font-semibold tracking-tight text-fg">
                {m.value}
              </div>
              <div className="mt-2 text-[13px] leading-relaxed text-muted">
                {m.label}
              </div>
            </div>
          ))}
        </section>
      </Reveal>

      <Reveal>
        <div className="mt-14 flex flex-wrap items-center gap-2.5">
          {study.links.map((link, i) => (
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

      <div className="mt-16 border-t border-border pt-8">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            Next up
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
