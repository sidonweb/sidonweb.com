"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const root = document.getElementById("scroll-root");
    let raf = 0;

    const compute = () => {
      raf = 0;
      const offset = 160;
      let current = ids[0] ?? "";

      const scroller: HTMLElement | Window = root ?? window;
      const nearBottom = (() => {
        if (root && root.scrollHeight > root.clientHeight + 4) {
          return root.scrollTop + root.clientHeight >= root.scrollHeight - 4;
        }
        const doc = document.documentElement;
        return window.scrollY + window.innerHeight >= doc.scrollHeight - 4;
      })();
      void scroller;

      if (nearBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    root?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      root?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);

  return active;
}

let scrollRaf = 0;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animateScroll(
  getPos: () => number,
  setPos: (y: number) => void,
  to: number,
) {
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
  const start = getPos();
  const dist = to - start;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || Math.abs(dist) < 4) {
    setPos(to);
    return;
  }
  // Fixed, snappy ease-out — fast start so the scroll feels immediate.
  const dur = Math.min(560, Math.max(300, Math.abs(dist) * 0.32));
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    setPos(start + dist * easeOutCubic(p));
    scrollRaf = p < 1 ? requestAnimationFrame(step) : 0;
  };
  scrollRaf = requestAnimationFrame(step);
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const root = document.getElementById("scroll-root");
  const rootScrolls = !!root && root.scrollHeight > root.clientHeight + 4;
  const offset = 24;

  if (rootScrolls && root) {
    root.style.scrollBehavior = "auto";
    const to =
      el.getBoundingClientRect().top -
      root.getBoundingClientRect().top +
      root.scrollTop -
      offset;
    animateScroll(
      () => root.scrollTop,
      (y) => {
        root.scrollTop = y;
      },
      Math.max(0, to),
    );
  } else {
    document.documentElement.style.scrollBehavior = "auto";
    const to = el.getBoundingClientRect().top + window.scrollY - offset;
    animateScroll(
      () => window.scrollY,
      (y) => window.scrollTo(0, y),
      Math.max(0, to),
    );
  }

  if (typeof history !== "undefined") {
    history.replaceState(null, "", id === "intro" ? " " : `#${id}`);
  }
}
