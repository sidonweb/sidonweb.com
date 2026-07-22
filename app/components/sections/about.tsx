import Image from "next/image";
import Reveal from "../reveal";
import CountUp from "../count-up";
import ReviewsMarquee from "../reviews-marquee";
import { Section, Kicker } from "./section-shell";

const timeline = [
  {
    year: "Then",
    tag: "How it started",
    title: "Running events in college",
    body: "I helped out, then ended up leading the teams behind them. That is where I learned shipping is mostly about people, and staying calm when the plan meets reality.",
  },
  {
    year: "2023",
    tag: "The stress test",
    title: "IPL match days, New PCA Stadium",
    body: "I ran e-ticketing for matches in Chandigarh. Tens of thousands of people, a two hour window, and no room for the system to blink.",
  },
  {
    year: "Now",
    tag: "Where I am",
    title: "Full-stack engineer",
    body: "At Houston Systems, and building Raasta on the side. Most of my time goes into real-time systems and AI that take the busywork out of a workflow.",
  },
];

const quickFacts = [
  { k: "Based in", v: "Greater Noida, IN" },
  { k: "Focus", v: "Real-time & AI" },
  { k: "Currently", v: "Houston Systems" },
  { k: "Open to", v: "Full-time & freelance" },
];

const offClock = ["Gym most evenings", "Formula 1 weekends", "A lot of films"];

export default function About() {
  return (
    <Section id="about" className="py-16 sm:py-32">
      <Kicker index="04" label="About" />

      <div className="mt-6 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div>
          <Reveal>
            <h2 className="font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-balance sm:text-[2.6rem]">
              Most of the work is about people, not code.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-6 space-y-4">
              <p className="text-[17px] leading-relaxed text-fg/90">
                I&apos;m Siddharth. I got into tech sideways, by helping run events
                in college and slowly ending up in charge of them. The code came
                later. The instinct for keeping a room of moving parts calm came
                first.
              </p>
              <p className="text-[15px] leading-relaxed text-muted">
                These days I build across the TypeScript stack, mostly real-time
                systems and AI features, the kind of thing that has to keep working
                while people are actually depending on it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {quickFacts.map((f) => (
                <div key={f.k} className="bg-surface px-4 py-3.5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {f.k}
                  </dt>
                  <dd className="mt-1 text-[14px] font-medium text-fg">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Off the clock
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {offClock.map((o) => (
                  <span
                    key={o}
                    className="rounded-full border border-border bg-bg-2 px-3 py-1 text-[13px] text-muted"
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <figure className="group relative overflow-hidden rounded-2xl border border-border bg-bg-2">
            <div className="relative aspect-[4/5]">
              <Image
                src="/profile.jpg"
                alt="Siddharth Singh, full-stack engineer in Greater Noida"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="duotone object-cover object-top"
              />
            </div>
          </figure>
        </Reveal>
      </div>

      <Reveal>
        <div className="bg-grid relative mt-16 overflow-hidden rounded-2xl border border-border bg-bg-2 p-8 sm:p-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            The one that taught me the most
          </div>
          <div className="mt-4 flex items-end gap-4">
            <div className="font-display text-[clamp(3.5rem,12vw,7.5rem)] font-semibold leading-[0.9] tracking-tight text-fg">
              <CountUp to={40000} duration={1800} />
            </div>
            <div className="mb-2 font-display text-2xl text-faint">+</div>
          </div>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
            people through the gates in a couple of hours. That was the e-ticketing
            I ran for IPL match days at the New PCA Stadium in Chandigarh. When
            something goes wrong there, you cannot roll back, you cannot put up a
            maintenance page. You stay calm and you keep the line moving.
          </p>
          <p className="mt-4 font-display text-lg font-medium text-fg">
            That is the whole reason I build the way I do.
          </p>
        </div>
      </Reveal>

      <h3 className="mb-10 mt-20 font-display text-xl font-semibold tracking-tight">
        The short history
      </h3>
      <div>
        {timeline.map((t, i) => {
          const last = i === timeline.length - 1;
          return (
            <Reveal key={t.title} delay={i * 70}>
              <div className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8">
                <div className="flex flex-col items-center">
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-border-strong bg-bg">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                  </span>
                  {!last && <span className="w-px flex-1 bg-border" />}
                </div>
                <div className={last ? "pb-1" : "pb-12"}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg">
                      {t.year}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                      {t.tag}
                    </span>
                  </div>
                  <h4 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-fg">
                    {t.title}
                  </h4>
                  <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-muted">
                    {t.body}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mb-8 mt-20 flex items-baseline justify-between">
        <h3 className="font-display text-xl tracking-tight">What people say</h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          People I&apos;ve worked with
        </span>
      </div>

      <ReviewsMarquee />
    </Section>
  );
}
