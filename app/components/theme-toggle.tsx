"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_COLOR, THEME_STORAGE_KEY, type Theme } from "../lib/theme";

function read(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

// The <html data-theme> attribute is the single source of truth; every toggle
// on the page (sidebar + mobile menu) stays in sync by observing it.
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => mo.disconnect();
}

function applyTheme(next: Theme) {
  const root = document.documentElement;
  const commit = () => {
    root.classList.add("theme-switching");
    root.setAttribute("data-theme", next);
    document
      .getElementById("theme-color")
      ?.setAttribute("content", THEME_COLOR[next]);
    // Flush styles with transitions disabled, then re-enable them.
    void window.getComputedStyle(root).color;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove("theme-switching")),
    );
  };

  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {}

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => unknown;
  };
  if (doc.startViewTransition && !reduce) {
    try {
      doc.startViewTransition(commit);
      return;
    } catch {}
  }
  commit();
}

export default function ThemeToggle({
  className = "",
  tabIndex,
}: {
  className?: string;
  tabIndex?: number;
}) {
  const theme = useSyncExternalStore(subscribe, read, () => "dark" as Theme);
  const isLight = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onClick={() => applyTheme(isLight ? "dark" : "light")}
      tabIndex={tabIndex}
      className={`theme-toggle ${className}`}
    >
      <span className="tt-sky" aria-hidden />
      <span className="tt-star" aria-hidden />
      <span className="tt-star" aria-hidden />
      <span className="tt-star" aria-hidden />
      <span className="tt-star" aria-hidden />
      <span className="tt-cloud" aria-hidden />
      <span className="tt-cloud tt-cloud--2" aria-hidden />
      <span className="tt-knob" aria-hidden>
        <Sun className="tt-icon tt-sun" strokeWidth={2.5} />
        <Moon className="tt-icon tt-moon" strokeWidth={2.5} fill="currentColor" />
      </span>
    </button>
  );
}
