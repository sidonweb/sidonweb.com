"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "./theme-switch";
import CommandPalette from "./command-palette";

const navItems = {
  "/work": { name: "Work" },
  "/blogs": { name: "Blogs" },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 py-4 bg-white dark:bg-[#060607] border-b border-neutral-200 dark:border-white/[0.08] -mx-6 px-6 sm:-mx-4 sm:px-4 md:mx-0 md:px-0">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="sidonweb home"
          className="text-2xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-[#47a3f3] via-purple-500 to-[#47a3f3] animate-text tracking-tight"
        >
          sidonweb
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-sm">
            {Object.entries(navItems).map(([path, { name }]) => {
              const active =
                pathname === path || pathname.startsWith(`${path}/`);
              return (
                <Link
                  key={path}
                  href={path}
                  aria-current={active ? "page" : undefined}
                  className={`relative transition-colors ${
                    active
                      ? "text-neutral-900 dark:text-neutral-100 font-medium"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`}
                >
                  {name}
                  {active && (
                    <span className="absolute -bottom-[3px] left-0 h-px w-full bg-neutral-900 dark:bg-neutral-100" />
                  )}
                </Link>
              );
            })}
          </div>

          <span className="h-4 w-px bg-neutral-200 dark:bg-white/10" />

          <div className="flex items-center gap-2.5">
            <CommandPalette />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}
