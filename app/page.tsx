import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
     

        <Image
          src="/profile.jpg"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={180}
          height={180}
          priority
        />
      

      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        I code web applications.
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Hello! My name is Siddharth. I'm a competent software engineer, able to work effectively in a fast-paced, agile environment, and passionate about developing web applications.
        </p>
        <p>
          My interests extend to web development, artificial intelligence, open-source & devops.
        </p>
        <p>
          I enjoy building full-stack, end-to-end web applications, mostly using Next.js. My latest creation?{" "}
          <a
            target="_blank"
            href="https://qbox.live"
          >
            qbox
          </a>
          {" "}
          — a sleek, minimalistic feedback board app designed to make gathering feedback simple and efficient!
        </p>
        <p>
          Beyond this I'm a tech enthusiast who's gone from attending events to organizing them as part of core teams! Outside tech, I love traveling, capturing memories with my camera, and listening to {" "}
          <a href={socialLinks.spotify} target="_blank">
            music
          </a>{" "}
          — it's my perfect mix for inspiration and adventure.
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
