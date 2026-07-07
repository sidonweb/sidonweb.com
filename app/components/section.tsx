import React from "react";

/**
 * Editorial section layout: a small label sits in a left gutter (sticky on
 * larger screens) while the content fills the main column. This gives every
 * section clear structure through hierarchy and whitespace instead of rules.
 */
export function Section({
  label,
  children,
  id,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 grid grid-cols-1 gap-y-4 sm:grid-cols-[5.5rem_1fr] sm:gap-x-10 ${className}`}
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 sm:sticky sm:top-24">
          {label}
        </p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default Section;
