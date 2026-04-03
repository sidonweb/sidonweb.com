"use client";
const testimonials = [
    {
        pfp: "https://randomuser.me/api/portraits/lego/1.jpg",
        name: "Anonymous",
        role: "CEO at XYZ",
        quote: "It was a great working with you. The task was completed before expected TAT. The best is you were very flexible with the changes requested at any time during the whole project. Really loved your work."
    },
    {
        pfp: "https://media.licdn.com/dms/image/v2/D5603AQF8GJ3lpX8n8A/profile-displayphoto-scale_200_200/B56Zv1dtR_KIAY-/0/1769349766257?e=1776902400&v=beta&t=o4PMeFWgVKxwZe5jhoft0m_WfbXzi6msRfLJEaVpgyc",
        name: "Armaan Parvez",
        role: "Head of UI/UX @DinnovaAG",
        quote: "I’ve worked with Siddharth on both personal and client projects. He gets the problem fast, builds practical solutions and always thinks about the usability. Solid, reliable, and sharp. If you need a full stack dev, just hire him."
    },
    {
        pfp: "https://randomuser.me/api/portraits/lego/2.jpg",
        name: "Matt Ferguson",
        role: "Founder @ReadySetShoot",
        quote: "He has created a clean and intuitive experience for the website. Siddharth's communication is spot on, and he is always open to discussing ideas and refining things where needed. I look forward to collaborating with him on future projects."
    }
]

function TestimonialCard({ t }: any) {
    return (
        <div className="min-w-[320px] max-w-[320px] flex flex-col justify-between gap-4 p-4">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 m-0 p-0">
                {t.quote}
            </p>
            <div className="flex flex-row justify-start items-center gap-3 mt-4">
                <img
                    src={t.pfp}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={t.name}
                />
                <div className="flex flex-col justify-between items-start">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 m-0 p-0">
                        {t.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 p-0">
                        {t.role}
                    </p>
                </div>

            </div>
        </div>
    );
}

function Row({ reverse = false }: { reverse?: boolean }) {
    const loopData = [...testimonials, ...testimonials]; // infinite feel

    return (
        <div className="overflow-hidden relative
  [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
            <div
                className={`flex gap-4 w-max ${reverse ? "animate-scroll-reverse" : "animate-scroll"
                    } hover:[animation-play-state:paused]`}
            >
                {loopData.map((t, i) => (
                    <TestimonialCard key={i} t={t} />
                ))}
            </div>
        </div>
    );
}

export default function Testimonials() {
    return (
        <div className="flex flex-col gap-6">
            <Row />          {/* left → right */}
            {/* <Row reverse /> */}
        </div>
    );
}