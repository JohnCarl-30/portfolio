"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  BadgeCheck,
  Briefcase,
  FlaskConical,
  FolderKanban,
  Github,
  Mail,
  Menu,
  PenLine,
  Search,
  Wrench,
  X,
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
 * Dock pill that leans a few pixels toward the cursor and springs back.
 * Purely decorative, so it sits out entirely for reduced-motion users.
 */
function MagneticButton({
  calm,
  className,
  children,
  onClick,
  dataSection,
  ariaCurrent,
  ariaLabel,
}: {
  calm: boolean;
  className: string;
  children: React.ReactNode;
  onClick: () => void;
  dataSection?: string;
  ariaCurrent?: "location";
  ariaLabel?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22 });
  const springY = useSpring(y, { stiffness: 320, damping: 22 });

  return (
    <motion.button
      type="button"
      onClick={onClick}
      data-section={dataSection}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        if (calm) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.22);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.4);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.button>
  );
}

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
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Body scroll lock + Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

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
          className="fixed inset-x-0 top-3 z-40 flex justify-end px-4 sm:justify-center"
        >
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="focus-ring pointer-events-auto flex h-12 items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--panel)]/85 px-4 text-[0.95rem] font-semibold text-[var(--ink)] shadow-[var(--shadow-soft)] backdrop-blur-xl sm:hidden"
          >
            <Menu className="h-5 w-5" />
            menu
          </button>

          <div
            ref={listRef}
            className="pointer-events-auto hidden max-w-full items-center gap-1 overflow-x-auto rounded-full border border-[var(--line-strong)] bg-[var(--panel)]/85 p-1 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:flex">
            {DOCK_SECTIONS.map((section) => {
              const isActive = active === section.id;

              return (
                <MagneticButton
                  key={section.id}
                  calm={Boolean(calm)}
                  onClick={() => jump(section.id)}
                  dataSection={section.id}
                  ariaCurrent={isActive ? "location" : undefined}
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
                </MagneticButton>
              );
            })}

            <span aria-hidden="true" className="mx-1 h-4 w-px bg-[var(--line)]" />

            <MagneticButton
              calm={Boolean(calm)}
              onClick={openSearch}
              ariaLabel="Open search"
              className="focus-ring flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[var(--muted-ink)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--ink)]"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="hidden font-mono text-[0.75rem] sm:inline">⌘K</kbd>
            </MagneticButton>
          </div>
        </motion.nav>
      ) : null}

      {menuOpen ? (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[95] flex flex-col bg-[var(--paper)] px-6 pb-8 pt-5 sm:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="section-label">menu</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted-ink)] transition-colors hover:text-[var(--ink)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <ul className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
            {DOCK_SECTIONS.map((section, index) => {
              const isActive = active === section.id;

              return (
                <li key={section.id}>
                  <motion.button
                    type="button"
                    initial={calm ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.23, 1, 0.32, 1],
                      delay: calm ? 0 : 0.04 + index * 0.045,
                    }}
                    onClick={() => {
                      setMenuOpen(false);
                      jump(section.id);
                    }}
                    className={`focus-ring flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left text-[1.35rem] font-semibold transition-colors ${
                      isActive
                        ? "bg-[var(--hover)] text-[var(--ink)]"
                        : "text-[var(--ink)] hover:bg-[var(--hover)]"
                    }`}
                  >
                    <section.icon
                      className={`h-5 w-5 ${
                        isActive ? "text-[var(--signal)]" : "text-[var(--dim)]"
                      }`}
                    />
                    {section.label}
                    <span className="meta ml-auto">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openSearch();
            }}
            className="focus-ring mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--line-strong)] py-3.5 text-[1.05rem] font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--hover)]"
          >
            <Search className="h-4.5 w-4.5" />
            search
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
