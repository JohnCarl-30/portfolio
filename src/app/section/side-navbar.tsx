"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "featured-projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "skills", label: "Stack" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const SideNavbar = () => {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35, rootMargin: "-20% 0px -35% 0px" },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 xl:block"
    >
      <div className="pointer-events-auto flex border-r border-border/70 pr-5 dark:border-white/15">
        <ul className="flex flex-col gap-5">
          {sections.map(({ id, label }) => {
            const isActive = active === id;

            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`font-mono text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
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
