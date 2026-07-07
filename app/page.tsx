import Link from "next/link";
import { socialLinks, metaData } from "./config";
import Hero from "./components/hero";
import { Section } from "./components/section";
import FeaturedWork from "./components/featured-work";
import GithubActivity from "./components/github-activity";
import Testimonials from "./components/testimonials";
import Contact from "./components/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const linkClass =
  "font-medium text-neutral-900 dark:text-neutral-100 underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-4 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition";

export default function Page() {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                url: metaData.baseUrl,
                name: metaData.name,
                description: metaData.description,
              },
              {
                "@type": "Person",
                name: metaData.name,
                url: metaData.baseUrl,
                image: `${metaData.baseUrl}${metaData.ogImage}`,
                jobTitle: "Full Stack Engineer",
                worksFor: { "@type": "Organization", name: "Houston Systems" },
                sameAs: [
                  socialLinks.twitter,
                  socialLinks.github,
                  socialLinks.linkedin,
                ],
              },
            ],
          }),
        }}
      />

      <Hero />

      <div className="mt-20 flex flex-col gap-16 sm:gap-20">
        {/* ABOUT */}
        <Section label="About">
          <div className="space-y-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
            <p>
              I work across the JavaScript and TypeScript stack (
              <Link href="/stack" className={linkClass}>
                full stack here
              </Link>
              ), which lets me move quickly without cutting corners. I&apos;ve
              built real-time dashboards, internal tools, and a few AI features
              with Python, GenAI, and LangChain. These days most of my time goes
              into systems that take the repetitive work out of a workflow.
            </p>
            <p>
              I got into tech by helping run events in college, and slowly ended
              up leading the teams behind them. This past year I ran e-ticketing
              for IPL matches at New PCA Stadium in Chandigarh, handling entry
              for 30,000 to 40,000 people in a couple of hours (
              <Link
                href="https://www.linkedin.com/posts/sidonweb_technology-stadiumoperations-ticketsolutions-activity-7322494088769916928-bFo7"
                target="_blank"
                className={linkClass}
              >
                view post
              </Link>
              ). It taught me to stay calm when things break, and that most of
              the work is really about people, not code.
            </p>
          </div>
        </Section>

        {/* SELECTED WORK */}
        <Section label="Work">
          <FeaturedWork limit={3} />
        </Section>

        {/* ACTIVITY */}
        <Section label="Activity">
          <p className="mb-5 leading-relaxed text-neutral-600 dark:text-neutral-400">
            I build in the open. Here&apos;s my GitHub over the last year.
          </p>
          <GithubActivity />
        </Section>

        {/* TESTIMONIALS */}
        <Section label="Words">
          <Testimonials />
        </Section>

        {/* CONTACT */}
        <Section id="contact" label="Contact">
          <Contact />
        </Section>
      </div>
    </section>
  );
}
