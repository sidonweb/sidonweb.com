import { socialLinks } from "./config";
import Contact from "./components/contact";
import Link from "next/link";
import ProfileSlides from "./components/profile-slides";
import { metaData } from "./config";
import Testimonials from "./components/testimonials";

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
                "url": metaData.baseUrl,
                "name": metaData.name,
                "description": metaData.description
              },
              {
                "@type": "Person",
                "name": metaData.name,
                "url": metaData.baseUrl,
                "image": `${metaData.baseUrl}${metaData.ogImage}`,
                "jobTitle": "Full Stack Engineer",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Houston Systems"
                },
                "sameAs": [
                  socialLinks.twitter,
                  socialLinks.github,
                  socialLinks.linkedin
                ]
              }
            ]
          }),
        }}
      />
      <ProfileSlides />

      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        Building functional, scalable web experiences.
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Hi, I'm Siddharth Singh, a full-stack engineer based in Greater Noida, currently working at <Link href='https://www.housysit.com' > <i>Houston Systems</i></Link>. I've spent the last few years shipping web applications that are scalable & intuitive. My focus is on creating reliable, scalable web applications that hold up in real-world conditions.
        </p>
        <h2 className="mb-3 text-lg font-medium tracking-tight">
          Work & Experiences
        </h2>

        <p>
          I mainly work with Javascript/TypeScript ( <Link href="/stack"><i>full stack here</i></Link> ), which helps me build fast without compromising on quality. Over time, I've built a range of products from real-time dashboards to applied AI tools using Python, GenAI, and frameworks like LangChain. Recently, my focus has been on building systems that can automate workflows and solve practical, real-world problems.
        </p>

        <p>
          My journey started with just attending tech events during college, and gradually becoming part of the core teams organizing them. From the past year, I've been handling e-ticketing operations at IPL matches at New PCA Stadium, Chandigarh using software we built at my company, managing entry flow for 30,000 to 40,000 people within a few hours ( <Link href={"https://www.linkedin.com/posts/sidonweb_technology-stadiumoperations-ticketsolutions-activity-7322494088769916928-bFo7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC2xQm0B-BL4caJx6TqAx-i1z4y_o8na_Xg"}>view post</Link> ).
        </p>

        <p>
          These experiences taught me the importance of coordination, clear communication, and staying calm under pressure. More importantly, they helped me understand how much of tech is really about people, not just code.
        </p>
        <h2 className="mb-3 text-lg font-medium tracking-tight">Testimonials</h2>
        <Testimonials />
        <h2 className="mb-3 text-lg font-medium tracking-tight">Outside the Terminal</h2>
        <p>Outside tech, I love fitness, traveling, capturing memories with my {" "}
          <Link href='/gallery' ><i>camera</i></Link>{" (phone), "}and listening to {" "}
          <Link href={socialLinks.spotify} target="_blank">
            <i>music</i>
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
    </section >
  );
}
