'use client';

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
    <div >
      <h3 className="text-lg font-medium mb-4 text-neutral-900 dark:text-neutral-100">
        Or directly message me here:
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent transition-colors"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent transition-colors"
              placeholder="youremail@example.com"
            />
          </div>
        </div>
        
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent transition-colors resize-none"
            placeholder="Tell me about your project or just say hi!"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
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
  );
}