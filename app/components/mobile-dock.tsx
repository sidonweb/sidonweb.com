"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronUp,
  Download,
  MessageCircleMore,
  X,
} from "lucide-react";
import { navItems, blogsNav, NavIcon, SECTION_IDS } from "./nav-items";
import { useScrollSpy, scrollToSection } from "./use-scroll-spy";
import { socials, links } from "../lib/data";

export default function MobileDock() {
  const pathname = usePathname();
  const router = useRouter();
  const spy = useScrollSpy(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const onBlogs = pathname.startsWith("/blogs");
  const activeId = onBlogs ? "blogs" : pathname === "/" ? spy : "intro";
  const active = onBlogs
    ? blogsNav
    : navItems.find((n) => n.id === activeId) ?? navItems[0];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const R = 15.5;
  const CIRC = 2 * Math.PI * R;
  const ringRef = useRef<SVGCircleElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ringRef.current)
        ringRef.current.style.strokeDashoffset = String(CIRC * (1 - p));
      if (pctRef.current)
        pctRef.current.textContent = `${String(Math.round(p * 100)).padStart(2, "0")}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [CIRC]);

  const go = (id: string) => {
    setOpen(false);
    if (pathname === "/" && document.getElementById(id)) {
      scrollToSection(id);
    } else {
      router.push(id === "intro" ? "/" : `/#${id}`);
    }
  };

  return (
    <div className="lg:hidden">
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-2xl transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="flex items-center justify-between px-6"
          style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            Menu
          </span>
          <span
            ref={pctRef}
            className="font-mono text-[11px] tabular-nums text-faint"
          >
            00%
          </span>
        </div>

        <nav aria-label="Sections" className="flex flex-1 flex-col justify-center gap-1 px-6">
          {navItems.map((item, i) => {
            const on = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                style={{ transitionDelay: open ? `${90 + i * 45}ms` : "0ms" }}
                className={`group flex items-center gap-5 py-1.5 text-left transition-all duration-500 ease-out ${
                  open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
              >
                <span
                  className={`flex w-6 items-center font-mono text-xs tabular-nums ${
                    on ? "text-accent" : "text-faint"
                  }`}
                >
                  {on ? <ArrowRight className="h-[18px] w-[18px]" /> : item.key}
                </span>
                <span
                  className={`font-display text-[2.4rem] leading-[1.05] tracking-tight transition-colors ${
                    on ? "text-fg" : "text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          <span
            className="my-3 ml-11 h-px w-10 bg-border transition-all duration-500 ease-out"
            style={{
              transitionDelay: open ? `${90 + navItems.length * 45}ms` : "0ms",
              opacity: open ? 1 : 0,
            }}
          />

          <button
            onClick={() => {
              setOpen(false);
              router.push("/blogs");
            }}
            style={{ transitionDelay: open ? `${135 + navItems.length * 45}ms` : "0ms" }}
            className={`group flex items-center gap-5 py-1.5 text-left transition-all duration-500 ease-out ${
              open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <span className={`flex w-6 items-center font-mono text-xs ${onBlogs ? "text-accent" : "text-faint"}`}>
              {onBlogs ? (
                <ArrowRight className="h-[18px] w-[18px]" />
              ) : (
                <ArrowUpRight className="h-[18px] w-[18px]" />
              )}
            </span>
            <span
              className={`font-display text-[2.4rem] leading-[1.05] tracking-tight transition-colors ${
                onBlogs ? "text-fg" : "text-muted"
              }`}
            >
              {blogsNav.label}
            </span>
          </button>
        </nav>

        <div
          className="px-6"
          style={{ paddingBottom: "calc(6.5rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center justify-between border-t border-border pt-6">
            <a
              href={links.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-2 px-4 py-2.5 text-sm font-semibold text-fg"
            >
              Resume <Download className="h-4 w-4 text-faint" />
            </a>
            <div className="flex gap-4">
              {socials
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-wide text-muted active:text-fg"
                  >
                    {s.label}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="flex h-12 items-center gap-2.5 rounded-full border border-border-strong bg-surface/85 pl-2 pr-4 shadow-[0_12px_34px_-14px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-transform active:scale-95"
          >
            <span className="relative grid h-8 w-8 shrink-0 place-items-center">
              <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full -rotate-90">
                <circle cx="18" cy="18" r={R} fill="none" stroke="var(--color-surface-3)" strokeWidth="2.5" />
                <circle
                  ref={ringRef}
                  cx="18"
                  cy="18"
                  r={R}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC}
                />
              </svg>
              <NavIcon name={active.icon} className="h-[15px] w-[15px] text-fg" />
            </span>
            <span className="w-[72px] text-center text-sm font-semibold tracking-tight text-fg">
              {open ? "Close" : active.label}
            </span>
            {open ? (
              <X className="h-4 w-4 shrink-0 text-faint" />
            ) : (
              <ChevronUp className="h-4 w-4 shrink-0 text-faint" />
            )}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              open
                ? "ml-0 max-w-0 scale-90 opacity-0"
                : "ml-2 max-w-[52px] scale-100 opacity-100"
            }`}
          >
            <button
              onClick={() => window.dispatchEvent(new Event("open-ask"))}
              aria-label="Ask about Sid"
              tabIndex={open ? -1 : 0}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-bg shadow-[0_12px_34px_-14px_rgba(0,0,0,0.8)] transition-transform active:scale-95"
            >
              <MessageCircleMore className="h-[22px] w-[22px]" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
