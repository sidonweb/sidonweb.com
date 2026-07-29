import Reveal from "../reveal";
import ProjectList from "../project-list";
import CaseStudyBlock from "../case-study-block";
import Button from "../button";
import { Section, Kicker } from "./section-shell";

export default function Work() {
  return (
    <Section id="work" className="py-16 sm:py-32">
      <Kicker index="02" label="Work" />
      <Reveal delay={60}>
        <h2 className="mt-5 font-display text-[2rem] leading-[1.08] tracking-tight sm:text-[2.6rem]">
          Here&apos;s what I&apos;ve built,
          <br className="hidden sm:block" /> and what made each one hard.
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-12 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          <span className="text-muted">Case studies</span>
          <span className="h-px w-5 bg-border" />
          <span>the full story behind two</span>
        </div>
      </Reveal>
      <CaseStudyBlock />

      <Reveal delay={100}>
        <div className="mt-16 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          <span className="text-muted">Other projects</span>
          <span className="h-px w-5 bg-border" />
        </div>
      </Reveal>
      <ProjectList />

      <Reveal delay={120}>
        <div className="mt-10 flex justify-start">
          <Button href="/work" variant="secondary">
            See all work
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
