export interface Project {
  title: string;
  status: string;
  year: number;
  description: string;
  url: string;
  imgurl: string;
  slug: string;
  links: {
    github?: string;
    website?: string;
    post?: string;
  };
  bullets: string[];
  stack: string[];
}

export const projects: Project[] = [
  {
    title: "Votecast",
    status: "Building",
    year: 2026,
    slug: "votecast",
    description:
      "A fault-tolerant, real-time polling system where votes are never lost. Built with an event-driven architecture using Apache Kafka for durable vote queuing, PostgreSQL for persistence, and WebSockets for live result updates.",
    url: "",
    imgurl: "/monke-coding.gif",
    links: {
     
    },
    bullets: [
      "Architected an event-driven vote pipeline where each vote is published to a Kafka topic, consumed by a Node.js worker, and persisted to PostgreSQL — ensuring zero vote loss even under server failure.",
      "Implemented idempotent vote processing using producer-stamped UUIDs and a unique constraint in Postgres, preventing duplicate votes from Kafka's at-least-once delivery.",
      "Built a WebSocket broadcast layer that pushes live vote counts to all connected clients within ~50ms of a vote being committed, with per-poll room management to avoid unnecessary broadcasts.",
      "Containerised the full infrastructure — Kafka, Zookeeper, and PostgreSQL — using Docker Compose with health checks and ordered startup dependencies for a one-command dev environment."
    ],
    stack: ["Node.js", "TypeScript", "Kafka", "Zookeeper", "PostgreSQL", "Prisma", "WebSockets", "Docker"]
  },
  {
    title: "ReadySetShoot",
    status: "Live",
    year: 2025,
    slug: "readysetshoot",
    description:
      "ReadySetShoot is a comprehensive photography planning platform that combines precise sunrise/sunset times, astronomical forecasts, and real-time tide tracking into a single, intuitive interface. Designed for landscape, astro, and outdoor photographers who need to plan shots down to the minute.",
    url: "https://readysetshoot.netlify.app",
    imgurl: "/photos/ReadySetShootThumbnail.gif",
    links: {
      website: "https://readysetshoot.netlify.app",
      github: "https://github.com/sidonweb/ReadySetShoot"
    },
    bullets: [
      "Designed and engineered an intuitive, unified photography planning dashboard integrating sunrise, sunset, golden hour, and blue hour calculators.",
      "Integrated third-party meteorological and oceanographic APIs to fetch and visualize real-time tide schedules and high-accuracy cloud coverage forecasts.",
      "Implemented highly responsive SVG charts and customized micro-interactions for smooth interactive tide height visualization.",
      "Optimized asset loading, routing, and code-splitting to achieve perfect performance and accessibility scores on Google PageSpeed Insights."
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Astro APIs", "Netlify"]
  },
  {
    title: "Qbox",
    status: "Live",
    year: 2024,
    slug: "qbox",
    description:
      "Qbox is an open-source web application that allows creators, teams, and individuals to create secure, anonymous feedback boards. Users can easily share unique links to receive unfiltered constructive criticism, messages, and suggestions in real-time.",
    url: "https://qbox.live/",
    imgurl: "/photos/qbox.gif",
    links: {
      website: "https://qbox.live/",
      github: "https://github.com/sidonweb/qbox",
      post: "https://x.com/sidonweb/status/1785000000000000000"
    },
    bullets: [
      "Developed a fully-featured, secure anonymous messaging system using Next.js with robust Server Actions for data mutations.",
      "Integrated NextAuth.js (Auth.js) to manage secure administrative user sessions and customize authentication pipelines.",
      "Designed structured, high-performance database schemas with Mongoose and MongoDB, utilizing indexing to optimize message retrieval times.",
      "Implemented compile-time safe data validation protocols using Zod schemas for all API payloads and database insertions."
    ],
    stack: ["Next.js", "NextAuth.js", "MongoDB", "Mongoose", "Tailwind CSS", "Zod"]
  },
  {
    title: "Blog It",
    status: "Live",
    year: 2024,
    slug: "blog-it",
    description:
      "A high-performance serverless blogging platform featuring a modern rich text editor, comprehensive CRUD capabilities, secure session management, and efficient database query pooling. Designed to mimic the clean typography and interactive feel of Medium.",
    url: "https://medium-clone-siddharth-singhs-projects.vercel.app/",
    imgurl: "/photos/mediumclone.gif",
    links: {
      website: "https://medium-clone-siddharth-singhs-projects.vercel.app/",
      github: "https://github.com/sidonweb/medium-clone"
    },
    bullets: [
      "Built a serverless, low-latency REST API deployed on Cloudflare Workers using the Hono framework.",
      "Integrated Prisma ORM with connection pooling adapters to scale database connections efficiently on PostgreSQL.",
      "Implemented custom JSON Web Token (JWT) authentication flow with sliding sessions to secure user registrations and posts editing.",
      "Designed a sleek, minimalist typography-focused blogging interface in React following Medium's iconic UI design system."
    ],
    stack: ["React", "Cloudflare Workers", "Prisma", "PostgreSQL", "Tailwind CSS", "JWT", "Hono"]
  },
  {
    title: "Bookshelf",
    status: "Live",
    year: 2024,
    slug: "bookshelf",
    description:
      "Bookshelf is a personalized book notes and ratings tracker designed for avid readers who want a clean, simple, and self-hosted way to catalog their reading history, take organized chapter-by-chapter notes, and sort their library by various metrics.",
    url: "https://github.com/sidonweb/BookNotes",
    imgurl: "/photos/booknotes.gif",
    links: {
      github: "https://github.com/sidonweb/BookNotes"
    },
    bullets: [
      "Engineered a solid, lightweight Model-View-Controller (MVC) server using Node.js and Express.js for local book inventory tracking.",
      "Designed a relational database schema in PostgreSQL featuring tables for books, categories, tags, and reviews.",
      "Created a fast, zero-dependency HTML/CSS user interface optimized for high readability, responsive grid layouts, and sorting filters.",
      "Implemented parameterized SQL queries and input-sanitization middlewares to eliminate cross-site scripting (XSS) and SQL injection (SQLi) risks."
    ],
    stack: ["Node.js", "Express.js", "PostgreSQL", "HTML5", "CSS3", "SQL"]
  }
];
