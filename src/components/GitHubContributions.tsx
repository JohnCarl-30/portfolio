"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Github } from "lucide-react";

import SectionHead from "@/components/home/SectionHead";

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
  "bg-[var(--hover)]",
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

  const showTooltip = (
    event: React.MouseEvent<HTMLElement>,
    day: ContributionDay,
  ) => {
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
    <section className="pb-12">
      <SectionHead id="github" label="github" />

      <div className="flex items-baseline justify-between gap-4 pb-4">
        <p className="row-desc">
          {data
            ? `${data.total.lastYear.toLocaleString()} contributions in the last year.`
            : "Contribution activity over the last year."}
        </p>
        <a
          href="https://github.com/JohnCarl-30"
          target="_blank"
          rel="noopener noreferrer"
          className="group/gh focus-ring inline-flex shrink-0 items-center gap-1.5 text-[0.78rem] text-[var(--dim)] transition-colors hover:text-[var(--ink)]"
        >
          <Github className="h-3.5 w-3.5" />
          @JohnCarl-30
        </a>
      </div>

      <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-5">
        {!data ? (
          <div className="flex h-36 items-center justify-center">
            <div className="flex gap-[3px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 w-[11px] animate-pulse rounded-[3px] bg-[var(--hover)]"
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
                <div className="meta mb-2 flex gap-[3px]">
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
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
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
                            onMouseEnter={(event) => showTooltip(event, day)}
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

            <div className="meta mt-4 flex items-center justify-end gap-2">
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
                  <div className="-translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md bg-[var(--ink)] px-2.5 py-1 text-[0.72rem] font-medium text-[var(--paper)] shadow-lg">
                    {tooltip.label}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubContributions;
