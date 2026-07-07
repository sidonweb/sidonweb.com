"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
        Something broke
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        That&apos;s on us
      </h1>
      <p className="mt-3 max-w-sm text-neutral-600 dark:text-neutral-400">
        An unexpected error occurred. Try again, and if it keeps happening,
        refreshing usually helps.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={reset}
          className="group inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition"
        >
          <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-45" />
          Try again
        </button>
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}
