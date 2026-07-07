const testimonials = [
    {
        pfp: "https://randomuser.me/api/portraits/lego/1.jpg",
        name: "Harshal S.",
        role: "MedyMatic",
        quote: "Great working with you. The task was done before the expected timeline, and you stayed flexible with every change I asked for along the way. Really loved your work."
    },
    {
        pfp: "/armaan.jpg",
        name: "Armaan Parvez",
        role: "Head of UI/UX @DinnovaAG",
        quote: "I've worked with Siddharth on both personal and client projects. He gets the problem fast, builds practical solutions, and always thinks about usability. Solid, reliable, and sharp. If you need a full-stack dev, just hire him."
    },
    {
        pfp: "https://randomuser.me/api/portraits/lego/2.jpg",
        name: "Matt F.",
        role: "Founder @ReadySetShoot",
        quote: "He created a clean, intuitive experience for the website. His communication is spot on and he's always open to refining things where needed. Looking forward to working with him again."
    }
];

export default function Testimonials() {
    return (
        <div className="flex flex-col gap-9">
            {testimonials.map((t, i) => (
                <figure key={i}>
                    <blockquote className="text-[17px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                        &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-3.5 flex items-center gap-3">
                        <img
                            src={t.pfp}
                            className="h-9 w-9 rounded-full object-cover bg-neutral-100 dark:bg-white/5"
                            alt={t.name}
                            loading="lazy"
                        />
                        <div className="leading-tight">
                            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                {t.name}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                {t.role}
                            </p>
                        </div>
                    </figcaption>
                </figure>
            ))}
        </div>
    );
}
