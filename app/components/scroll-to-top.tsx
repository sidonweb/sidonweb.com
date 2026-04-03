"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="#top"
      aria-label="Scroll to top"
      className={`fixed bottom-4 right-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-3 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-80" : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 4.414V17a1 1 0 11-2 0V4.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </Link>
  );
}