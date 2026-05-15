"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

import { useRouter } from "next/navigation";

import {
  Camera,
  Code,
  FileText,
  House,
  Mail,
  Moon,
  Search,
  Sun,
  Swords,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

import {
  Claudeicon,
  Geminiicon,
  Openaiicon,
} from "app/lib/icons";

type Item = {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
};

export default function CommandPalette() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const triggerThemeToggle = () => {
    const themeButton = document.getElementById(
      "theme-toggle"
    ) as HTMLButtonElement | null;

    themeButton?.click();
  };

  const items: Item[] = [
    // Theme
    {
      id: "theme-toggle-item",

      label: isDark
        ? "Switch to Light Mode"
        : "Switch to Dark Mode",

      description: "Toggle website theme",

      icon: isDark ? (
        <Sun size={16} />
      ) : (
        <Moon size={16} />
      ),

      group: "Appearance",

      action: () => {
        close();

        setTimeout(() => {
          triggerThemeToggle();
        }, 100);
      },
    },

    // AI
    {
      id: "ask-chatgpt",
      label: "Ask ChatGPT about me",
      description: "Chat with GPT about Siddharth",
      icon: <Openaiicon />,
      group: "Ask AI About Me",

      action: () =>
        window.open(
          "https://chatgpt.com/?q=" +
          encodeURIComponent(
            "You are an AI assistant for sidonweb.com. Answer questions about Siddharth, his projects, skills, and work."
          ),
          "_blank"
        ),
    },

    {
      id: "ask-claude",
      label: "Ask Claude about me",
      description: "Chat with Claude about Siddharth",
      icon: <Claudeicon />,
      group: "Ask AI About Me",

      action: () =>
        window.open(
          "https://claude.ai/new?q=" +
          encodeURIComponent(
            "You are an AI assistant for sidonweb.com. Answer questions about Siddharth, his projects, skills, and work."
          ),
          "_blank"
        ),
    },

    // Menu
    {
      id: "home",
      label: "Home",
      description: "Go to homepage",
      icon: <House size={16} />,
      group: "Menu",
      action: () => router.push("/"),
    },

    {
      id: "blog",
      label: "Blog",
      description: "Read my thoughts",
      icon: <FileText size={16} />,
      group: "Menu",
      action: () => router.push("/blogs"),
    },

    {
      id: "work",
      label: "Work",
      description: "See what I've built",
      icon: <Code size={16} />,
      group: "Menu",
      action: () => router.push("/work"),
    },

    {
      id: "tech-stack",
      label: "Tech Stack",
      description: "Tools I use",
      icon: <Swords size={16} />,
      group: "Menu",
      action: () => router.push("/stack"),
    },

    {
      id: "gallery",
      label: "Gallery",
      description: "Some pictures I took",
      icon: <Camera size={16} />,
      group: "Menu",
      action: () => router.push("/gallery"),
    },

    // Social
    {
      id: "github",
      label: "GitHub",
      description: "@sidonweb",
      icon: <FaGithub />,
      group: "Social",

      action: () =>
        window.open(
          "https://github.com/sidonweb",
          "_blank"
        ),
    },

    {
      id: "twitter",
      label: "Twitter / X",
      description: "@siddonweb",
      icon: <FaXTwitter />,
      group: "Social",

      action: () =>
        window.open(
          "https://x.com/siddonweb",
          "_blank"
        ),
    },

    {
      id: "linkedin",
      label: "LinkedIn",
      description: "Connect with me",
      icon: <FaLinkedin />,
      group: "Social",

      action: () =>
        window.open(
          "https://www.linkedin.com/in/sidonweb",
          "_blank"
        ),
    },

    {
      id: "email",
      label: "Send Email",
      description: "heysid88@gmail.com",
      icon: <Mail size={16} />,
      group: "Social",

      action: () =>
        window.open("mailto:heysid88@gmail.com"),
    },
  ];

  const filtered = query.trim()
    ? items.filter(
      (item) =>
        item.label
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        item.description
          ?.toLowerCase()
          .includes(query.toLowerCase()) ||
        item.group
          .toLowerCase()
          .includes(query.toLowerCase())
    )
    : items;

  const groups = filtered.reduce<Record<string, Item[]>>(
    (acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = [];
      }

      acc[item.group].push(item);

      return acc;
    },
    {}
  );

  const flatFiltered = Object.values(groups).flat();

  const runSelected = useCallback(() => {
    const item = flatFiltered[selected];

    if (item) {
      item.action();

      if (item.id !== "theme-toggle-item") {
        close();
      }
    }
  }, [flatFiltered, selected, close]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // CMD + K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();

        setOpen((prev) => !prev);

        setQuery("");
        setSelected(0);

        return;
      }

      // D = toggle theme
      if (
        e.key.toLowerCase() === "d" &&
        !(e.ctrlKey || e.metaKey) &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();

        if (open) {
          close();

          setTimeout(() => {
            triggerThemeToggle();
          }, 100);
        } else {
          triggerThemeToggle();
        }

        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        close();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setSelected((s) =>
          Math.min(s + 1, flatFiltered.length - 1)
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();

        setSelected((s) => Math.max(s - 1, 0));
      }

      if (e.key === "Enter") {
        e.preventDefault();

        runSelected();
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener("keydown", handler);
  }, [
    open,
    flatFiltered,
    close,
    runSelected,
  ]);

  // lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // focus input
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [open]);

  // selected item scroll
  useEffect(() => {
    const el = listRef.current?.querySelector(
      `[data-index="${selected}"]`
    );

    el?.scrollIntoView({
      block: "nearest",
    });
  }, [selected]);

  let globalIndex = 0;

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => {
          setOpen(true);
          setQuery("");
          setSelected(0);
        }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm
        bg-neutral-100 dark:bg-white/5
        border border-neutral-200 dark:border-white/10
        text-neutral-500 dark:text-neutral-400
        hover:bg-neutral-200 dark:hover:bg-white/10
        hover:text-neutral-700 dark:hover:text-neutral-300
        transition-all duration-150"
        aria-label="Open command palette"
      >
        <Search className="w-3.5 h-3.5" />

        <span className="text-xs font-mono hidden sm:inline">
          Ctrl K
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative w-full max-w-[420px] rounded-2xl overflow-hidden
            bg-white dark:bg-[#111]
            border border-black/10 dark:border-white/10
            shadow-2xl shadow-black/20 dark:shadow-black/60"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/10 dark:border-white/10">
              <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 shrink-0" />

              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                className="flex-1 bg-transparent
                text-neutral-900 dark:text-neutral-100
                placeholder-neutral-400 dark:placeholder-neutral-500
                text-sm outline-none"
              />

              <button
                onClick={close}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-400 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              className="overflow-y-auto max-h-[360px] py-2 px-2 bg-white dark:bg-[#111]"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {Object.entries(groups).length === 0 ? (
                <div className="px-4 py-8 text-center text-neutral-500 text-sm">
                  No results for &quot;{query}&quot;
                </div>
              ) : (
                Object.entries(groups).map(
                  ([group, groupItems]) => (
                    <div key={group}>
                      <div
                        className="px-4 py-1.5 text-xs font-medium
                      text-neutral-500 uppercase tracking-wider"
                      >
                        {group}
                      </div>

                      {groupItems.map((item) => {
                        const idx = globalIndex++;

                        const isSelected =
                          selected === idx;

                        return (
                          <button
                            key={item.id}
                            data-index={idx}
                            onClick={() => {
                              item.action();

                              if (
                                item.id !==
                                "theme-toggle-item"
                              ) {
                                close();
                              }
                            }}
                            onMouseEnter={() =>
                              setSelected(idx)
                            }
                            className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors ${isSelected
                              ? "bg-black/5 dark:bg-white/10"
                              : "hover:bg-black/[0.03] dark:hover:bg-white/5"
                              }`}
                          >
                            <span
                              className="w-5 h-5 text-neutral-500 dark:text-neutral-400
                            shrink-0 flex items-center justify-center"
                            >
                              {item.icon}
                            </span>

                            <div className="flex-1 min-w-0">
                              <span
                                className="text-sm text-neutral-900
                              dark:text-neutral-200 block truncate"
                              >
                                {item.label}
                              </span>

                              {item.description && (
                                <span className="text-xs text-neutral-500 block truncate">
                                  {item.description}
                                </span>
                              )}
                            </div>

                            {isSelected && (
                              <svg
                                className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  d="M9 5l7 5-7 5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )
                )
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-black/10 dark:border-white/10 px-4 py-2 flex items-center gap-4 text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <kbd className="font-mono border-black/10 dark:border-white/10 px-2 py-0.5 rounded border text-[10px]"> ↑↓ </kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-mono border-black/10 dark:border-white/10 px-2 py-0.5 rounded border text-[10px]"> ↵ </kbd> Go to page
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-mono border-black/10 dark:border-white/10 px-2 py-0.5 rounded border text-[10px]"> Esc </kbd> Exit
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}