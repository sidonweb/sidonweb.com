"use client";

import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import ProfileSlideshow from "./profile-slides";
import { socialLinks } from "../config";

const socials = [
  { href: socialLinks.github, icon: FaGithub, label: "GitHub" },
  { href: socialLinks.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
  { href: socialLinks.twitter, icon: FaXTwitter, label: "Twitter" },
  { href: socialLinks.email, icon: TbMailFilled, label: "Email" },
];

export default function Hero() {
  return (
    <header className="pt-10 sm:pt-14">
      <div className="flex items-center gap-5 sm:gap-6">
        <ProfileSlideshow />

        <div className="min-w-0 flex-1">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Siddharth Singh
          </h1>
          <p className="mt-1.5 text-lg text-neutral-600 dark:text-neutral-400">
            Full-Stack Engineer
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for work
            </span>
            <span className="text-neutral-300 dark:text-neutral-600">•</span>
            <span>Greater Noida, India</span>
          </div>
        </div>
      </div>

      <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-neutral-700 dark:text-neutral-300">
        I&apos;m a full-stack engineer who builds fast, reliable web apps, mostly
        around real-time systems. Right now I&apos;m at{" "}
        <Link
          href="https://www.housysit.com"
          target="_blank"
          className="font-medium text-neutral-900 dark:text-neutral-100 underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-4 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition"
        >
          Houston Systems
        </Link>
        .
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link
          href="#contact"
          className="inline-flex items-center rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition"
        >
          Get in touch
        </Link>
        <div className="flex items-center gap-1">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-white/5 transition"
            >
              <Icon className="text-lg" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
