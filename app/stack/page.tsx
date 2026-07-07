import { Claudeicon, Dockericon, Drizzleicon, Expressicon, Geminiicon, Githubicon, Giticon, Honoicon, Javaicon, Javascripticon, Mongodbicon, Mysqlicon, Netlifyicon, Nexticon, Nodejsicon, Openaiicon, Postgresqlicon, Prismaicon, Pythonicon, Reacthookicon, Reacticon, Redisicon, Reduxicon, Shadcn, Socketioicon, Supabaseicon, Tailwindicon, Typescripticon, Vercelicon, Zustandicon } from "app/lib/icons";
import PageHeader from "app/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack",
  description:
    "The tools, languages, and frameworks Siddharth Singh uses to build and ship applications.",
  alternates: { canonical: "/stack" },
  openGraph: {
    title: "Tech Stack — Siddharth Singh",
    description:
      "The tools, languages, and frameworks Siddharth Singh uses to build and ship applications.",
    url: "https://sidonweb.com/stack",
    type: "website",
  },
};

type Skill = {
    name: string;
    icon: React.ReactNode;
};

type Section = {
    title: string;
    items: Skill[];
};

const stackData: Section[] = [
    {
        title: "Frontend",
        items: [
            { name: "React", icon: <Reacticon className="h-5 w-5" /> },
            { name: "Next.js", icon: <Nexticon className="h-5 w-5" /> },
            { name: "TypeScript", icon: <Typescripticon className="h-5 w-5" /> },
            { name: "JavaScript", icon: <Javascripticon className="h-5 w-5" /> },
            { name: "Tailwind CSS", icon: <Tailwindicon className="h-5 w-5" /> },
            { name: "Shadcn/UI", icon: <Shadcn className="h-5 w-5" /> },
        ]
    },

    {
        title: "State & Logic",
        items: [
            { name: "Redux", icon: <Reduxicon className="h-5 w-5" /> },
            { name: "Zustand", icon: <Zustandicon className="h-5 w-5" /> },
            { name: "React Hook Form", icon: <Reacthookicon className="h-5 w-5" /> }
        ]
    },

    {
        title: "Backend",
        items: [
            { name: "Node.js", icon: <Nodejsicon className="h-5 w-5" /> },
            { name: "Express.js", icon: <Expressicon className="h-5 w-5" /> },
            { name: "Hono", icon: <Honoicon className="h-5 w-5" /> },
            { name: "Supabase", icon: <Supabaseicon className="h-5 w-5" /> },
            { name: "Drizzle ORM", icon: <Drizzleicon className="h-5 w-5" /> },
            { name: "Prisma", icon: <Prismaicon className="h-5 w-5" /> },
            { name: "Socket.io", icon: <Socketioicon className="h-5 w-5" /> },
            { name: "Redis", icon: <Redisicon className="h-5 w-5" /> }
        ]
    },

    {
        title: "Databases",
        items: [
            { name: "MongoDB", icon: <Mongodbicon className="h-5 w-5" /> },
            { name: "MySQL", icon: <Mysqlicon className="h-5 w-5" /> },
            { name: "PostgreSQL", icon: <Postgresqlicon className="h-5 w-5" /> }
        ]
    },

    {
        title: "Languages",
        items: [
            { name: "Java", icon: <Javaicon className="h-5 w-5" /> },
            { name: "Python", icon: <Pythonicon className="h-5 w-5" /> }
        ]
    },

    {
        title: "Dev Tools & Deployment",
        items: [
            { name: "Git", icon: <Giticon className="h-5 w-5" /> },
            { name: "GitHub", icon: <Githubicon className="h-5 w-5" /> },
            { name: "Docker", icon: <Dockericon className="h-5 w-5" /> },
            { name: "Vercel", icon: <Vercelicon className="h-5 w-5" /> },
            { name: "Netlify", icon: <Netlifyicon className="h-5 w-5" /> }
        ]
    },

    {
        title: "AI & APIs",
        items: [
            { name: "OpenAI", icon: <Openaiicon className="h-5 w-5" /> },
            { name: "Claude", icon: <Claudeicon className="h-5 w-5" /> },
            { name: "Gemini", icon: <Geminiicon className="h-5 w-5" /> }
        ]
    }
];

export default function Stack() {
    return (
        <section>
            <PageHeader
                label="Stack"
                title="Tools I build with"
                description="The languages, frameworks, and services I reach for most when shipping."
            />
            <div className="mt-10 flex flex-col gap-9">
                {stackData.map((group) => (
                    <div key={group.title}>
                        <h2 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                            {group.title}
                        </h2>
                        <div className="flex flex-wrap gap-2.5">
                            {group.items.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] px-3 py-1.5 text-sm text-neutral-700 dark:text-neutral-300 transition-colors hover:border-neutral-300 dark:hover:border-white/20 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
