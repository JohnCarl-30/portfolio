"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Briefcase,
  FlaskConical,
  FolderKanban,
  Github,
  Mail,
  PenLine,
  Search,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAppUI } from "@/components/providers/AppUIProvider";

export const DOCK_SECTIONS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "writing", label: "writing", icon: PenLine },
  { id: "projects", label: "projects", icon: FolderKanban },
  { id: "work", label: "work", icon: Briefcase },
  { id: "toolkit", label: "toolkit", icon: Wrench },
  { id: "github", label: "github", icon: Github },
  { id: "credentials", label: "credentials", icon: BadgeCheck },
  { id: "contact", label: "contact", icon: Mail },
  { id: "sandbox", label: "sandbox", icon: FlaskConical },
];

/**
 * Floating dock, top centre. The page loads with no chrome at all — the
 * identity row is the first thing you see — and the dock slides down once you
 * scroll past the intro, carrying the position indicator, one-tap section
 * jumps, and the command palette.
 */
export default function SectionDock() {
  const { openSearch } = useAppUI();
  const calm = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    DOCK_SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // The dock scrolls horizontally on narrow screens; keep the active chip in view.
  useEffect(() => {
    if (!active || !listRef.current) return;
    const chip = listRef.current.querySelector<HTMLElement>(
      `[data-section="${active}"]`,
    );
    chip?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: calm ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <AnimatePresence>
      {shown ? (
        <motion.nav
          aria-label="Page sections"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-x-0 top-3 z-40 flex justify-center px-4"
        >
          <div
            ref={listRef}
            className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-[var(--line-strong)] bg-[var(--panel)]/85 p-1 shadow-[var(--shadow-soft)] backdrop-blur-xl">
            {DOCK_SECTIONS.map((section) => {
              const isActive = active === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => jump(section.id)}
                  data-section={section.id}
                  aria-current={isActive ? "location" : undefined}
                  className="focus-ring relative shrink-0 rounded-full px-3 py-1.5 text-[0.8rem] transition-colors"
                >
                  {isActive ? (
                    <motion.span
                      layoutId="dock-active"
                      className="absolute inset-0 rounded-full bg-[var(--hover)]"
                      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    />
                  ) : null}
                  <span
                    className={`relative inline-flex items-center gap-1.5 ${
                      isActive
                        ? "font-semibold text-[var(--ink)]"
                        : "text-[var(--muted-ink)] hover:text-[var(--ink)]"
                    }`}
                  >
                    <section.icon
                      className={`h-3.5 w-3.5 ${
                        isActive ? "text-[var(--signal)]" : "text-[var(--dim)]"
                      }`}
                    />
                    {section.label}
                  </span>
                </button>
              );
            })}

            <span aria-hidden="true" className="mx-1 h-4 w-px bg-[var(--line)]" />

            <button
              type="button"
              onClick={openSearch}
              aria-label="Open search"
              className="focus-ring flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[var(--muted-ink)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--ink)]"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="hidden font-mono text-[0.75rem] sm:inline">⌘K</kbd>
            </button>
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
