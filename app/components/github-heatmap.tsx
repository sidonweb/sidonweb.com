import { ArrowUpRight } from "lucide-react";

type Day = { date: string; count: number; level: number };

const LEVEL_BG = [
  "var(--color-surface-2)",
  "rgba(15,185,129,0.32)",
  "rgba(15,185,129,0.55)",
  "rgba(15,185,129,0.78)",
  "var(--color-success)",
];

const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

async function getContributions(user: string) {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      total: Record<string, number>;
      contributions: Day[];
    };
    if (!data.contributions?.length) return null;
    return data;
  } catch {
    return null;
  }
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="min-w-0">
      <div className="font-display text-lg font-semibold tracking-tight text-fg sm:text-xl">
        {value}
      </div>
      <div className="mt-0.5 text-[10px] leading-tight text-faint sm:text-[11px]">
        {label}
      </div>
    </div>
  );
}

export default async function GithubHeatmap({ user }: { user: string }) {
  const data = await getContributions(user);
  if (!data) return null;

  const days = data.contributions;

  // Stats
  const total = data.total.lastYear ?? Object.values(data.total)[0] ?? 0;
  const activeDays = days.filter((d) => d.count > 0).length;
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) currentStreak++;
    else break;
  }
  let longestStreak = 0;
  let run = 0;
  for (const d of days) {
    if (d.count > 0) {
      run++;
      if (run > longestStreak) longestStreak = run;
    } else run = 0;
  }

  // Grid
  const lead = new Date(`${days[0].date}T00:00:00`).getDay();
  const cells: (Day | null)[] = [...Array(lead).fill(null), ...days];
  while (cells.length % 7) cells.push(null);
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  let prevMonth = -1;
  const monthLabels = weeks.map((w) => {
    const first = w.find(Boolean) as Day | undefined;
    if (!first) return "";
    const d = new Date(`${first.date}T00:00:00`);
    if (d.getMonth() !== prevMonth) {
      prevMonth = d.getMonth();
      return d.toLocaleDateString("en-US", { month: "short" });
    }
    return "";
  });

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className="h-3.5 w-3.5 text-muted">
            <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.49-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.52.56.83 1.28.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
          </svg>
          Lately on GitHub
        </div>
        <a
          href={`https://github.com/${user}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[11px] text-muted transition-colors hover:text-fg"
        >
          @{user} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mt-5 flex items-start justify-between gap-2 sm:justify-start sm:gap-10">
        <Stat value={total} label="contributions" />
        <Stat value={activeDays} label="active days" />
        <Stat value={`${longestStreak}d`} label="longest streak" />
        {currentStreak > 0 && (
          <Stat value={`${currentStreak}d`} label="current streak" />
        )}
      </div>

      <div className="mt-6 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="w-max">
          <div className="mb-1.5 flex gap-[3px] pl-8 font-mono text-[9px] text-faint">
            {monthLabels.map((m, i) => (
              <span key={i} className="w-[12px] whitespace-nowrap">
                {m}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            <div className="mr-[5px] flex w-[27px] flex-col gap-[3px] font-mono text-[9px] leading-[12px] text-faint">
              {WEEKDAYS.map((d, i) => (
                <span key={i} className="h-[12px] text-right">
                  {d}
                </span>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((cell, di) => (
                  <span
                    key={di}
                    title={cell ? `${cell.count} on ${cell.date}` : undefined}
                    className="h-[12px] w-[12px] rounded-[3px]"
                    style={{
                      backgroundColor: cell ? LEVEL_BG[cell.level] : "transparent",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px] text-faint">
          {total} contributions in the last year
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-faint">
          <span>Less</span>
          {LEVEL_BG.map((bg, i) => (
            <span
              key={i}
              className="h-[11px] w-[11px] rounded-[2px]"
              style={{ backgroundColor: bg }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
