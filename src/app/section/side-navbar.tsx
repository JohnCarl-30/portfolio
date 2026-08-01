"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "featured-projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "skills", label: "Stack" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const ITEM_HEIGHT = 20;
const GAP = 20;

const SideNavbar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const index = sections.findIndex((s) => s.id === visible.target.id);
          setActiveIndex(index >= 0 ? index : null);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const indicatorY = activeIndex !== null ? activeIndex * (ITEM_HEIGHT + GAP) : null;

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 xl:block"
    >
      <div className="pointer-events-auto relative flex border-r border-border/70 pr-5 dark:border-white/15">
        {indicatorY !== null && (
          <span
            aria-hidden="true"
            className="absolute left-[-1px] top-0 w-[2px] rounded-full bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
              height: ITEM_HEIGHT,
              transform: `translateY(${indicatorY}px)`,
            }}
          />
        )}

        <ul ref={listRef} className="flex flex-col gap-5">
          {sections.map(({ id, label }, index) => {
            const isActive = activeIndex === index;

            return (
              <li key={id} style={{ height: ITEM_HEIGHT }}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`font-mono text-sm leading-[${ITEM_HEIGHT}px] transition-[color,font-weight] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive
                      ? "font-semibold text-foreground"
                      : "font-normal text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default SideNavbar;
