import {
  siJavascript,
  siPython,
  siReact,
  siShadcnui,
  siExpress,
  siHono,
  siMongodb,
  siRedis,
  siApachekafka,
  siDocker,
  siLangchain,
  siVercel,
  siCloudflareworkers,
  siNetlify,
  siGit,
} from "simple-icons";
import Reveal from "../reveal";
import TechStrip from "../tech-strip";
import { Section, Kicker } from "./section-shell";
import { capabilities, dailyDrivers } from "../../lib/data";

const blurbs: Record<string, string> = {
  "Real-time systems": "Durable queues and live sync that don't drop data when a server falls over.",
  "AI & retrieval": "RAG you can measure, with answers that trace back to a real source.",
  "Full-stack product": "Schema to interface, shipped as fast, installable, real things.",
  "Dashboards & tools": "Tools that make the state of a system obvious at a glance.",
};

const techStrip = [
  { name: "JavaScript", icon: siJavascript },
  { name: "Python", icon: siPython },
  { name: "React", icon: siReact },
  { name: "shadcn/ui", icon: siShadcnui },
  { name: "Express", icon: siExpress },
  { name: "Hono", icon: siHono },
  { name: "MongoDB", icon: siMongodb },
  { name: "Redis", icon: siRedis },
  { name: "Kafka", icon: siApachekafka },
  { name: "Docker", icon: siDocker },
  { name: "LangChain", icon: siLangchain },
  { name: "Vercel", icon: siVercel },
  { name: "Cloudflare", icon: siCloudflareworkers },
  { name: "Netlify", icon: siNetlify },
  { name: "Git", icon: siGit },
];

export default function Stack() {
  return (
    <Section id="stack" className="py-16 sm:py-32">
      <Kicker index="03" label="Stack" />

      <Reveal delay={60}>
        <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.14] tracking-tight text-balance">
          Full-stack across the TypeScript world, with two things I go deep on.
        </h2>
      </Reveal>
      <Reveal delay={110}>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          Real-time systems and AI retrieval are where I do my strongest work. Here
          is what that means in practice, and the tools I trust to get there.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <div key={c.title} className="flex h-full flex-col bg-surface p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[12px] tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
                  {c.title}
                </h3>
              </div>
              <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted">
                {blurbs[c.title] ?? c.body}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-bg-2 px-2.5 py-0.5 font-mono text-[10.5px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-14">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Core stack, every day
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {dailyDrivers.map((d) => (
              <span
                key={d}
                className="rounded-full border border-border-strong bg-surface-2 px-4 py-2 font-display text-[15px] tracking-tight text-fg"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-14">
          <TechStrip
            items={techStrip.map((t) => ({
              name: t.name,
              path: t.icon.path,
              hex: `#${t.icon.hex}`,
            }))}
          />
        </div>
      </Reveal>
    </Section>
  );
}
