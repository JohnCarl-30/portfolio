"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Github } from "lucide-react";

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionsResponse = {
  total: { lastYear: number };
  contributions: ContributionDay[];
};

type Tooltip = {
  x: number;
  y: number;
  label: string;
};

const levelClasses = [
  "bg-slate-200/80 dark:bg-white/[0.07]",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
];

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
const dayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
});

function groupIntoWeeks(days: ContributionDay[]) {
  const weeks: ContributionDay[][] = [];
  let week: ContributionDay[] = [];

  days.forEach((day, index) => {
    if (index === 0) {
      const offset = new Date(`${day.date}T00:00:00`).getDay();
      for (let i = 0; i < offset; i++) {
        week.push({ date: "", count: 0, level: 0 });
      }
    }

    week.push(day);

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  if (week.length > 0) weeks.push(week);

  return weeks;
}

const GitHubContributions = () => {
  const shouldReduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ContributionsResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-contributions")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((json: ContributionsResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(
    () => (data ? groupIntoWeeks(data.contributions) : []),
    [data],
  );

  const monthLabels = useMemo(() => {
    return weeks.map((week, index) => {
      const firstDay = week.find((day) => day.date);
      if (!firstDay) return null;

      const month = new Date(`${firstDay.date}T00:00:00`).getMonth();
      const prevWeek = weeks[index - 1];
      const prevFirstDay = prevWeek?.find((day) => day.date);
      const prevMonth = prevFirstDay
        ? new Date(`${prevFirstDay.date}T00:00:00`).getMonth()
        : null;

      if (index === 0 || month !== prevMonth) {
        return monthFormatter.format(new Date(`${firstDay.date}T00:00:00`));
      }

      return null;
    });
  }, [weeks]);

  const showTooltip = (event: React.MouseEvent<HTMLElement>, day: ContributionDay) => {
    if (!gridRef.current || !day.date) return;

    const cellRect = event.currentTarget.getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();
    const formattedDate = dayFormatter.format(new Date(`${day.date}T00:00:00`));
    const noun = day.count === 1 ? "contribution" : "contributions";

    setTooltip({
      x: cellRect.left - gridRect.left + cellRect.width / 2,
      y: cellRect.top - gridRect.top,
      label: `${day.count} ${noun} on ${formattedDate}`,
    });
  };

  if (failed) return null;

  return (
    <section id="github" className="section-band section-band--paper">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35 }}
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-6">
              Activity
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">
              GitHub.
            </h2>
            {data && (
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {data.total.lastYear.toLocaleString()} contributions in the
                last year.
              </p>
            )}
            <a
              href="https://github.com/JohnCarl-30"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-950 transition-colors hover:text-primary dark:text-white dark:hover:text-primary"
            >
              <Github className="h-4 w-4" />
              @JohnCarl-30
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="glass-panel rounded-[1.75rem] p-6 md:p-7"
          >
            {!data ? (
              <div className="flex h-40 items-center justify-center">
                <div className="flex gap-[3px]">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-24 w-[11px] animate-pulse rounded-[3px] bg-slate-200/80 dark:bg-white/[0.07]"
                      style={{ animationDelay: `${i * 80}ms` }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                ref={gridRef}
                className="relative"
                onMouseLeave={() => setTooltip(null)}
              >
                <div className="overflow-x-auto pb-2">
                  <div className="min-w-max">
                    <div className="mb-2 flex gap-[3px] text-[10px] font-medium text-slate-400 dark:text-slate-500">
                      {weeks.map((_, index) => (
                        <span key={index} className="relative h-3 w-[11px]">
                          {monthLabels[index] && (
                            <span className="absolute left-0 top-0 whitespace-nowrap">
                              {monthLabels[index]}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-[3px]">
                      {weeks.map((week, weekIndex) => (
                        <motion.div
                          key={weekIndex}
                          initial={
                            shouldReduceMotion ? false : { opacity: 0, y: 8 }
                          }
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{
                            duration: 0.3,
                            delay: shouldReduceMotion ? 0 : weekIndex * 0.012,
                            ease: "easeOut",
                          }}
                          className="flex flex-col gap-[3px]"
                        >
                          {week.map((day, dayIndex) =>
                            day.date ? (
                              <span
                                key={day.date}
                                onMouseEnter={(event) =>
                                  showTooltip(event, day)
                                }
                                className={`h-[11px] w-[11px] rounded-[3px] transition-transform duration-150 hover:scale-125 ${levelClasses[day.level]}`}
                              />
                            ) : (
                              <span
                                key={`pad-${weekIndex}-${dayIndex}`}
                                className="h-[11px] w-[11px]"
                              />
                            ),
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  <span>Less</span>
                  {levelClasses.map((levelClass) => (
                    <span
                      key={levelClass}
                      className={`h-[10px] w-[10px] rounded-[3px] ${levelClass}`}
                    />
                  ))}
                  <span>More</span>
                </div>

                <AnimatePresence>
                  {tooltip && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="pointer-events-none absolute z-20"
                      style={{ left: tooltip.x, top: tooltip.y }}
                    >
                      <div className="-translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-slate-950">
                        {tooltip.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubContributions;
