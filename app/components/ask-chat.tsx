"use client";

import Link from "next/link";
import { ArrowUp, CornerDownRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ask, suggestions, type Source } from "../lib/ask-engine";

type Msg = {
  id: number;
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
  thinking?: boolean;
  typing?: boolean;
};

let counter = 1;

function Typed({ text, onDone }: { text: string; onDone?: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(text.length);
      onDone?.();
      return;
    }
    let i = 0;
    const step = () => {
      i += 2;
      setN(Math.min(i, text.length));
      if (i < text.length) {
        t = setTimeout(step, 12);
      } else {
        onDone?.();
      }
    };
    let t = setTimeout(step, 12);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return <>{text.slice(0, n)}</>;
}

export default function AskChat({ bare = false }: { bare?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hey — I'm a small guide built from everything on this site: my projects, stack, experience, and how I work. Ask me anything and I'll answer with the sources to back it up.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const send = (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setBusy(true);
    setInput("");
    const userId = counter++;
    const thinkId = counter++;
    setMessages((m) => [
      ...m,
      { id: userId, role: "user", text: q },
      { id: thinkId, role: "assistant", text: "", thinking: true },
    ]);

    setTimeout(() => {
      const a = ask(q);
      setMessages((m) =>
        m.map((msg) =>
          msg.id === thinkId
            ? { id: thinkId, role: "assistant", text: a.text, sources: a.sources, typing: true }
            : msg,
        ),
      );
      setBusy(false);
    }, 620);
  };

  const fresh = messages.length === 1;

  return (
    <div
      className={
        bare
          ? "flex h-full min-h-0 flex-col overflow-hidden"
          : "flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
      }
    >
      <div
        ref={scrollRef}
        className={
          bare
            ? "flex-1 space-y-4 overflow-y-auto p-4 sm:p-5"
            : "min-h-[320px] flex-1 space-y-4 overflow-y-auto p-4 sm:max-h-[52vh] sm:p-6"
        }
      >
        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[82%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-[14px] leading-relaxed text-accent-fg">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex flex-col items-start">
              {m.thinking ? (
                <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-border bg-surface-2 px-4 py-3.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-faint [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-faint [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-faint" />
                </div>
              ) : (
                <div className="max-w-[88%]">
                  <div className="rounded-2xl rounded-tl-md border border-border bg-surface-2 px-4 py-3 text-[14px] leading-relaxed text-fg">
                    {m.typing ? <Typed text={m.text} /> : m.text}
                  </div>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {m.sources.map((s, i) => (
                        <Link
                          key={i}
                          href={s.href}
                          className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-2 px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-border-strong hover:text-fg"
                        >
                          <CornerDownRight className="h-3 w-3 text-accent-strong" />
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ),
        )}

        {fresh && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {suggestions.slice(0, 4).map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-bg-2 px-3 py-1.5 text-[12px] text-muted transition-colors hover:border-border-strong hover:text-fg"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-full border border-border bg-bg py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-border-strong"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything…"
            className="min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-faint"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-30"
            aria-label="Send"
          >
            <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </button>
        </form>
      </div>
    </div>
  );
}
