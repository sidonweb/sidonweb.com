"use client";

import { useEffect, useState } from "react";

const items = [
  { kind: "status" as const, text: "Available for work" },
  { kind: "location" as const, text: "Greater Noida, India" },
];

export default function NavStatus() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShown(false);
      window.setTimeout(() => {
        setI((p) => (p + 1) % items.length);
        setShown(true);
      }, 320);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const cur = items[i];

  return (
    <span
      className={`flex items-center gap-2 transition-opacity duration-300 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      aria-live="polite"
    >
      {cur.kind === "status" && (
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-success" />
      )}
      <span
        className={
          cur.kind === "status"
            ? "text-[12px] font-medium text-muted"
            : "font-mono text-[10px] uppercase tracking-[0.14em] text-faint"
        }
      >
        {cur.text}
      </span>
    </span>
  );
}
