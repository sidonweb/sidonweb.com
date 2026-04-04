'use client';

import { CalendarRange, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const key = "8a3c62fc-2486-401d-912a-2a2d3f80532f"

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

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* LEFT: CTA */}
      <div className="flex flex-col gap-4 ">
        <Link href="https://cal.com/sidonweb/30min" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer" aria-label='Schedule a call with Siddharth Singh on Cal.com'>
          <button
            className="group w-full h-full px-6 py-4 bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-white/10 rounded-lg hover:bg-neutral-200 dark:hover:bg-white/10 transition flex flex-col items-center justify-center gap-2"
          >
            <CalendarRange className="size-8 opacity-80" />
            <span className="font-medium">Schedule a Call</span>
          </button>
        </Link>

        <Link href="mailto:heysid88@gmail.com" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer" aria-label='Send email to Siddharth Singh'>
          <button
            className="group w-full h-full px-6 py-4 bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-white/10 rounded-lg hover:bg-neutral-200 dark:hover:bg-white/10 transition flex flex-col items-center justify-center gap-2"
          >
            <Mail className="size-8 opacity-80" />
            <span className="font-medium">Send an Email</span>
          </button>
        </Link>

        {/* Optional subtle hint */}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
          Prefer writing directly? Use the form.
        </p>
      </div>

      {/* RIGHT: FORM */}
      <div className="bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-5">

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border border-neutral-200 dark:border-white/10 rounded-md bg-white dark:bg-white/5 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-neutral-200 dark:border-white/10 rounded-md bg-white dark:bg-white/5 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                placeholder="youremail@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-white/10 rounded-md bg-white dark:bg-white/5 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14] resize-none"
              placeholder="Tell me about your project or just say hi!"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md hover:bg-[#000000ad] dark:hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#39FF14] disabled:opacity-50 transition font-medium"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                Message sent successfully! 🎉
              </span>
            )}

            {submitStatus === 'error' && (
              <span className="text-red-600 dark:text-red-400 text-sm font-medium">
                Failed to send. Please try again.
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}