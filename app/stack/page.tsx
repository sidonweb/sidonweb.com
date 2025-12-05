import { Claudeicon, Dockericon, Drizzleicon, Expressicon, Geminiicon, Githubicon, Giticon, Honoicon, Javaicon, Javascripticon, Mongodbicon, Mysqlicon, Netlifyicon, Nexticon, Nodejsicon, Openaiicon, Postgresqlicon, Prismaicon, Pythonicon, Reacthookicon, Reacticon, Redisicon, Reduxicon, Shadcn, Socketioicon, Supabaseicon, Tailwindicon, Typescripticon, Vercelicon, Zustandicon } from "app/lib/icons";


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
            { name: "React", icon: <Reacticon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Next.js", icon: <Nexticon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "TypeScript", icon: <Typescripticon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "JavaScript", icon: <Javascripticon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Tailwind CSS", icon: <Tailwindicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Shadcn/UI", icon: <Shadcn className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
        ]
    },

    {
        title: "State & Logic",
        items: [
            { name: "Redux", icon: <Reduxicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Zustand", icon: <Zustandicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "React Hook Form", icon: <Reacthookicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> }
        ]
    },

    {
        title: "Backend",
        items: [
            { name: "Node.js", icon: <Nodejsicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Express.js", icon: <Expressicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Hono", icon: <Honoicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Supabase", icon: <Supabaseicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Drizzle ORM", icon: <Drizzleicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Prisma", icon: <Prismaicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Socket.io", icon: <Socketioicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Redis", icon: <Redisicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> }
        ]
    },

    {
        title: "Databases",
        items: [
            { name: "MongoDB", icon: <Mongodbicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "MySQL", icon: <Mysqlicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "PostgreSQL", icon: <Postgresqlicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> }
        ]
    },

    {
        title: "Languages",
        items: [
            { name: "Java", icon: <Javaicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Python", icon: <Pythonicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> }
        ]
    },

    {
        title: "Dev Tools & Deployment",
        items: [
            { name: "Git", icon: <Giticon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "GitHub", icon: <Githubicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Docker", icon: <Dockericon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Vercel", icon: <Vercelicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Netlify", icon: <Netlifyicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> }
        ]
    },

    {
        title: "AI & APIs",
        items: [
            { name: "OpenAI", icon: <Openaiicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Claude", icon: <Claudeicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> },
            { name: "Gemini", icon: <Geminiicon className="prose prose-neutral dark:prose-invert w-5 h-5" /> }
        ]
    }
];

export default function Stack() {
    return (
        <div className=" grid grid-cols-1 gap-4">
            {stackData.map((section) => (
                <section key={section.title} className="prose prose-neutral dark:prose-invert">
                    <div className="grid gap-6">
                        <div className="">
                            <h3 className="prose prose-neutral dark:prose-invert mt-0 text-lg lowercase">
                                <span className="newsreader_8f0c5217-module__jVM0Qq__className">
                                    {section.title}
                                </span>
                            </h3>

                            <div className="mt-3 flex flex-wrap gap-3">
                                {section.items.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex cursor-context-menu items-center gap-2 rounded-md bg-[#b4b4b4]/5 px-2 py-1 transition-all border border-[#393939]  hover:border-[#2e2e2e]"
                                    >
                                        {item.icon}
                                        <span className="prose prose-neutral dark:prose-invert text-xs">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
