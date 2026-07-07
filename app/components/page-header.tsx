import React from "react";

/**
 * Shared page header used across every route so headings stay consistent:
 * a small mono eyebrow label, a title, and an optional supporting line.
 */
export default function PageHeader({
  label,
  title,
  description,
  className = "",
}: {
  label: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={`pt-10 sm:pt-14 ${className}`}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
        {label}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      )}
    </header>
  );
}
