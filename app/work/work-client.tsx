"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { projects } from "./project-data";
import PageHeader from "../components/page-header";

const experience = [
  {
    company: "Houston Systems",
    role: "Full Stack Developer",
    type: "Full Time",
    location: "Greater Noida · On-Site",
    period: "Jan 2025 – Present",
    logo: "/logos/houston.png",
    initials: "HS",
    bullets: [
      "Built and maintained frontend and backend systems for a Toll Management System handling 10K+ vehicles daily across 16+ lanes, supporting real-time lane operations.",
      "Developed backend APIs, database schemas, and rate limiting to reliably process high-frequency RFID and lane events.",
      "Implemented real-time frontend state management using Redux and WebSockets to reflect lane states, incidents, and operator actions without data inconsistencies.",
      "Decoupled vehicle and payment flow using queues, reducing incident resolution time by 40% even during bank or payment service outages.",
      "Migrated a legacy Bootstrap-based React site to TypeScript + Vite + React + Tailwind, improving LCP and overall page load time by 42%.",
    ],
    stack: [
      "React", "TypeScript", "Node.js", "Express",
      "MySQL", "Redis", "Kafka", "WebSockets", "Redux",
    ],
  },
  {
    company: "Keyaan Distilleries",
    role: "Graduate Engineering Trainee",
    type: "",
    location: "Gorakhpur, Uttar Pradesh · On-Site",
    period: "Aug 2024 – Oct 2024",
    logo: "/logos/keyaan_distilleries_logo.jpg",
    initials: "KD",
    bullets: [
      "Worked on designing and optimizing the company website with a focus on responsiveness, performance, and overall user experience.",
    ],
    stack: [
      "React", "TypeScript", "Node.js", "Express", "Next.js",
      "TailwindCSS", "SEO", "Performance Optimization",
    ],
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-neutral-100 dark:bg-white/5">
        <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/85 dark:bg-black/60 backdrop-blur px-2 py-0.5 text-[11px] font-medium text-neutral-700 dark:text-neutral-200">
          <span className={`h-1.5 w-1.5 rounded-full ${project.status === "Live" ? "bg-green-500" : "bg-yellow-500"}`} />
          {project.status}
        </span>
        <Image
          alt={`${project.title} preview`}
          src={project.imgurl}
          fill
          sizes="(min-width: 640px) 320px, 100vw"
          className="object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-3.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
            {project.title}
          </h3>
          <span className="flex items-center gap-1.5 shrink-0 font-mono text-xs text-neutral-400 dark:text-neutral-500">
            {project.year}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-600 dark:group-hover:text-neutral-300" />
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ExperienceRow({ job }: { job: (typeof experience)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 dark:border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-black/5 dark:ring-white/10">
          {job.logo ? (
            <Image src={job.logo} alt={job.company} width={48} height={48} className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm font-semibold text-neutral-500">{job.initials}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
              {job.company}
            </span>
            {job.type && (
              <span className="rounded-full border border-neutral-200 dark:border-white/15 px-2 py-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                {job.type}
              </span>
            )}
          </div>
          <div className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">{job.role}</div>
        </div>

        <div className="hidden shrink-0 text-right sm:block">
          <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400">{job.period}</div>
          <div className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">{job.location}</div>
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div className={`grid transition-all duration-500 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="pb-6 pl-16">
            <ul className="space-y-2.5">
              {job.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
              {job.stack.map((tech) => (
                <span key={tech} className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { id: "projects" as const, label: "Projects", count: projects.length },
  { id: "experiences" as const, label: "Experience", count: experience.length },
];

export default function WorkClient() {
  const [activeTab, setActiveTab] = useState<"projects" | "experiences">("projects");

  return (
    <section className="min-h-[400px]">
      <PageHeader
        label="Work"
        title="Projects & experience"
        description="A selection of things I've designed, built, and shipped, plus where I've worked along the way."
      />

      {/* Tab switcher */}
      <div className="mt-8 flex items-center gap-7 border-b border-neutral-200 dark:border-white/10">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative -mb-px flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${
                active
                  ? "text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              {tab.label}
              <span className={`rounded-full px-1.5 py-0.5 font-mono text-[11px] ${active ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-neutral-100 text-neutral-400 dark:bg-white/10 dark:text-neutral-500"}`}>
                {tab.count}
              </span>
              {active && (
                <span className="absolute -bottom-px left-0 h-0.5 w-full rounded-full bg-neutral-900 dark:bg-neutral-100" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-10">
        {activeTab === "projects" ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 animate-[fadeIn_0.3s_ease-out]">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        ) : (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            {experience.map((job, index) => (
              <ExperienceRow key={index} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
