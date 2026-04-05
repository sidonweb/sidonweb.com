"use client";

import { useEffect, useRef, useState } from "react";

export default function MarqueeText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const check = () => {
      const overflow = textEl.scrollWidth - container.clientWidth;
      setShift(overflow > 0 ? overflow : 0);
    };

    check();
    const ro = new ResizeObserver(check);
    ro.observe(container);
    return () => ro.disconnect();
  }, [text]);

  return (
    <>
      <style>{`
        @keyframes marquee {
          0%, 20%  { transform: translateX(0px); }
          80%, 100% { transform: translateX(var(--marquee-shift)); }
        }
        .marquee-active {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 5s ease-in-out infinite alternate;
        }
      `}</style>

      <div ref={containerRef} className={`overflow-hidden w-full ${className}`}>
        <span
          ref={textRef}
          className={shift > 0 ? "marquee-active" : "block truncate"}
          style={
            shift > 0
              ? ({ "--marquee-shift": `-${shift}px` } as React.CSSProperties)
              : undefined
          }
        >
          {text}
        </span>
      </div>
    </>
  );
}