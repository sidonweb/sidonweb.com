"use client";

import React from "react";
import Link from "next/link";
import {
  FaXTwitter,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { metaData, socialLinks } from "app/config";

const pages = [
  { href: "/work", label: "Work" },
  { href: "/blogs", label: "Blogs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/stack", label: "Stack" },
  { href: "/meditate", label: "Meditate" },
];

const connect = [
  { href: socialLinks.github, label: "GitHub" },
  { href: socialLinks.linkedin, label: "LinkedIn" },
  { href: socialLinks.twitter, label: "Twitter" },
  { href: socialLinks.email, label: "Email" },
  { href: "/rss.xml", label: "RSS" },
];

const socialIcons = [
  { href: socialLinks.github, icon: FaGithub, label: "GitHub" },
  { href: socialLinks.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
  { href: socialLinks.twitter, icon: FaXTwitter, label: "Twitter" },
  { href: socialLinks.email, icon: TbMailFilled, label: "Email" },
];

function ColumnLink({ href, label }: { href: string; label: string }) {
  const external = !href.startsWith("/");
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 border-t border-neutral-200 dark:border-white/10 pt-12 pb-16">
      <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
        {/* Brand + now playing */}
        <div className="max-w-sm">
          <Link
            href="/"
            className="text-xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-[#47a3f3] via-purple-500 to-[#47a3f3] animate-text tracking-tight"
          >
            sidonweb
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            Full-stack engineer building fast, reliable web apps. Always open to
            interesting work.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex gap-12 sm:gap-16">
          <nav className="flex flex-col gap-3">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
              Pages
            </p>
            {pages.map((l) => (
              <ColumnLink key={l.href} {...l} />
            ))}
          </nav>
          <nav className="flex flex-col gap-3">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
              Connect
            </p>
            {connect.map((l) => (
              <ColumnLink key={l.label} {...l} />
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-14 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          © {year} {metaData.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-4 text-lg text-neutral-400 dark:text-neutral-500">
          {socialIcons.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
