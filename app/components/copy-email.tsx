"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        Drop me a line
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={`mailto:${email}`}
          className="font-display text-xl font-semibold leading-none tracking-tight text-fg transition-colors hover:text-accent sm:text-2xl"
        >
          {email}
        </a>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-[11.5px] font-semibold text-muted transition-colors hover:border-faint hover:text-fg"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </div>
  );
}
