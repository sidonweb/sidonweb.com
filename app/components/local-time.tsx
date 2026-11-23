
"use client";

import { useEffect, useState } from "react";
import { profile } from "../lib/data";

export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const t = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: profile.timezone,
      }).format(new Date());

      setTime(t);
    };

    tick();

    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  const currentTime = time ?? "--:--";

  return (
    <span
      className="tabular-nums"
      title={`Current time in ${profile.location} is ${currentTime}`}
      aria-label={`Current time in ${profile.location} is ${currentTime}`}
    >
      {currentTime}{" "}
      <span className="text-faint/70">
        {profile.timezone === "Asia/Kolkata" ? "IST" : profile.timezone}
      </span>
    </span>
  );
}
