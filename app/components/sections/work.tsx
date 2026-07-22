import Reveal from "../reveal";
import ProjectGrid from "../project-grid";
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
      <ProjectGrid limit={4} />
      <Reveal delay={120}>
        <div className="mt-12 flex justify-start">
          <Button href="/work" variant="secondary">
            See all work
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
