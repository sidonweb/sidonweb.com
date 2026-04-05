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

    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setVisitors(data.count + 9583);
        }
      })
      .catch(() => setVisitors(9583));
  }, []);

  return (
    <div className="w-full relative pt-5">
      <div className="relative z-10 flex flex-row gap-3 sm:gap-6 items-stretch">
        <ProfileSlideshow />

        {/* stretch to match ProfileSlideshow height, then space content top/bottom */}
        <div className="flex flex-col justify-between min-w-0 w-full">
          {/* TOP: visitor count pinned to top-right */}
          <div className="flex justify-end items-center w-full text-neutral-500 text-sm">
            <div className="flex items-center gap-1.5">
              <FiEye className="w-4 h-4" />
              <span className="min-w-[40px] text-right">
                {visitors !== null ? visitors.toLocaleString() : "0,000"}
              </span>
            </div>
          </div>

          {/* BOTTOM: name + subtitle anchored to bottom */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
                Siddharth Singh
              </h1>
              <MdVerified className="text-blue-500 w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0" />
            </div>
            <SubtitleSlideshow />
          </div>
        </div>
      </div>
    </div>
  );
}