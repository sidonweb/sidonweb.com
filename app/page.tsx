import { socialLinks } from "./config";
import Contact from "./components/contact";
import Link from "next/link";
import ProfileSlides from "./components/profile-slides";


export default function Page() {
  return (
    <section>

      <ProfileSlides />

      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        Building functional, scalable web experiences.
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Hi, I'm Siddharth Singh, a full-stack engineer based in Greater Noida, currently working at <Link href='https://www.houstonsystems.in' >Houston Systems</Link> . I've spent the last few years shipping web apps that are scalable & intuitive, and honestly, that's the part I love most. There's something satisfying about seeing your code handle real traffic and real problems.
        </p>
        <h2 className="mb-3 text-lg font-medium tracking-tight">
          What I Work With</h2>
        <p>
          I mostly work with Javascript/TypeScript ( <Link href="/stack">full stack here</Link> ). The stack just makes sense for building things fast without compromising on quality. I've built everything from real-time dashboards to anonymous feedback systems, and what I've learned is that the best interfaces are the ones people don't have to think about.
        </p>
        <h2 className="mb-3 text-lg font-medium tracking-tight">
          How I Got Here</h2>
        <p>
          I got into startups early because I wanted to work on real products and understand how things behave outside classroom projects. College gave me a strong base through hands-on work and events, but building in fast-moving environments taught me what actually matters when something breaks at 3 AM and users are waiting.
        </p>
        <p>I also went from simply attending tech events to helping organize them as part of core teams. That experience taught me a lot about collaboration, communication, and how much of tech is really about people, not just code.</p>
        <h2 className="mb-3 text-lg font-medium tracking-tight">Outside the Terminal</h2>
        <p>Outside tech, I love fitness, traveling, capturing memories with my {" "}
          <Link href='/gallery' >camera</Link>{" (phone), "}and listening to {" "}
          <Link href={socialLinks.spotify} target="_blank">
            music
          </Link>{", "}it's my perfect mix for inspiration and adventure.
        </p>
        <h3 className="flex flex-row items-center gap-2 mb-3 text-lg font-medium tracking-tight">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          {"Available for Work"}
        </h3>
        <p>
          Got a cool idea or project? Whether it's dev-related or something totally different, just slide into my DMs! I'm always up for fresh ideas and collabs!
        </p>
        <Contact />
      </div>
    </section>
  );
}
