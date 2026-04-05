"use client";

import { useEffect, useState } from "react";

const subtitles = [
  "24 • Full Stack Engineer",
  "📍 Greater Noida, India",
  "Collecting Experiences",
  "Code, LLMs, and Coffee ☕",
];

export default function SubtitleSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % subtitles.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-10 overflow-hidden">
      {subtitles.map((subtitle, index) => (
        <p
          key={index}
          className={`absolute inset-0 text-neutral-600 dark:text-neutral-400 font-sans text-sm sm:text-base transition-all duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {subtitle}
        </p>
      ))}
    </div>
  );
}