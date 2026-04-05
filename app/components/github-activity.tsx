"use client";

import { GitHubCalendar as GitHubCalendarComponent } from "react-github-calendar";

const GitHubCalendar = GitHubCalendarComponent as any;

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function GithubActivity() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[150px] w-full" />; // placeholder
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const minimalTheme = {
    light: ["#ebedf0", "#c6c6c6", "#9c9c9c", "#717171", "#3d3d3d"],
    dark: ["#161b22", "#272a30", "#464a53", "#747983", "#ffffff"],
  };

  return (
    <div className="w-full overflow-x-auto py-2 mb-6">
      <GitHubCalendar
        username="sidonweb"
        colorScheme={currentTheme === "dark" ? "dark" : "light"}
        theme={minimalTheme}
        hideColorLegend={false}
        hideTotalCount={false}
        
      />
    </div>
  );
}
