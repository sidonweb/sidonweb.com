import type { ReactNode } from "react";
import Reveal from "../reveal";

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-5xl scroll-mt-6 px-5 sm:px-10 ${className}`}
    >
      {children}
    </section>
  );
}

export function Kicker({ index, label }: { index: string; label: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        <span className="text-muted">{index}</span>
        <span className="h-px w-5 bg-border" />
        <span>{label}</span>
      </div>
    </Reveal>
  );
}

export function SectionDivider() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-10">
      <div className="h-px w-full bg-border" />
    </div>
  );
}
