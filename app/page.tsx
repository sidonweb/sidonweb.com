import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>


      <Image
        src="/profile.jpg"
        alt="Profile photo"
        className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
        width={180}
        height={180}
        priority
      />


      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        I code web applications.
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Hello! I'm Siddharth Singh, a full-stack engineer based in Greater Noida. Over the last few years, I've been building smooth, responsive, and scalable web applications that turn ideas into working products, fast.
        </p>
        <p>
          I work mostly with React, Next.js, TypeScript, and Tailwind. From real-time dashboards to feedback systems and clean landing pages, I focus on shipping UIs that feel right and are easy to extend.
        </p>
        <p>
          My journey started in college, exploring full-stack projects and organizing events. While most waited for offers to come through, I jumped into startups, worked on real products, and built my skillset project by project.
        </p>
        <p>
          Beyond this I'm a tech enthusiast who's gone from attending events to organizing them as part of core teams! Outside tech, I love fitness, traveling, capturing memories with my camera, and listening to {" "}
          <a href={socialLinks.spotify} target="_blank">
            music
          </a>{", "}it's my perfect mix for inspiration and adventure.
        </p>
        <h3 className="flex flex-row items-center gap-2 te">

          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          {"Available for Work"}
        </h3>
        <p>
          Got a cool idea or project? Whether it's dev-related or something totally different, just slide into my DMs! I'm always up for fresh ideas and collabs!
        </p>

      </div>
    </section>
  );
}
