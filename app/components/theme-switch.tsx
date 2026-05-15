"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { FaCircleHalfStroke } from "react-icons/fa6";

const storageKey = "theme-preference";

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export const ThemeSwitch: React.FC = () => {
  const { setTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);

  const [currentTheme, setCurrentTheme] = React.useState<
    "light" | "dark"
  >("light");

  const getColorPreference = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
      const storedPreference = localStorage.getItem(storageKey);

      if (storedPreference) {
        return storedPreference as "light" | "dark";
      }

      return window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
    }

    return "light";
  };

  const reflectPreference = (theme: "light" | "dark") => {
    document.documentElement.classList.remove(
      "bg-light",
      "bg-dark"
    );

    document.documentElement.classList.add(`bg-${theme}`);

    setCurrentTheme(theme);

    setTheme(theme);
  };

  React.useEffect(() => {
    setMounted(true);

    const initTheme = getColorPreference();

    reflectPreference(initTheme);

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = () => {
      const newTheme = mediaQuery.matches
        ? "dark"
        : "light";

      localStorage.setItem(storageKey, newTheme);

      reflectPreference(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () =>
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
  }, [setTheme]);

  const animateTheme = async (
    x: number,
    y: number,
    newTheme: "light" | "dark"
  ) => {
    const root = document.documentElement;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (!document.startViewTransition) {
      reflectPreference(newTheme);
      return;
    }

    await document.startViewTransition(() => {
      reflectPreference(newTheme);
    }).ready;

    root.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  const toggleTheme = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newTheme =
      currentTheme === "light" ? "dark" : "light";

    localStorage.setItem(storageKey, newTheme);

    const rect = e.currentTarget.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    await animateTheme(x, y, newTheme);
  };

  if (!mounted) {
    return (
      <FaCircleHalfStroke
        className="h-[14px] w-[14px] text-[#1c1c1c]"
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <style jsx global>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }

        ::view-transition-old(root) {
          z-index: 0;
        }

        ::view-transition-new(root) {
          z-index: 9999;
        }
      `}</style>

      <button
        id="theme-toggle"
        aria-label={`${currentTheme} mode`}
        onClick={toggleTheme}
        className="flex items-center justify-center transition-opacity duration-300 hover:opacity-90"
        title="Press D or click here to switch themes"
      >
        <FaCircleHalfStroke
          className={`h-[14px] w-[14px] ${
            currentTheme === "dark"
              ? "text-[#D4D4D4]"
              : "text-[#1c1c1c]"
          }`}
        />
      </button>
    </>
  );
};