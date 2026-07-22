"use client";

import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects, socials, profile, links } from "../lib/data";
import { navItems } from "./nav-items";
import { scrollToSection } from "./use-scroll-spy";

type Item = {
  id: string;
  label: string;
  hint: string;
  group: string;
  run: () => void;
  keywords?: string;
};

export default function CommandPalette({
  posts = [],
}: {
  posts?: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const items: Item[] = useMemo(() => {
    const route = (href: string) => () => {
      router.push(href);
      close();
    };
    const section = (id: string) => () => {
      close();
      if (pathname === "/" && document.getElementById(id)) {
        scrollToSection(id);
      } else {
        router.push(id === "intro" ? "/" : `/#${id}`);
      }
    };
    const nav: Item[] = [
      ...navItems.map((n) => ({
        id: `n-${n.id}`,
        label: n.label,
        hint: "Go",
        group: "Navigate",
        run: section(n.id),
      })),
      {
        id: "n-blogs",
        label: "Blogs",
        hint: "Page",
        group: "Navigate",
        run: route("/blogs"),
      },
    ];
    const projectItems: Item[] = projects.map((p) => ({
      id: `p-${p.slug}`,
      label: p.title,
      hint: p.kind,
      group: "Projects",
      keywords: p.stack.join(" "),
      run: route(`/work/${p.slug}`),
    }));
    const postItems: Item[] = posts.map((p) => ({
      id: `b-${p.slug}`,
      label: p.title,
      hint: "Post",
      group: "Blogs",
      run: route(`/blogs/${p.slug}`),
    }));
    const actions: Item[] = [
      {
        id: "a-ask",
        label: "Ask about Sid",
        hint: "Site",
        group: "Actions",
        run: () => {
          close();
          window.dispatchEvent(new Event("open-ask"));
        },
      },
      {
        id: "a-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        },
      },
      {
        id: "a-resume",
        label: "Download resume",
        hint: "PDF",
        group: "Actions",
        run: () => {
          window.open(links.resumeUrl, "_blank", "noopener");
          close();
        },
      },
      {
        id: "a-call",
        label: "Book a call",
        hint: "15 min",
        group: "Actions",
        run: () => {
          window.open(links.calUrl, "_blank", "noopener");
          close();
        },
      },
      ...socials
        .filter((s) => s.label !== "Email")
        .map((s) => ({
          id: `s-${s.label}`,
          label: `Open ${s.label}`,
          hint: s.handle,
          group: "Elsewhere",
          run: () => {
            window.open(s.href, "_blank", "noopener");
            close();
          },
        })),
    ];
    return [...nav, ...projectItems, ...postItems, ...actions];
  }, [router, close, pathname, posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.label} ${it.hint} ${it.group} ${it.keywords ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const pathnameRef = useRef(pathname);
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      const el = document.activeElement as HTMLElement | null;
      const typing =
        !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (
        !openRef.current &&
        !typing &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        /^[1-5]$/.test(e.key)
      ) {
        const item = navItems[parseInt(e.key, 10) - 1];
        if (item) {
          e.preventDefault();
          if (pathnameRef.current === "/" && document.getElementById(item.id)) {
            scrollToSection(item.id);
          } else {
            router.push(item.id === "intro" ? "/" : `/#${item.id}`);
          }
        }
      }
    };
    const onToggle = () => setOpen((o) => !o);
    window.addEventListener("keydown", onKey);
    window.addEventListener("toggle-cmdk", onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("toggle-cmdk", onToggle);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  let renderIndex = -1;
  const groups = Array.from(new Set(filtered.map((i) => i.group)));

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_80px_-16px_rgba(0,0,0,0.8)]"
        onKeyDown={onListKey}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 shrink-0 text-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or jump to..."
            className="flex-1 bg-transparent py-4 text-sm text-fg outline-none placeholder:text-faint"
          />
          {copied && <span className="text-xs text-accent">Copied</span>}
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint">
            esc
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <div className="px-3 py-8 text-center text-sm text-faint">
              Nothing matches “{query}”.
            </div>
          )}
          {groups.map((group) => (
            <div key={group} className="mb-1">
              <div className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                {group}
              </div>
              {filtered
                .filter((i) => i.group === group)
                .map((it) => {
                  renderIndex += 1;
                  const idx = renderIndex;
                  const isActive = idx === active;
                  return (
                    <button
                      key={it.id}
                      data-idx={idx}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => it.run()}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive ? "bg-surface-2 text-fg" : "text-muted"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          isActive ? "bg-accent" : "bg-border"
                        }`}
                      />
                      <span className="flex-1 font-medium">{it.label}</span>
                      <span className="truncate font-mono text-[11px] text-faint">
                        {it.hint}
                      </span>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
