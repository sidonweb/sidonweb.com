"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "./project-data";

// ---------- Experience data ----------
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
      "Decoupled vehicle and payment flow using queues — reducing incident resolution time by 40% even during bank or payment service outages.",
      "Migrated a legacy Bootstrap-based React site to TypeScript + Vite + React + Tailwind, improving LCP and overall page load time by 42%.",
    ],
    stack: [
      "React", "TypeScript", "Node.js", "Express",
      "MySQL", "Redis", "Kafka", "WebSockets", "Redux",
    ],
  }, {
    company: "Keyaan Distilleries",
    role: "Graduate Engineering Trainee",

    location: "Gorakhpur, Uttar Pradesh · On-Site",
    period: "Aug 2024 – Oct 2024",
    logo: "/logos/keyaan_distilleries_logo.jpg",
    initials: "KD",
    bullets: [
      "Worked on designing and optimizing the company website with a focus on responsiveness, performance, and overall user experience.",
    ],
    stack: [
      "React", "TypeScript", "Node.js", "Express", "Next.js",
      "TailwindCSS", "Search Engine Optimization (SEO)", "Performance Optimization",
    ],
  },
];


function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group w-full h-full block text-neutral-900 dark:text-neutral-100 transition duration-200 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video border border-neutral-200 dark:border-white/10 p-1 rounded-xl">
        <span className={`absolute top-3 left-3 z-10 text-xs ${project.status === "Live" ? "text-green-500" : "text-yellow-500"} bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm px-2 py-0.5 rounded`}>
          {project.status}
        </span>

        <div className="relative w-full h-full border border-neutral-200 dark:border-white/10 rounded-lg overflow-hidden">
          <Image
            alt={`${project.title} preview`}
            src={project.imgurl}
            fill
            className="object-cover transition-transform duration-300 grayscale group-hover:grayscale-0 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Info */}
      <div className="p-1 pt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {project.title}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <span className="mt-1 text-sm text-neutral-900 dark:text-neutral-100 font-medium flex items-center gap-1">
          View Details
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path
              d="M2 6H10M10 6L7 3M10 6L7 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function ExperienceRow({ job }: { job: (typeof experience)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 py-5 text-left"
      >
        {/* Logo / Initials */}
        <div className=" border border-neutral-200 dark:border-white/10 p-1 rounded-xl">
          <div className="w-10 h-10 shrink-0 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white flex items-center justify-center overflow-hidden p-0.5">
            {job.logo ? (
              <Image
                src={job.logo}
                alt={job.company}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                {job.initials}
              </span>
            )}
          </div>
        </div>

        {/* Company + role */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {job.company}
            </span>
            {job.type && (
              <span className="text-xs border border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5 rounded">
                {job.type}
              </span>
            )}
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {job.role}
          </div>
        </div>

        {/* Period + location */}
        <div className="text-right shrink-0 hidden sm:block">
          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {job.period}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {job.location}
          </div>
        </div>

        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`shrink-0 text-neutral-400 transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Expanded */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5">
            <ul className="space-y-2 mb-4">
              {job.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"
                >
                  <span className="mt-2 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {job.stack.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full px-2.5 py-0.5"
                >
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
// ---------- Page ----------

export default function WorkClient() {
  const [activeTab, setActiveTab] = useState<"projects" | "experiences">("projects");

  return (
    <section className="relative min-h-[400px]">
      {/* Toggle Selector */}
      <div className="flex justify-start md:justify-end mb-10">
        <div className="relative flex p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg w-full max-w-[280px]">
          {/* Sliding dynamic background */}
          <div
            className={`absolute top-1 bottom-1 rounded-lg bg-white dark:bg-neutral-800/80 shadow-sm transition-all duration-300 ease-out`}
            style={{
              left: activeTab === "projects" ? "4px" : "calc(50% - 4px)",
              width: "calc(50%)",
            }}
          />
          <button
            onClick={() => setActiveTab("projects")}
            className={`relative z-10 w-1/2 py-1.5 text-xs font-medium rounded-full text-center transition-colors duration-300 focus:outline-none ${activeTab === "projects"
              ? "text-neutral-950 dark:text-white"
              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("experiences")}
            className={`relative z-10 w-1/2 py-1.5 text-xs font-medium rounded-full text-center transition-colors duration-300 focus:outline-none ${activeTab === "experiences"
              ? "text-neutral-950 dark:text-white"
              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
          >
            Experiences
          </button>
        </div>
      </div>

      {/* Tab Contents with entry animations */}
      {activeTab === "projects" ? (
        <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
          <h1 className="mb-8 text-2xl font-medium tracking-tight">A look at my projects</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
          <h2 className="mb-6 text-2xl font-medium tracking-tight">Experiences so far</h2>
          <div>
            {experience.map((job, index) => (
              <ExperienceRow key={index} job={job} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}