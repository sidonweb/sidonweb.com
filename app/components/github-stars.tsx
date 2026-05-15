"use client";

import { useEffect, useState } from "react";

export default function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/sidonweb/sidonweb.com")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <a
      href="https://github.com/sidonweb/sidonweb.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm
        bg-neutral-100 dark:bg-white/5
        border border-neutral-200 dark:border-white/10
        text-neutral-500 dark:text-neutral-400
        hover:bg-neutral-200 dark:hover:bg-white/10
        hover:text-neutral-700 dark:hover:text-neutral-300
        transition-all duration-150"
      aria-label="GitHub stars"
    >
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836a9.59 9.59 0 012.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
      </svg>
      <span className="text-xs font-mono">
        {stars !== null ? stars : "—"}
      </span>
    </a>
  );
}