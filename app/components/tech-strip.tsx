"use client";

import { useState } from "react";

type Item = { name: string; path: string; hex: string };

function brandColor(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum < 55 ? "#e8e8ec" : hex;
}

export default function TechStrip({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-4 flex h-7 items-center gap-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Also comfortable with
        </span>
        <span
          className={`flex items-center gap-2.5 transition-opacity duration-200 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span className="font-display text-[15px] tracking-tight text-fg">
            {active ?? ""}
          </span>
        </span>
      </div>

      <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max items-center py-3 pl-1">
          {items.map((t) => (
            <button
              key={t.name}
              type="button"
              aria-label={t.name}
              onMouseEnter={() => setActive(t.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(t.name)}
              onBlur={() => setActive(null)}
              className="relative -ml-3.5 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border bg-surface shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)] transition-all duration-300 first:ml-0 hover:z-10 hover:-translate-y-2 hover:border-border-strong focus-visible:z-10 focus-visible:-translate-y-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="h-6 w-6"
                style={{ color: brandColor(t.hex) }}
              >
                <path d={t.path} />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
