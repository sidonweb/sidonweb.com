"use client";

import { FiEye } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import ProfileSlideshow from "./profile-slides";
import { useEffect, useRef, useState } from "react";
import SubtitleSlideshow from "./subtitle-slideshow";

export default function HeaderIntro() {
  const [visitors, setVisitors] = useState<number | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("https://api.counterapi.dev/v1/sidonweb/portfolio/up")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setVisitors(data.count + 9583);
        }
      })
      .catch((err) => console.error("Failed to fetch visitors:", err));
  }, []);

  return (
    <div className="w-full relative pt-5">
      <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <ProfileSlideshow />

        {/* Details Column */}
        <div className="flex flex-col justify-between h-full w-full">

          {/* Top row: Status and Views */}
          <div className="flex justify-end items-center w-full text-neutral-500 text-sm mb-2">
            <div className="flex items-center gap-1.5">
              <FiEye className="w-4 h-4" />
              <span className="min-w-[40px] text-right" aria-label="Visitor Count" title="Visitor Count">
                {visitors !== null ? visitors.toLocaleString() : "0,000"}
              </span>
            </div>
          </div>

          <div>

            {/* Name */}
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                Siddharth Singh
              </h1>
              <MdVerified className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            {/* Subtitle */}
            {/* <p className="text-neutral-600 dark:text-neutral-400 font-sans text-sm sm:text-base mb-3">
            Trying to do better
          </p> */}

            <SubtitleSlideshow />

            {/* Status indicator */}
            {/* <div className="flex items-center gap-2 text-xs text-neutral-500">
            <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
            <span>Idle <span className="mx-1">•</span> Currently sleeping</span>
          </div> */}
          </div>

        </div>
      </div>

    </div>

  );
}
