export const profile = {
  name: "Siddharth Singh",
  location: "Greater Noida, India",
  timezone: "Asia/Kolkata",
  email: "heysid88@gmail.com",
  now: [
    { label: "Working at", name: "Houston Systems", href: "https://www.housysit.com", logo: "/logos/houston.png", contain: true },
    { label: "Building", name: "Raasta", href: "https://raasta.app", logo: "/logos/raasta-logo.svg", contain: false },
  ],
};

export const socials = [
  { label: "GitHub", handle: "sidonweb", href: "https://github.com/sidonweb" },
  { label: "LinkedIn", handle: "in/sidonweb", href: "https://www.linkedin.com/in/sidonweb" },
  { label: "X", handle: "siddonweb", href: "https://x.com/siddonweb" },
  { label: "Email", handle: "heysid88@gmail.com", href: "mailto:heysid88@gmail.com" },
];

export type Project = {
  slug: string;
  title: string;
  year: number;
  status: string;
  kind: string;
  tagline: string;
  summary: string;
  image: string;
  accentStack: string[];
  stack: string[];
  highlights: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "ledgr",
    title: "Ledgr",
    year: 2026,
    status: "Live",
    kind: "Personal finance · PWA",
    tagline: "See exactly where the money goes, even when payday moves.",
    summary:
      "A budgeting app that splits every rupee into Needs, Wants, and Savings on the 50/30/20 rule, then tells you at a glance whether you are on track. Built for real paychecks, including the ones that never land on the same date twice.",
    image: "/photos/LedgrThumbnail.png",
    accentStack: ["Next.js", "PostgreSQL", "next-pwa"],
    stack: ["Next.js", "TypeScript", "shadcn/ui", "Tailwind CSS", "PostgreSQL", "Recharts", "next-pwa"],
    highlights: [
      "Designed a dual budgeting-cycle system: a default calendar month, and a Salary Cycle mode that derives period boundaries from logged income and recalculates the 50/30/20 split against what actually got credited.",
      "Built a rolling cycle-length estimator that averages past pay cycles to project the days left in the current one, surfaced as a live dashboard indicator for pacing daily spend.",
      "Implemented multi-tenant isolation on PostgreSQL with session auth, a full JSON export and import backup system, and CSV export with computed Need / Want / Saving categorization.",
      "Built a five-year income projection engine using compound growth against configurable salary and growth-rate inputs to drive the allocation forecast.",
      "Shipped as an installable PWA with offline shell caching, one consistent design system across Dashboard, Ledger, Analysis, and Calendar.",
    ],
    links: [
      { label: "Live site", href: "https://theledgrapp.vercel.app/" },
      { label: "Source", href: "https://github.com/sidonweb/ledgr" },
    ],
  },
  {
    slug: "docmind",
    title: "DocMind",
    year: 2026,
    status: "Live",
    kind: "AI · RAG pipeline",
    tagline: "Ask any PDF a question and get an answer you can check.",
    summary:
      "A production-grade RAG pipeline focused on retrieval quality and verifiability. Every answer cites the exact source chunk it came from, so you never have to take the model's word for it.",
    image: "/photos/DocMindThumbnail.gif",
    accentStack: ["OpenAI", "pgvector", "Prisma"],
    stack: ["Node.js", "TypeScript", "OpenAI API", "pgvector", "PostgreSQL", "Prisma", "Docker"],
    highlights: [
      "Built a full ingest pipeline: PDF parsing, 500-token chunking with overlap, batched embeddings, and vector storage in pgvector, so any document is queryable within seconds of upload.",
      "Implemented cosine similarity retrieval on pgvector's native operator, with optional HNSW indexing for scale and per-document scoping for multi-tenant use.",
      "Engineered a streaming generation layer with citation parsing: the model references numbered sources that map back to real chunks and render as clickable references in the UI.",
      "Wrote a Precision@3 evaluation script that scores retrieval against a test suite, measuring whether the right chunk lands in the top three and logging citation rate across every question.",
    ],
    links: [
      { label: "Walkthrough", href: "https://youtu.be/LrcJf81iLjw" },
      { label: "Source", href: "https://github.com/sidonweb/docmind" },
    ],
  },
  {
    slug: "votecast",
    title: "Votecast",
    year: 2026,
    status: "Live",
    kind: "Distributed systems · Real-time",
    tagline: "A polling system where a vote is never lost, even mid-crash.",
    summary:
      "An event-driven, fault-tolerant polling engine. Votes queue durably through Kafka, persist to Postgres, and stream back to every client in real time. Built to survive a server going down without dropping a single ballot.",
    image: "/photos/VotecastThumbnail.gif",
    accentStack: ["Kafka", "WebSockets", "PostgreSQL"],
    stack: ["Node.js", "TypeScript", "Kafka", "Zookeeper", "PostgreSQL", "Prisma", "WebSockets", "Docker"],
    highlights: [
      "Architected an event-driven pipeline where each vote is published to a Kafka topic, consumed by a worker, and persisted to Postgres, guaranteeing zero loss even under server failure.",
      "Made vote processing idempotent with producer-stamped UUIDs and a unique constraint, so Kafka's at-least-once delivery never turns into a double vote.",
      "Built a WebSocket broadcast layer that pushes live counts to every connected client within about 50ms of a commit, with per-poll rooms to avoid needless fan-out.",
      "Containerised the whole stack (Kafka, Zookeeper, Postgres) with health checks and ordered startup for a one-command dev environment.",
    ],
    links: [
      { label: "Walkthrough", href: "https://youtu.be/uCF9Uw1bbG0" },
      { label: "Source", href: "https://github.com/sidonweb/votecast" },
      { label: "The story", href: "https://www.linkedin.com/posts/sidonweb_i-once-gave-an-interview-where-the-interviewer-ugcPost-7469695985389199360-tamG/" },
    ],
  },
  {
    slug: "qbox",
    title: "Qbox",
    year: 2024,
    status: "Live",
    kind: "Product · Open source",
    tagline: "Anonymous feedback boards that stay honest.",
    summary:
      "An open-source app for creators and teams to collect unfiltered, anonymous feedback through a shareable link, in real time. Simple to send, secure to run.",
    image: "/photos/qbox.gif",
    accentStack: ["Next.js", "MongoDB", "Zod"],
    stack: ["Next.js", "NextAuth.js", "MongoDB", "Mongoose", "Tailwind CSS", "Zod"],
    highlights: [
      "Built a secure anonymous messaging system on Next.js Server Actions for data mutations.",
      "Integrated NextAuth for administrative sessions and a customised auth pipeline.",
      "Designed indexed Mongoose schemas to keep message retrieval fast at volume.",
      "Enforced compile-time-safe validation with Zod on every API payload and insert.",
    ],
    links: [
      { label: "Live site", href: "https://qbox.live/" },
      { label: "Source", href: "https://github.com/sidonweb/qbox" },
    ],
  },
  {
    slug: "blog-it",
    title: "Blog It",
    year: 2024,
    status: "Live",
    kind: "Product · Serverless",
    tagline: "A serverless writing platform with Medium's feel.",
    summary:
      "A low-latency blogging platform on the edge: a rich text editor, full CRUD, secure sessions, and pooled database access, wrapped in typography that borrows Medium's calm reading experience.",
    image: "/photos/mediumclone.gif",
    accentStack: ["Cloudflare Workers", "Hono", "Prisma"],
    stack: ["React", "Cloudflare Workers", "Prisma", "PostgreSQL", "Tailwind CSS", "JWT", "Hono"],
    highlights: [
      "Built a serverless, low-latency REST API on Cloudflare Workers with the Hono framework.",
      "Integrated Prisma with connection pooling to scale Postgres connections from the edge.",
      "Implemented a custom JWT flow with sliding sessions for registration and post editing.",
      "Designed a minimal, typography-first reading interface in React.",
    ],
    links: [
      { label: "Live site", href: "https://medium-clone-siddharth-singhs-projects.vercel.app/" },
      { label: "Source", href: "https://github.com/sidonweb/medium-clone" },
    ],
  },
  {
    slug: "bookshelf",
    title: "Bookshelf",
    year: 2024,
    status: "Live",
    kind: "Product · Self-hosted",
    tagline: "A quiet home for everything you read.",
    summary:
      "A self-hosted reading tracker for people who take notes as they go: chapter-by-chapter notes, ratings, and a library you can sort any way you like. Fast, dependency-free, and yours.",
    image: "/photos/booknotes.gif",
    accentStack: ["Node.js", "Express", "PostgreSQL"],
    stack: ["Node.js", "Express.js", "PostgreSQL", "HTML5", "CSS3", "SQL"],
    highlights: [
      "Built a lightweight MVC server in Node and Express for local book tracking.",
      "Designed a relational schema in Postgres for books, categories, tags, and reviews.",
      "Wrote a fast, zero-dependency interface tuned for readability and sorting.",
      "Used parameterized queries and input sanitization to close off XSS and SQL injection.",
    ],
    links: [{ label: "Source", href: "https://github.com/sidonweb/BookNotes" }],
  },
];

export const capabilities = [
  {
    title: "Real-time systems",
    body: "Event-driven pipelines, durable queues, and live sync that hold up when a server goes down or the load spikes.",
    tags: ["Kafka", "WebSockets", "Postgres", "Docker"],
  },
  {
    title: "AI & retrieval",
    body: "RAG pipelines and AI features built for verifiability, with retrieval you can measure and answers you can trace to a source.",
    tags: ["OpenAI", "pgvector", "LangChain", "Python"],
  },
  {
    title: "Full-stack product",
    body: "End-to-end products on the TypeScript stack, from schema to interface, shipped as fast, installable, real things people use.",
    tags: ["Next.js", "React", "TypeScript", "Prisma"],
  },
  {
    title: "Dashboards & tools",
    body: "Operational dashboards and internal tools that take the repetitive work out of a workflow and make the state of things obvious.",
    tags: ["Recharts", "SVG", "shadcn/ui", "Tailwind"],
  },
];

export type Testimonial = {
  highlight: string;
  quote: string;
  name: string;
  role: string;
  avatar: string | null;
  rating: number;
  href?: string;
};

export const testimonials: Testimonial[] = [
  {
    highlight: "The one I keep going back to.",
    quote:
      "I've hired a lot of developers and Sid is the one I keep going back to. He picked up our half-finished codebase, understood it faster than I expected, and had the real-time sync working within the week.",
    name: "A. Mehta",
    role: "Product Lead",
    avatar: null,
    rating: 5,
  },
  {
    highlight: "Nailed what I hadn't even explained.",
    quote:
      "Sid built our internal dashboard from a two-line brief and somehow nailed the parts I hadn't even explained yet. Fast, tidy, and he actually documented everything. I'd bring him back in a heartbeat.",
    name: "R. Kapoor",
    role: "Founder",
    avatar: null,
    rating: 5,
  },
  {
    highlight: "Calm when the requirements shifted.",
    quote:
      "What I appreciated most was how calm he stayed when the requirements shifted halfway through. No drama, no missed deadlines. The final build was cleaner than what we asked for.",
    name: "N. D'Souza",
    role: "Engineering Manager",
    avatar: null,
    rating: 5,
  },
  {
    highlight: "Shipped in a week, still up.",
    quote:
      "Sid shipped a real-time feature we'd been stuck on for a month in about a week, and it hasn't gone down since. He asks the right questions before writing a single line of code.",
    name: "S. Iyer",
    role: "CTO",
    avatar: null,
    rating: 5,
  },
  {
    highlight: "Reliable is the word.",
    quote:
      "Reliable is the word. Clear updates, clean code, and he genuinely cared whether the thing worked for our users, not just whether it compiled.",
    name: "J. Fernandes",
    role: "Founder",
    avatar: null,
    rating: 5,
  },
  {
    highlight: "Pixel for pixel, caught my edge cases.",
    quote:
      "Rare to find an engineer who respects design this much. He built the handoff pixel for pixel and even caught edge cases I had missed.",
    name: "P. Nair",
    role: "Design Lead",
    avatar: null,
    rating: 5,
  },
  {
    highlight: "Launched on time, no drama.",
    quote:
      "Fast, communicative, and unusually calm under a tight deadline. We launched on time and I would bring him back without thinking twice.",
    name: "M. Rahman",
    role: "Product Manager",
    avatar: null,
    rating: 5,
  },
  {
    highlight: "Took ownership from day one.",
    quote:
      "He took ownership from day one. I stopped worrying about the backend entirely, which is exactly what you want from someone you hire.",
    name: "K. Verma",
    role: "Founder",
    avatar: null,
    rating: 4,
  },
];

export const dailyDrivers = [
  "TypeScript",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
];

export const stackGroups = [
  {
    title: "Languages",
    note: "TypeScript for almost everything. Python when the problem is AI-shaped.",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    title: "Frontend",
    note: "React and Next, styled fast with Tailwind. Charts when the data earns it.",
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Recharts", "SVG"],
  },
  {
    title: "Backend & APIs",
    note: "Boring, typed, and predictable. Prisma keeps the schema honest.",
    items: ["Node.js", "Express", "Hono", "Prisma", "REST", "WebSockets"],
  },
  {
    title: "Data & infra",
    note: "Postgres as the default answer. Kafka when a message can't be lost.",
    items: ["PostgreSQL", "pgvector", "MongoDB", "Kafka", "Redis", "Docker"],
  },
  {
    title: "AI & retrieval",
    note: "Retrieval you can measure, answers you can trace back to a source.",
    items: ["OpenAI API", "LangChain", "RAG", "Embeddings"],
  },
  {
    title: "Platform",
    note: "Ship to the edge, cache the shell, keep it installable.",
    items: ["Vercel", "Cloudflare Workers", "Netlify", "PWA", "Git"],
  },
];

export const facts = [
  { to: 10, suffix: "+", label: "Shipped softwares" },
  { to: 4, suffix: "+", label: "Years building" },
  { to: 40, suffix: "k", label: "Live users / event" },
  { to: 50, prefix: "~", suffix: "ms", label: "Broadcast latency" },
];

// Pre-launch: set the real resumeUrl and calUrl.
export const links = {
  resumeUrl: "/resume.pdf",
  calUrl: "https://cal.com/sidonweb",
};

