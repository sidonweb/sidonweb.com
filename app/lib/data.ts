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

export type CaseStudy = {
  slug: string;
  title: string;
  year: number;
  status: string;
  kind: string;
  tagline: string;
  summary: string;
  lead: string;
  image?: string;
  accentStack: string[];
  stack: string[];
  meta: { label: string; value: string }[];
  sections: {
    n: string;
    kicker: string;
    heading: string;
    body: string[];
    bullets?: string[];
    steps?: { label: string; body: string }[];
    figure?: string;
    image?: string;
  }[];
  comparison?: {
    title: string;
    note: string;
    columns: string[];
    rows: string[][];
  };
  metrics: { value: string; label: string }[];
  links: { label: string; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ledgr",
    title: "Ledgr",
    year: 2026,
    status: "Live, open source",
    kind: "Personal finance",
    tagline: "Know where your money went before the month ends.",
    summary:
      "A personal finance app that plans around your real payday instead of the calendar month, reduces a month of spending to a single 0 to 10 score, and answers questions about your money through an AI assistant that never touches the database directly.",
    lead:
      "Ledgr is a personal finance app built on one belief: a ledger of transactions is not the same thing as understanding your money. It plans around the day you are actually paid instead of the calendar month, reduces a month of spending to a single score you can read at a glance, and answers plain questions about your spending through a grounded AI assistant that never gets direct access to your database. I designed and built the whole thing.",
    image: "/photos/LedgrThumbnail.png",
    accentStack: ["Next.js", "PostgreSQL", "Grounded AI"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Recharts", "next-pwa"],
    meta: [
      { label: "Role", value: "Full-stack engineer" },
      { label: "Scope", value: "Concept, product design, full-stack build" },
      { label: "Platform", value: "Web, installable PWA" },
      { label: "Industry", value: "Personal finance" },
      { label: "Status", value: "Live, open source" },
    ],
    sections: [
      {
        n: "01",
        kicker: "Why this exists",
        heading: "Most money apps record the past. Few tell you what to do next.",
        body: [
          "Every bank app and expense tracker can show you a list of what you spent. Almost none tell you whether that was fine. The gap is not data, most people already have the transaction history. It is turning that history into one clear decision before the month is over and the decision no longer matters.",
          "Ledgr exists to close that gap. Not a better spreadsheet, a single readable signal, with the detail behind it one tap away.",
        ],
        figure: "The money score: 8.6 out of 10, with needs, wants, and savings measured against plan.",
      },
      {
        n: "02",
        kicker: "The problem",
        heading: "Calendar-month budgeting does not match how money actually moves.",
        body: [
          "Most budgeting tools quietly assume you are paid on the 1st and spend in neat 30-day blocks. Real life does not work that way.",
        ],
        bullets: [
          "Salary rarely lands on the 1st, so a monthly budget is measuring the wrong 30 days.",
          "Small, forgettable UPI payments are exactly where money leaks, and most trackers do not keep them attached to a category or a day.",
          "Savings gets treated as whatever is left, instead of a line item in the plan itself.",
          "Cash, cards, UPI, and transfers each tell part of the story. Stitched across five apps, none tell the whole one.",
        ],
      },
      {
        n: "03",
        kicker: "The core idea",
        heading: "Plan around your real payday, not the calendar's.",
        body: [
          "The foundation of Ledgr is the salary cycle: a budget period that runs payday to payday, not the 1st to the 31st. Every category, every trend, every score is measured against that real cycle. On track means on track for how you actually get paid, not for a calendar convention that has nothing to do with your income.",
        ],
        figure: "The salary-cycle selector, sitting next to the calendar-cycle option.",
      },
      {
        n: "04",
        kicker: "How it works",
        heading: "Plan. Log. See. Decide.",
        body: [],
        steps: [
          { label: "Set the plan", body: "Add income, pick a calendar or salary cycle, and shape categories around actual life, not a generic template." },
          { label: "Log in seconds", body: "Capture every expense, income entry, and saving with the payment context, UPI, card, cash, or transfer, that you will need later." },
          { label: "See the pattern", body: "Compare needs, wants, and savings against plan, with trends you can scan instead of dig for." },
          { label: "Ask a better question", body: "A grounded assistant answers things like where did I overspend this cycle, reasoning over your own data without ever being handed database access." },
        ],
      },
      {
        n: "05",
        kicker: "The money score",
        heading: "One number for the month. The reasoning stays visible.",
        body: [
          "A score from 0 to 10 exists so a month is readable at a glance, not a spreadsheet you have to interpret cold. Below 5, the plan has drifted enough that the answer is fix the biggest category, not every small purchase. Between 5 and 8, parts of the plan are holding and a couple of categories need attention before the cycle closes. Above 8, needs, wants, and savings are close enough to plan that the job is protecting what already works.",
          "The score is a summary, never the whole answer. The needs, wants, and savings breakdown and the daily trend sit one tap behind it for anyone who wants to see exactly what moved it.",
        ],
        figure: "The three score bands: reset the plan, getting steadier, and on track.",
      },
      {
        n: "06",
        kicker: "The hard part",
        heading: "Letting an AI answer questions about your money without letting it near your database.",
        body: [
          "The obvious way to build ask AI about your spending is to give a model query access to the transaction table and let it write SQL on demand. That is also the fastest way to turn a budgeting app into a data-access incident, one bad prompt or one bug in the query layer away from exposing data it should never touch, or worse, writing to it.",
          "Ledgr's assistant is grounded instead. It reasons over your own spending through fixed, read-only tools to answer a question like where did I overspend this cycle, without ever being granted a live connection to the underlying database. The assistant gets exactly the shape of data it needs to answer the question in front of it, and nothing else.",
        ],
        figure: "The Ask AI assistant answering a spending question, grounded in read-only tools.",
      },
      {
        n: "07",
        kicker: "Built to be checked",
        heading: "Open source, on a plain stack, and yours alone.",
        body: [
          "Ledgr is live and open source. The repo, contributing guide, and README are public alongside the product. It runs on a deliberately plain, well-understood stack, Next.js, React, and PostgreSQL, so the interesting parts of the product are the budgeting model and the grounded AI boundary, not the plumbing underneath.",
          "The account is a private workspace, not a feed for an ad network or a dataset for aggregation. The model answering your questions is scoped to your data only, never the reverse.",
        ],
      },
    ],
    comparison: {
      title: "Where it fits",
      note: "Clarity, not another spending chart.",
      columns: ["What matters", "Ledgr", "Typical tracker"],
      rows: [
        ["Planning", "Calendar or salary cycle", "Usually calendar-only"],
        ["Budget model", "Needs, wants, and savings", "One generic spend limit"],
        ["Context", "Category, payment mode, notes", "Amount and merchant only"],
        ["Analysis", "Weekly to yearly, plus grounded Ask AI", "Basic monthly totals"],
        ["Privacy", "Private account workspace", "Often ad or aggregation driven"],
        ["Price", "Free to start", "Paywall before real clarity"],
      ],
    },
    metrics: [
      { value: "0-10", label: "money score that summarizes an entire cycle" },
      { value: "3", label: "budget categories tracked against plan: needs, wants, savings" },
      { value: "0", label: "database access granted to the AI assistant" },
      { value: "4", label: "payment modes unified into one ledger: UPI, cards, cash, transfers" },
    ],
    links: [
      { label: "Try Ledgr", href: "https://theledgrapp.vercel.app/" },
      { label: "View the repo", href: "https://github.com/sidonweb/ledgr" },
    ],
  },
  {
    slug: "greenlight",
    title: "Greenlight",
    year: 2026,
    status: "In active development",
    kind: "AI experiment copilot",
    tagline: "Turn A/B test noise into a verdict you can trust.",
    summary:
      "An agent that reads a live A/B test the way a data analyst would: it opens both variants in a real browser, works out what changed, pulls the event data, runs the statistics, and returns a Scale, Continue, Stop, or Rollback call a PM can act on immediately.",
    lead:
      "Greenlight reads a live A/B test the way a data analyst would. It opens both variants in a real browser, works out what actually changed, pulls the event data, runs the statistics, and hands a PM a Scale, Continue, Stop, or Rollback call they can act on immediately. No dashboard full of charts to interpret alone, no waiting on an analyst's queue. I designed the agent's decision pipeline and built the system end to end: backend, agent, and dashboard.",
    image: "/photos/greenlight-thumbnail.png",
    accentStack: ["LangGraph", "FastAPI", "Read-only SQL"],
    stack: ["FastAPI", "LangGraph", "Claude", "Playwright MCP", "PostgreSQL", "React", "Docker"],
    meta: [
      { label: "Role", value: "AI and full-stack engineer" },
      { label: "Scope", value: "Concept, agent design, full-stack build" },
      { label: "Platform", value: "Web dashboard, any web test subject" },
      { label: "Industry", value: "Experimentation and analytics" },
      { label: "Status", value: "Hackathon build, in active development" },
    ],
    sections: [
      {
        n: "01",
        kicker: "Why this exists",
        heading: "A PM should not need a data analyst to know if a test worked.",
        body: [
          "Every team running experiments hits the same wall. The test is live, the numbers are trickling in, and the person who most needs an answer, the PM, cannot get one without either learning SQL or waiting for someone who can write it. By the time the analysis comes back, the moment to act on it has often passed.",
          "The Copilot exists to close that gap. Not another chart to stare at, a verdict, with the reasoning attached, the moment enough data exists to trust it.",
        ],
        figure: "A decision card in chat: the verdict, its confidence, and the reasoning behind it.",
        image: "/photos/greenlight-img5.png",
      },
      {
        n: "02",
        kicker: "The problem",
        heading: "Dashboards show you numbers. They do not tell you what to do.",
        body: [
          "Most experimentation tools stop at here is the data. A PM still has to notice the right delta, know whether it is statistically meaningful, and decide what to do about it. Three separate skills, none of which is run the business.",
        ],
        bullets: [
          "Generic dashboards report metrics configured up front, and someone has to remember to configure the right one.",
          "A raw p-value means nothing to most PMs without someone translating it into a decision.",
          "By the time an analyst is looped in to sanity-check a test, days have usually passed.",
          "Every new test subject needs its own custom integration before anyone can even look at its data.",
        ],
      },
      {
        n: "03",
        kicker: "The core idea",
        heading: "One agent, with a hard line between what it decides and what it computes.",
        body: [
          "The Copilot is a single LangGraph agent a PM talks to like a colleague. The design choice that makes it trustworthy, not just impressive, is a strict boundary: the agent can look, reason, and decide which metric matters, but it never computes the statistics itself. The z-test and the Scale, Continue, Stop, or Rollback rule live in plain, deterministic code the model cannot touch. Ask it the same question on the same data twice and the number never moves, only the explanation might read a little differently.",
        ],
        figure: "The chat interface mid-conversation, with the agent explaining its reasoning.",
        image: "/photos/greenlight-chat.png",
      },
      {
        n: "04",
        kicker: "The pipeline",
        heading: "It never guesses the metric. It looks first.",
        body: [
          "The interesting engineering problem was not the statistics, it was refusing to hardcode what success means. A hardcoded conversion equals checkout_completed breaks the moment you point the Copilot at a different product. So every analysis runs through the same widening chain.",
        ],
        steps: [
          { label: "Inspect", body: "A real headless browser opens both variant URLs and captures what is actually on the page." },
          { label: "Infer", body: "The agent compares the two DOM snapshots against the event names that genuinely exist in the data, and picks the one metric that reflects what changed." },
          { label: "Query", body: "A dedicated read-only data sub-agent writes and runs the SQL to pull that metric per variant." },
          { label: "Decide", body: "A fixed, testable rule set turns the numbers into Scale, Continue, Stop, or Rollback." },
        ],
      },
      {
        n: "05",
        kicker: "The verdict engine",
        heading: "A recommendation you can check, never a black box.",
        body: [
          "A PM acting on a Scale or Rollback call is making a real business decision, so it cannot be something they take on faith. The statistics module runs a two-proportion z-test against the exact counts the data sub-agent pulled, and the verdict rules are a fixed table, not a judgment the model makes fresh each time. Every decision comes back with the p-value, the uplift, and the actual SQL that ran, so a skeptical PM can check the work in seconds.",
        ],
        figure: "The Apply Recommendation modal: verdict, confidence, and the option to update the traffic split.",
        image: "/photos/greenlight-img4.png",
      },
      {
        n: "06",
        kicker: "The hard part",
        heading: "Keeping the agent honest when it is easier for it to fake the work.",
        body: [
          "The hardest problem was not statistics, it was language models. Left alone, a model will sometimes narrate what a SQL query would return instead of actually calling the tool to run it, especially under pressure in a multi-step reasoning chain. That is invisible in a demo and dangerous in production: a confident answer built on a query that never ran.",
          "The fix was architectural, not prompt tuning. The data-fetching step was pulled into its own sub-agent with a narrow job and a hard requirement to call the tool before answering, and the main agent's prompt walks the pipeline as an explicit, ordered checklist rather than trusting the model to remember the right order. It is the kind of failure you only catch by watching an agent work, not by reading its final answer.",
        ],
      },
      {
        n: "07",
        kicker: "The security lens",
        heading: "The agent that reads your production data cannot be trusted to also write to it.",
        body: [
          "This is the part most AI analytics tools skip. The Copilot's SQL access runs as a dedicated read-only Postgres role, not the app's normal database user, with three independent layers stopping it from doing damage. The query has to start with SELECT or it is rejected before running. A second check blocks any write keyword even if it slips past the first. A row limit is enforced even when the agent does not ask for one. Underneath all of it, the role itself has no write grants, so even a bug in the app layer cannot turn into a mutation.",
        ],
        figure: "The architecture: the read-only agent role, isolated from any write path.",
        image: "/photos/greenlight-architecture.png",
      },
      {
        n: "08",
        kicker: "Where it is",
        heading: "Started in a hackathon, still being hardened.",
        body: [
          "The Copilot began as a hackathon build and I have kept building on it since, using Claude as an engineering partner throughout, from designing the agent's tool boundaries to writing the FastAPI and React around it. The decisions that mattered most, refusing to let the model touch the statistics, sandboxing its database access at the role level, forcing it to look at the actual pages instead of trusting a config value, were product and security calls before they were code.",
          "It is honest about where it still is. Today the agent's database access sits on the same Postgres instance as the test subject's data, separated by role, not by network. Event ingestion is a direct synchronous write rather than a queued one. Both are active work: moving the agent onto its own database, and decoupling ingestion behind a proper event queue, so any test subject can plug in without ever handing over credentials.",
        ],
      },
    ],
    comparison: {
      title: "Where it fits",
      note: "Next to the tools already in a PM's stack.",
      columns: ["Tool", "Nails", "Leaves you"],
      rows: [
        ["Generic analytics dashboards", "Real-time charts once someone configures the right metric", "Still having to notice the signal and decide what it means"],
        ["A plain LLM chatbot on your data", "Fast, conversational answers", "No guardrail against a wrong number stated with confidence"],
        ["A data analyst", "Judgment you can trust", "A queue, and an answer that lands after the moment to act"],
        ["Greenlight", "Inspects the pages, grounds every number in a read-only query it shows you, and returns a verdict in the time it takes to ask", ""],
      ],
    },
    metrics: [
      { value: "13", label: "feature specs shipped across agent, dashboard, and evaluation harness" },
      { value: "3", label: "independent layers guarding every SQL query the agent runs" },
      { value: "0", label: "write grants on the role the agent connects with" },
      { value: "6", label: "services running together: two backends, two frontends, browser automation, Postgres" },
    ],
    links: [
      { label: "View the repo", href: "https://github.com/sidonweb/greenlight" },
    ],
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
  { to: 15, suffix: "+", label: "Tech stacks" },
  { to: 50, prefix: "~", suffix: "ms", label: "Broadcast latency" },
];

// Pre-launch: set the real resumeUrl and calUrl.
export const links = {
  resumeUrl: "/resume.pdf",
  calUrl: "https://cal.com/sidonweb",
};

