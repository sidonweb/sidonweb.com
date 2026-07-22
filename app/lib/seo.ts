import { profile, socials, dailyDrivers } from "./data";

export const SITE_URL = "https://sidonweb.com";

const skills = Array.from(
  new Set([
    "Full-stack development",
    "Real-time systems",
    "Distributed systems",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Apache Kafka",
    "WebSockets",
    "PostgreSQL",
    "Prisma",
    "Retrieval-augmented generation",
    "AI engineering",
    ...dailyDrivers,
  ]),
);

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  jobTitle: "Full-stack Engineer",
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Greater Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  worksFor: { "@type": "Organization", name: "Houston Systems" },
  knowsAbout: skills,
  sameAs: socials.filter((s) => s.label !== "Email").map((s) => s.href),
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: `${profile.name} — Full-stack Engineer`,
  publisher: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en",
};

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [person, website],
};
