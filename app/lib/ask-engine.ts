import {
  projects,
  capabilities,
  stackGroups,
  profile,
  testimonials,
} from "./data";

export type Source = { label: string; href: string };
export type Answer = { text: string; sources: Source[] };

type Passage = {
  id: string;
  label: string;
  href: string;
  text: string;
  keywords: string[];
};

const passages: Passage[] = [
  ...projects.map((p) => ({
    id: `project-${p.slug}`,
    label: p.title,
    href: `/work/${p.slug}`,
    text: `I built ${p.title} in ${p.year}, a ${p.kind} project. ${p.summary}`,
    keywords: [
      p.title,
      ...p.kind.split(/[^a-z]+/i),
      ...p.stack,
      ...p.accentStack,
      p.tagline,
    ].map((s) => s.toLowerCase()),
  })),
  ...capabilities.map((c, i) => ({
    id: `cap-${i}`,
    label: "Stack",
    href: "/stack",
    text: `${c.title}: ${c.body}`,
    keywords: [c.title, ...c.tags].map((s) => s.toLowerCase()),
  })),
  {
    id: "story",
    label: "About",
    href: "/about",
    text: "I got into tech running events in college and ended up leading the teams behind them. This past year I ran e-ticketing for IPL match days at the New PCA Stadium in Chandigarh, moving 30,000 to 40,000 people through the gates in about two hours. It taught me to stay calm when things break, and it's why I gravitate toward real-time systems that hold up under load.",
    keywords: ["story", "background", "college", "events", "leadership", "ipl", "stadium", "cricket", "pressure", "calm", "40000", "chandigarh", "experience"],
  },
  {
    id: "now",
    label: "About",
    href: "/about",
    text: "These days I work across the TypeScript stack, mostly on real-time systems and AI features. I'm a full-stack engineer at Houston Systems, and I'm building Raasta on the side.",
    keywords: ["now", "current", "currently", "job", "work", "houston", "raasta", "role", "doing"],
  },
  {
    id: "stack",
    label: "Stack",
    href: "/stack",
    text: `My daily drivers are ${["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Tailwind"].join(", ")}. I'm also comfortable with Kafka, WebSockets, pgvector, the OpenAI API, Docker, and more.`,
    keywords: ["stack", "tools", "technologies", "tech", "languages", "skills", "frameworks"],
  },
  {
    id: "availability",
    label: "Contact",
    href: "/contact",
    text: `I'm available for work right now. I'm open to full-time roles and a bit of freelance, based in ${profile.location}, working worldwide, and I usually reply within a day.`,
    keywords: ["available", "availability", "hiring", "hire", "open", "freelance", "full-time", "job", "start", "notice", "looking"],
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    text: `You can reach me at ${profile.email}, or through GitHub, LinkedIn, and X. My resume and a booking link are both on the contact page.`,
    keywords: ["contact", "email", "reach", "touch", "message", "resume", "cv", "call", "linkedin", "github"],
  },
  {
    id: "testimonials",
    label: "About",
    href: "/about",
    text: "People I've worked with tend to say I understand the problem quickly, build practical things, and care about how they feel to use. One of them put it simply: if you need a full-stack dev, just hire him.",
    keywords: ["testimonial", "reference", "recommend", "review", "people", "say", "colleague", "reliable", "trust"],
  },
  {
    id: "why-hire",
    label: "About",
    href: "/about",
    text: "Honestly? I ship end-to-end and I ship fast, I've been tested under real pressure (40,000 people, live, no rollbacks), and I build things that don't fall over at 2am. I also care about the people using the thing, not just the code.",
    keywords: ["why", "hire", "reason", "stand out", "different", "special", "convince", "value", "good", "best"],
  },
  {
    id: "experience",
    label: "Work",
    href: "/work",
    text: "I've been building for 3+ years and shipped six projects that are live, spanning real-time systems, AI retrieval, and full products people actually use. The Work and Stack pages have the details.",
    keywords: ["experience", "years", "long", "seniority", "senior", "junior", "many", "shipped", "track", "record", "portfolio"],
  },
  {
    id: "process",
    label: "About",
    href: "/about",
    text: "How I work: I reach for the boring, dependable tool over the exciting one, I get something real in front of people fast and then sharpen it, and I say the hard thing early if a deadline or an idea looks shaky.",
    keywords: ["process", "approach", "style", "philosophy", "principle", "principles", "method", "values", "team", "collaborate", "communication", "workflow"],
  },
  {
    id: "hobbies",
    label: "About",
    href: "/about",
    text: "Outside of code I'm at the gym most mornings, I follow Formula 1 most weekends, and I watch a lot of films.",
    keywords: ["hobby", "hobbies", "fun", "outside", "free", "gym", "fitness", "f1", "formula", "racing", "movie", "movies", "film", "films", "interests", "life", "personal", "weekend"],
  },
  {
    id: "rates",
    label: "Contact",
    href: "/contact",
    text: "For freelance it depends on the scope and timeline. The best move is a short note about the project, and I'll come back with specifics quickly.",
    keywords: ["rate", "rates", "price", "pricing", "cost", "charge", "budget", "salary", "pay", "money", "expensive", "quote"],
  },
  {
    id: "remote",
    label: "Contact",
    href: "/contact",
    text: `I work remotely with teams worldwide from ${profile.location}, and I'm comfortable across time zones. Open to relocation for the right role.`,
    keywords: ["remote", "relocate", "relocation", "onsite", "hybrid", "timezone", "worldwide", "abroad", "visa", "office"],
  },
];

const STOP = new Set(["the", "a", "an", "is", "are", "was", "were", "do", "does", "did", "he", "his", "him", "sid", "you", "your", "what", "which", "who", "how", "and", "or", "of", "to", "in", "on", "for", "with", "about", "have", "has", "had", "can", "could", "would", "should", "me", "tell", "give", "any", "some", "that", "this", "it", "i", "we", "they", "am"]);

const techAliases: Record<string, string> = {
  ts: "TypeScript",
  js: "JavaScript",
  next: "Next.js",
  nextjs: "Next.js",
  node: "Node.js",
  nodejs: "Node.js",
  postgres: "PostgreSQL",
  psql: "PostgreSQL",
  ws: "WebSockets",
  websocket: "WebSockets",
  realtime: "real-time",
  "real time": "real-time",
  rag: "RAG",
  ai: "AI",
  llm: "AI",
  ml: "AI",
  tailwind: "Tailwind CSS",
};

const allTech = Array.from(
  new Set([
    ...projects.flatMap((p) => p.stack),
    ...stackGroups.flatMap((g) => g.items),
    "real-time",
    "AI",
    "RAG",
  ]),
);

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9.+#\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function detectTech(q: string): string | null {
  const lc = q.toLowerCase();
  for (const [alias, canon] of Object.entries(techAliases)) {
    if (lc.includes(alias)) return canon;
  }
  const sorted = [...allTech].sort((a, b) => b.length - a.length);
  for (const t of sorted) {
    if (lc.includes(t.toLowerCase())) return t;
  }
  return null;
}

function has(q: string, ...words: string[]) {
  const lc = q.toLowerCase();
  return words.some((w) => lc.includes(w));
}

function retrieve(q: string, k = 2): Passage[] {
  const tokens = tokenize(q);
  if (tokens.length === 0) return [];
  const scored = passages.map((p) => {
    const hay = `${p.text} ${p.keywords.join(" ")}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (p.keywords.includes(t)) score += 3;
      const m = hay.split(t).length - 1;
      score += Math.min(m, 3);
    }
    return { p, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.p);
}

function passage(id: string): Passage {
  return passages.find((p) => p.id === id)!;
}

function toAnswer(ps: Passage[], lead?: string): Answer {
  const seen = new Set<string>();
  const sources: Source[] = [];
  for (const p of ps) {
    if (!seen.has(p.href)) {
      seen.add(p.href);
      sources.push({ label: p.label, href: p.href });
    }
  }
  const body = ps.map((p) => p.text).join(" ");
  return { text: lead ? `${lead} ${body}` : body, sources };
}

export function ask(qRaw: string): Answer {
  const q = qRaw.trim();
  if (!q) {
    return {
      text: "Ask me anything about my work, stack, experience, or whether I'm free to hire.",
      sources: [],
    };
  }

  if (has(q, "what can you", "what can i ask", "how does this work", "what do you know", "help me")) {
    return {
      text: "I can tell you about my projects, my stack and skills, my experience and background, how I work, my hobbies, and whether I'm free to hire. Ask away, or tap a suggestion below.",
      sources: [],
    };
  }
  if (has(q, "why", "convince", "stand out", "should we", "should i", "should they") && has(q, "hire", "you", "him", "sid", "pick", "choose")) {
    return toAnswer([passage("why-hire"), passage("testimonials")]);
  }
  if (has(q, "hobby", "hobbies", "fun", "free time", "gym", "formula", "f1", "movie", "film", "outside of", "interest", "weekend")) {
    return toAnswer([passage("hobbies")]);
  }
  if (has(q, "how do you work", "your process", "approach", "work style", "philosophy", "principle", "values", "collaborat")) {
    return toAnswer([passage("process")]);
  }
  if (has(q, "rate", "pricing", "price", "cost", "charge", "budget", "salary", "how much", "expensive")) {
    return toAnswer([passage("rates")]);
  }
  if (has(q, "remote", "relocat", "onsite", "hybrid", "time zone", "timezone", "visa", "abroad")) {
    return toAnswer([passage("remote")]);
  }
  if (has(q, "available", "availab", "hiring", "open to", "looking for", "notice", "free to", "can you start") && !has(q, "stack")) {
    return toAnswer([passage("availability")]);
  }
  if (has(q, "contact", "email", "reach", "get in touch", "talk to")) {
    return toAnswer([passage("contact")]);
  }
  if (has(q, "resume", "cv", "curriculum")) {
    return {
      text: "You can grab my resume from the sidebar or the contact page.",
      sources: [{ label: "Contact", href: "/contact" }],
    };
  }
  if (has(q, "where", "based", "location", "city", "country", "timezone", "time zone", "remote")) {
    return {
      text: `I'm based in ${profile.location}, and I work with teams worldwide.`,
      sources: [{ label: "Overview", href: "/" }],
    };
  }
  if (has(q, "who are you", "who is", "about you", "background", "story", "yourself", "introduce")) {
    return toAnswer([passage("story"), passage("now")]);
  }
  if (has(q, "best", "favou", "favor", "strongest", "proud", "coolest", "impressive") && has(q, "project", "work", "build")) {
    const votecast = passages.find((p) => p.id === "project-votecast")!;
    return toAnswer([votecast], "The one I'm most proud of technically is probably Votecast.");
  }

  const tech = detectTech(q);
  if (tech && has(q, "know", "experience", "used", "use", "familiar", "worked", "work with", "good at", "can you", "do you", "comfortable", "proficient", "expert", "done")) {
    const projs = projects.filter((p) =>
      p.stack.some((s) => s.toLowerCase() === tech.toLowerCase()) ||
      p.kind.toLowerCase().includes(tech.toLowerCase()),
    );
    if (projs.length) {
      const names = projs.map((p) => p.title);
      const list =
        names.length > 1
          ? `${names.slice(0, -1).join(", ")} and ${names.slice(-1)}`
          : names[0];
      return {
        text: `Yes, I've got real hands-on experience with ${tech}, most visibly in ${list}. ${projs[0].summary}`,
        sources: projs.map((p) => ({ label: p.title, href: `/work/${p.slug}` })),
      };
    }
    return {
      text: `Yes, ${tech} is part of my stack. You can see my whole toolbelt on the Stack page.`,
      sources: [{ label: "Stack", href: "/stack" }],
    };
  }

  if (has(q, "stack", "technolog", "tools", "languages", "skills", "frameworks")) {
    return toAnswer([passage("stack")]);
  }
  if (has(q, "experience", "how long", "years", "seniority", "senior", "track record", "how many")) {
    return toAnswer([passage("experience")]);
  }

  const top = retrieve(q);
  if (top.length === 0) {
    return toAnswer(
      [passage("story"), passage("now")],
      "I'm not fully sure I caught that, but here's the short version of who I am and what I do. You can also try one of the suggestions below.",
    );
  }
  return toAnswer(top);
}

export const suggestions = [
  "What's your experience with real-time systems?",
  "Do you know Kafka?",
  "Why should I hire you?",
  "What's your strongest project?",
  "Are you available for work?",
  "What's your stack?",
];
