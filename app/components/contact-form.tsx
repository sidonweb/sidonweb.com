"use client";

import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Button from "./button";

// Web3Forms public access key (client-side by design). Override via env if needed.
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "8a3c62fc-2486-401d-912a-2a2d3f80532f";

// text-base (16px) keeps iOS Safari from zooming the viewport on focus.
const fieldCls =
  "w-full rounded-none border-b border-border bg-transparent py-2.5 text-base text-fg outline-none transition-colors placeholder:text-faint focus:border-accent focus-visible:outline-none";
const labelCls =
  "mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-faint";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name,
          email,
          message,
          subject: `New message from ${name || "your site"}`,
          from_name: "sidonweb.com",
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-10 text-center">
        <span className="animate-pop grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success ring-1 ring-success/30">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-5 font-display text-xl font-semibold tracking-tight text-fg">
          Message sent{name ? `, ${name.split(" ")[0]}` : ""}.
        </p>
        <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-muted">
          Thanks for reaching out — I&apos;ll get back to you within a day.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-2 px-4 py-2 text-[13px] font-semibold text-muted transition-colors hover:border-faint hover:text-fg"
        >
<ArrowLeft aria-hidden className="h-3.5 w-3.5" /> Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Name
          </label>
          <input
            id="cf-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldCls}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cf-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={3}
          placeholder="What are you building, and how can I help?"
          className={`${fieldCls} resize-none`}
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          className="w-full sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <Send aria-hidden className="h-4 w-4" />
        </Button>
        {status === "error" && (
          <span className="text-[13px] text-danger">
            Something went wrong. Try again, or email me directly.
          </span>
        )}
      </div>
    </form>
  );
}
