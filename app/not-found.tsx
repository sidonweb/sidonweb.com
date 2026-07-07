import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
        Error 404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Nothing here
      </h1>
      <p className="mt-3 max-w-sm text-neutral-600 dark:text-neutral-400">
        This page does not exist, or it moved somewhere else. Let&apos;s get you
        back on track.
      </p>

      <Image
        alt="Confused dog"
        src="/photos/bonk-doge.gif"
        width={140}
        height={140}
        priority
        className="mt-8 rounded-xl"
      />

      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back home
      </Link>
    </section>
  );
}
