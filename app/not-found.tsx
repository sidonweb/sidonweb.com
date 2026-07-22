import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6">
      <div className="text-center">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          404
        </div>
        <h1 className="mt-4 font-display text-[2rem] font-semibold tracking-tight sm:text-[2.6rem]">
          This route went quiet.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm text-muted">
          The page is missing or has moved. Head back and try one of the panels
          in the sidebar.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" /> Back to overview
        </Link>
      </div>
    </div>
  );
}
