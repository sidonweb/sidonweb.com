import { siGithub, siX } from "simple-icons";
import { ArrowRight, ArrowUp, Download } from "lucide-react";
import Reveal from "../reveal";
import CopyEmail from "../copy-email";
import ContactForm from "../contact-form";
import Button from "../button";
import { Section, Kicker } from "./section-shell";
import { profile, socials, links } from "../../lib/data";

// Official brand marks, kept to one consistent filled style (simple-icons
// carries GitHub and X; LinkedIn's mark isn't in the set, so it's inlined).
const LINKEDIN =
  "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z";
const BRAND: Record<string, string> = {
  GitHub: siGithub.path,
  LinkedIn: LINKEDIN,
  X: siX.path,
};

export default function Contact() {
  return (
    <Section id="contact" className="pb-24 pt-16 sm:pb-32 sm:pt-32">
      <Kicker index="05" label="Contact" />

      <Reveal delay={60}>
        <h2 className="mt-6 max-w-2xl font-display text-[2.2rem] leading-[1.04] tracking-tight text-balance sm:text-[3rem]">
          Got something worth building? Let&apos;s talk.
        </h2>
      </Reveal>

      <Reveal delay={110}>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
          Tell me a little about it below, or reach me directly. I read
          everything, and I reply fast.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <Reveal delay={140}>
          <ContactForm />
        </Reveal>

        <Reveal delay={180}>
          <div className="flex flex-col gap-8 lg:border-l lg:border-border lg:pl-16">
            <CopyEmail email={profile.email} />

            <div className="flex flex-wrap items-center gap-2.5">
              <Button href={links.calUrl} external variant="secondary">
                Book a 15-min call <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href={links.resumeUrl} external variant="ghost">
                Resume <Download aria-hidden className="h-4 w-4 opacity-80" />
              </Button>
            </div>

            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                Elsewhere
              </div>
              <div className="flex items-center gap-2.5">
                {socials
                  .filter((s) => BRAND[s.label])
                  .map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-fg"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-[18px] w-[18px]">
                        <path d={BRAND[s.label]} />
                      </svg>
                    </a>
                  ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="pulse-dot h-2 w-2 rounded-full bg-success" />
              <span className="text-[13.5px] text-muted">
                Available now · replies within a day
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-16 border-t border-border pt-8">
          <p className="text-sm leading-relaxed text-muted">
            That&apos;s the whole thing. Thanks for looking around.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono text-sm text-fg">— Sid</span>
            <a
              href="#intro"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
            >
              <ArrowUp aria-hidden className="h-3.5 w-3.5" /> top
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
