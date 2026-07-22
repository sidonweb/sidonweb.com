"use client";

import { useEffect, useState } from "react";
import { MessageCircleMore, X } from "lucide-react";
import AskChat from "./ask-chat";

export default function AskWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openAsk = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("open-ask", openAsk);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-ask", openAsk);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      {/* Backdrop (mobile) */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[75] bg-black/50 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Ask about Sid"
        className={`fixed z-[80] flex flex-col overflow-hidden rounded-2xl border border-border-strong bg-surface transition-all duration-300 ease-out ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        } inset-x-3 bottom-[5.5rem] top-24 lg:inset-x-auto lg:bottom-24 lg:right-6 lg:top-auto lg:h-[560px] lg:max-h-[74vh] lg:w-[380px]`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5">
          <div>
            <div className="text-[14px] font-semibold leading-tight text-fg">
              Ask about Sid
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="text-[11px] text-faint">Answers from this site</span>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="-mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-faint transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1">
          <AskChat bare />
        </div>
      </div>

      {/* Launcher — desktop only; mobile uses the pill beside the nav dock */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close ask panel" : "Ask about Sid"}
        className="fixed bottom-6 right-6 z-[70] hidden items-center gap-2.5 rounded-full border border-border bg-surface/95 py-2 pl-2 pr-4 shadow-[0_8px_26px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-transform active:scale-95 lg:flex"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-accent-fg">
          <MessageCircleMore className="h-[17px] w-[17px]" strokeWidth={2} />
        </span>
        <span className="text-[13px] font-semibold tracking-tight text-fg">
          {open ? "Close" : "Ask"}
        </span>
      </button>
    </>
  );
}
