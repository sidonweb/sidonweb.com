'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const key = "8a3c62fc-2486-401d-912a-2a2d3f80532f";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", key);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const inputClass =
    "w-full border-0 border-b border-neutral-200 dark:border-white/15 bg-transparent px-0 py-2.5 text-[15px] text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-neutral-900 dark:focus:border-neutral-100 focus:outline-none focus:ring-0 transition-colors";

  return (
    <div>
      {/* The email is the statement */}
      <p className="text-lg text-neutral-500 dark:text-neutral-400">
        Have something in mind? Say hello.
      </p>
      <a
        href="mailto:heysid88@gmail.com"
        className="group mt-3 inline-flex items-center gap-2.5 text-2xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
      >
        <span className="relative">
          heysid88@gmail.com
          <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-neutral-900 dark:bg-neutral-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </span>
        <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 text-neutral-300 dark:text-neutral-600 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-neutral-900 dark:group-hover:text-neutral-100" />
      </a>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-500 dark:text-neutral-400">
        <Link
          href="https://cal.com/sidonweb/30min"
          target="_blank"
          className="group inline-flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          Book a 30-min call
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Available for work
        </span>
      </div>

      {/* Open form, no box */}
      <form onSubmit={handleSubmit} className="mt-10 max-w-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
          <input type="text" name="name" required placeholder="Name" className={inputClass} />
          <input type="email" name="email" required placeholder="Email" className={inputClass} />
        </div>
        <textarea
          name="message"
          required
          rows={2}
          placeholder="Message"
          className={`${inputClass} mt-6 resize-none`}
        />
        <div className="mt-7 flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 dark:bg-neutral-100 px-5 py-2.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 disabled:opacity-50 transition"
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
            {!isSubmitting && <span aria-hidden>→</span>}
          </button>
          {submitStatus === 'success' && (
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Sent, thanks!</span>
          )}
          {submitStatus === 'error' && (
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Something went wrong.</span>
          )}
        </div>
      </form>
    </div>
  );
}
