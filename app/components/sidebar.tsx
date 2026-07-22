"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { profile, socials, links } from "../lib/data";
import { navItems, blogsNav, SECTION_IDS } from "./nav-items";
import { useScrollSpy, scrollToSection } from "./use-scroll-spy";
import Button from "./button";
import LocalTime from "./local-time";
import NavStatus from "./nav-status";

function useGoToSection() {
  const pathname = usePathname();
  const router = useRouter();
  return (id: string) => {
    if (pathname === "/" && document.getElementById(id)) {
      scrollToSection(id);
    } else {
      router.push(id === "intro" ? "/" : `/#${id}`);
    }
  };
}

function NavList() {
  const pathname = usePathname();
  const spy = useScrollSpy(SECTION_IDS);
  const go = useGoToSection();
  const active = pathname === "/" ? spy : "";
  const onBlogs = pathname.startsWith("/blogs");

  return (
    <nav aria-label="Primary" className="flex flex-col gap-0.5">
      {navItems.map((item) => {
        const on = active === item.id && !onBlogs;
        return (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            className="group relative flex items-center gap-3.5 py-1.5 text-left"
            aria-current={on ? "true" : undefined}
          >
            <span
              className={`absolute -left-8 h-6 w-[3px] rounded-r-full bg-accent transition-all duration-300 ${
                on ? "opacity-100" : "opacity-0"
              }`}
            />
            <span
              className={`w-4 shrink-0 font-mono text-[11px] tabular-nums transition-colors ${
                on ? "text-accent" : "text-faint group-hover:text-muted"
              }`}
            >
              {item.key}
            </span>
            <span
              className={`font-display text-[23px] font-semibold leading-tight tracking-tight transition-all duration-300 ${
                on
                  ? "text-fg"
                  : "text-faint group-hover:translate-x-0.5 group-hover:text-muted"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}

      <span className="my-2 ml-[30px] h-px w-7 bg-border" />

      <Link
        href="/blogs"
        className="group relative flex items-center gap-3.5 py-1.5 text-left"
        aria-current={onBlogs ? "true" : undefined}
      >
        <span
          className={`absolute -left-8 h-6 w-[3px] rounded-r-full bg-accent transition-all duration-300 ${
            onBlogs ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          className={`flex w-4 shrink-0 items-center transition-colors ${
            onBlogs ? "text-accent" : "text-faint group-hover:text-muted"
          }`}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
        <span
          className={`font-display text-[23px] font-semibold leading-tight tracking-tight transition-all duration-300 ${
            onBlogs
              ? "text-fg"
              : "text-faint group-hover:translate-x-0.5 group-hover:text-muted"
          }`}
        >
          {blogsNav.label}
        </span>
      </Link>
    </nav>
  );
}

export default function Sidebar() {
  const go = useGoToSection();
  return (
    <>
      <aside className="sticky top-0 hidden h-[100dvh] flex-col justify-between border-r border-border px-8 py-8 lg:flex">
        <div>
          <button
            onClick={() => go("intro")}
            className="group flex items-center gap-3.5 text-left"
          >
            <span className="relative h-12 w-12 shrink-0">
              <Image
                src="/profile.jpg"
                alt="Siddharth Singh"
                fill
                sizes="48px"
                className="rounded-full border border-border object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
              />
              <span className="absolute bottom-0 right-0 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-bg bg-bg">
                <span className="pulse-dot h-2 w-2 rounded-full bg-success" />
              </span>
            </span>
            <span>
              <span className="block font-display text-[17px] font-semibold leading-tight tracking-tight text-fg">
                {profile.name}
              </span>
              <span className="mt-1.5 block text-[12.5px] leading-tight text-muted">
                Full-stack engineer
              </span>
            </span>
          </button>
        </div>

        <NavList />

        <div className="space-y-4">
          <div className="text-[12.5px] leading-relaxed text-faint">
            Open to work, worldwide.
          </div>
          <Button
            href={links.resumeUrl}
            external
            variant="secondary"
            size="sm"
            className="w-full"
          >
            Resume <Download className="h-4 w-4 text-faint" />
          </Button>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-muted underline decoration-transparent underline-offset-4 transition-colors hover:decoration-fg hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4 font-mono text-[10.5px] text-faint">
            <LocalTime />
            <button
              onClick={() => window.dispatchEvent(new Event("toggle-cmdk"))}
              className="tracking-wide transition-colors hover:text-fg"
            >
              Press ⌘K
            </button>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-bg px-5 py-3.5 lg:hidden">
        <button
          onClick={() => go("intro")}
          className="font-display text-[17px] font-semibold tracking-tight text-fg"
        >
          Siddharth Singh
        </button>
        <NavStatus />
      </header>
    </>
  );
}
