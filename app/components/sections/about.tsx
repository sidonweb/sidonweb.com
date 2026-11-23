import Image from "next/image";
import Reveal from "../reveal";
// import CountUp from "../count-up";
import ReviewsMarquee from "../reviews-marquee";
import { Section, Kicker } from "./section-shell";
import Link from "next/link";

const timeline = [
  {
    year: "Now",
    tag: "Current",
    title: "Building production software",
    body: "I'm a full-stack engineer at Houston Systems, building software for tolling, parking, and access control systems. One of the highlights has been seeing our stadium access system in action during the 2025 and 2026 IPL seasons.",
  },
  {
    year: "College",
    tag: "Learning",
    title: "Web development & community",
    body: "I learned the MERN stack through online courses, built projects, completed internships, and joined the Google Developer Student Club. Being part of the core team gave me the chance to organize technical events and meet people who shared the same curiosity for technology.",
  },
  {
    year: "School",
    tag: "First steps",
    title: "Discovering programming",
    body: "School introduced me to HTML, CSS, basic SQL, and later Python. They were simple lessons, but they sparked my interest in programming long before I knew I wanted to become a software engineer.",
  },
  {
    year: "Primitive days",
    tag: "The beginning",
    title: "A computer before I could use it",
    body: "The year I was born, my family bought our first computer and a dial-up internet connection. I mostly used it to play games growing up, but looking back, it was my first introduction to technology.",
  },
];

// const quickFacts = [
//   { k: "Based in", v: "Greater Noida, IN" },
//   { k: "Focus", v: "Real-time & AI" },
//   { k: "Currently", v: "Houston Systems" },
//   { k: "Open to", v: "Full-time & freelance" },
// ];

const offClock = ["📖 Reading books", "🏎️ Formula 1 weekends", "🎬 A lot of films"];

const rows: (typeof timeline)[] = [];
for (let i = 0; i < timeline.length; i += 2) rows.push(timeline.slice(i, i + 2));

const Dot = () => (
  <span className="relative z-10 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-border-strong bg-bg">
    <span className="h-2 w-2 rounded-full bg-muted" />
  </span>
);

const Entry = ({ t }: { t: (typeof timeline)[number] }) => (
  <>
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-strong">{t.year}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{t.tag}</span>
    </div>
    <h4 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-fg">{t.title}</h4>
    <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-muted">{t.body}</p>
  </>
);

export default function About() {
  return (
    <Section id="about" className="py-16 sm:py-32">
      <Kicker index="04" label="About" />

      <div className="mt-6 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div>
          <Reveal>
            <h2 className="font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-balance sm:text-[2.6rem]">
              Most of the engineering is judgment, not syntax.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-6 space-y-4">
              <p className="text-[15px] leading-relaxed text-muted">
                At Houston Systems, I build software for tolling, parking, and access control, systems
                people pass through without noticing. When a stadium gate is scanning tickets for an IPL
                crowd, nobody cares what framework it runs on. They care that the gate opens. That taught
                me the real work happens around the code: what can fail, what happens when it does, and
                what's simple enough to trust.
              </p>

              <p className="text-[15px] leading-relaxed text-muted">
                Outside work, I build my own products.{" "}
                <Link
                  href="https://yapcut.up.railway.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-strong"
                >
                  YapCut
                </Link>{" "}
                uses AI to turn long videos into captioned vertical clips for Reels and Shorts, in English,
                Hindi, and Hinglish. It's live with paid plans. I'm also co-founding{" "}
                <Link
                  href="https://raasta.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-strong"
                >
                  Raasta
                </Link>{" "}
                with
                <Link
                  href="https://armaanux.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-strong"
                > Armaan
                </Link>, a travel app for the parts of India most people never hear about, from how to
                get there to what it'll cost.
              </p>

              <p className="text-[15px] leading-relaxed text-muted">
                Most of what I write is MERN, but each project needed something different, from video
                processing to AI agents, so I learned whatever the problem called for. AI makes it possible
                to build almost anything faster, which makes judgment matter more. Knowing what's worth
                building, and how to make it hold up, is still the hard part. More in{" "}
                <Link href="/work" className="text-accent-strong">
                  work
                </Link>
                .
              </p>
            </div>
          </Reveal>

          {/* <Reveal delay={140}>
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
          </Reveal> */}

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
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/profile2.jpg"
                alt="Siddharth Singh, full-stack engineer in Greater Noida"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="duotone object-cover object-top"
              />
            </div>
          </figure>
        </Reveal>
      </div>

      {/* <Reveal>
        <div className="bg-grid relative mt-16 overflow-hidden rounded-2xl border border-border bg-bg-2 p-8 sm:p-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            A memorable experience
          </div>

          <div className="mt-4 flex items-end gap-4">
            <div className="font-display text-[clamp(3.5rem,12vw,7.5rem)] font-semibold leading-[0.9] tracking-tight text-fg">
              <CountUp to={100000} duration={1800} />
            </div>
            <div className="mb-2 font-display text-2xl text-faint">+</div>
          </div>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
            During the 2025 and 2026 IPL seasons, I had the opportunity to see our
            stadium access system at the New PCA Stadium in Chandigarh being used by
            over 100,000 attendees across match days. Watching software I'd worked on
            operate in a real, high-traffic environment gave me a completely different
            perspective on building reliable systems.
          </p>

          <p className="mt-4 font-display text-lg font-medium text-fg">
            It reminded me that good software disappears into the experience.
          </p>
        </div>
      </Reveal> */}

      <h3 className="mb-10 mt-20 font-display text-xl font-semibold tracking-tight">
        The short history
      </h3>

      {/* Mobile: vertical */}
      <div className="md:hidden">
        {timeline.map((t, i) => {
          const last = i === timeline.length - 1;
          return (
            <Reveal key={t.title} delay={i * 70}>
              <div className="grid grid-cols-[auto_1fr] gap-x-5">
                <div className="flex flex-col items-center">
                  <span className="mt-1"><Dot /></span>
                  {!last && <span className="w-px flex-1 bg-border" />}
                </div>
                <div className={last ? "pb-1" : "pb-12"}>
                  <Entry t={t} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Desktop: S-shaped path */}
      <div className="hidden md:block">
        {rows.map((row, r) => {
          const rtl = r % 2 === 1;
          const lastRow = r === rows.length - 1;

          // Where the horizontal line starts and ends in this row
          const line: React.CSSProperties = { left: 0, right: 0 };
          if (r === 0) line.left = 8;
          if (lastRow) {
            if (!rtl) line.right = row.length === 2 ? "calc(50% - 8px)" : "calc(100% - 8px)";
            else line.left = row.length === 2 ? 8 : "calc(50% + 8px)";
          }

          return (
            <Reveal key={r} delay={r * 90}>
              <div className={`relative grid grid-cols-2 ${lastRow ? "pb-1" : "pb-16"}`}>
                {/* Horizontal line through the dots */}
                <span className="absolute top-2 h-px bg-border" style={line} />

                {/* Curve down to the next row */}
                {!lastRow && (
                  <span
                    className={`absolute top-2 w-14 border-y border-border ${rtl
                        ? "-left-14 rounded-l-full border-l"
                        : "-right-14 rounded-r-full border-r"
                      }`}
                    style={{ height: "calc(100% + 1px)" }}
                  />
                )}

                {row.map((t, j) => {
                  const col = rtl ? (row.length === 2 && j === 1 ? 1 : 2) : j + 1;
                  return (
                    <div
                      key={t.title}
                      className={`row-start-1 pr-10 ${col === 1 ? "col-start-1" : "col-start-2"}`}
                    >
                      <Dot />
                      <div className="mt-4">
                        <Entry t={t} />
                      </div>
                    </div>
                  );
                })}
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
