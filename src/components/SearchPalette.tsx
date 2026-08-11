"use client";

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  FolderKanban,
  Home,
  MonitorCog,
  MoonStar,
  Newspaper,
  Rocket,
  Search,
  SunMedium,
  Terminal,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  type ThemePreference,
  useAppUI,
} from "@/components/providers/AppUIProvider";
import { DOCK_SECTIONS } from "@/components/home/SectionDock";
import { getAllPosts } from "@/app/data/Blog";
import { projectsData } from "@/app/data/Projects";
import TerminalView from "@/components/TerminalView";
import { Kbd } from "@/components/ui/kbd";

type SearchView = "search" | "theme" | "terminal";
type SearchGroup = "Site" | "Sections" | "Main Pages" | "Projects" | "Writing";

type ThemeOption = {
  icon: LucideIcon;
  id: ThemePreference;
  label: string;
  swatchClassName: string;
};

type SearchEntry = {
  description: string;
  group: SearchGroup;
  icon: LucideIcon;
  id: string;
  keywords: string[];
  title: string;
} & (
  | {
      href: string;
      kind: "route";
    }
  | {
      action: "open-theme-picker" | "open-terminal";
      href?: never;
      kind: "action";
    }
);

const TERMINAL_ENTRY: SearchEntry = {
  id: "terminal",
  title: "Terminal",
  description: "Open the hidden portfolio shell.",
  group: "Site",
  icon: Terminal,
  keywords: ["terminal", "console", "shell", "cli", "command"],
  action: "open-terminal",
  kind: "action",
};

/**
 * The home page is a single scroll, so its sections are addressable the same
 * way routes are. Selecting one smooth-scrolls when already on "/".
 */
const SECTION_ITEMS: SearchEntry[] = DOCK_SECTIONS.map((section) => ({
  id: `section-${section.id}`,
  title: section.label,
  description: `Jump to the ${section.label} section.`,
  href: `/#${section.id}`,
  group: "Sections",
  icon: section.icon,
  keywords: ["section", "jump", "scroll", section.id],
  kind: "route",
}));

const PAGE_ITEMS: SearchEntry[] = [
  {
    id: "home",
    title: "Home",
    description: "Go back to the main landing page.",
    href: "/",
    group: "Main Pages",
    icon: Home,
    keywords: ["landing", "start", "hero"],
    kind: "route",
  },
  {
    id: "about",
    title: "About",
    description: "Open the full about page.",
    href: "/about",
    group: "Main Pages",
    icon: UserRound,
    keywords: ["bio", "profile", "story"],
    kind: "route",
  },
  {
    id: "projects",
    title: "Projects",
    description: "Browse the project portfolio page.",
    href: "/projects",
    group: "Main Pages",
    icon: FolderKanban,
    keywords: ["portfolio", "work", "case studies"],
    kind: "route",
  },
  {
    id: "blog",
    title: "Writing",
    description: "Notes on AI and full-stack shipping.",
    href: "/blog",
    group: "Main Pages",
    icon: Newspaper,
    keywords: ["writing", "posts", "articles", "notes", "blog"],
    kind: "route",
  },
];

const PROJECT_ITEMS: SearchEntry[] = projectsData.map((project) => ({
  id: project.id,
  title: project.name,
  description: project.desc,
  href: `/projects/${project.id}`,
  group: "Projects",
  icon: FolderKanban,
  keywords: [project.category, project.role, ...project.tech],
  kind: "route",
}));

const BLOG_ITEMS: SearchEntry[] = getAllPosts().map((post) => ({
  id: post.slug,
  title: post.title,
  description: post.excerpt,
  href: `/blog/${post.slug}`,
  group: "Writing",
  icon: Newspaper,
  keywords: [...post.tags, "blog", "post"],
  kind: "route",
}));

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "light",
    label: "Light",
    icon: SunMedium,
    swatchClassName:
      "border border-white/60 bg-white text-amber-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
  },
  {
    id: "dark",
    label: "Dark",
    icon: MoonStar,
    swatchClassName: "bg-slate-700 text-amber-200",
  },
  {
    id: "system",
    label: "System",
    icon: MonitorCog,
    swatchClassName: "bg-zinc-500 text-zinc-100",
  },
  {
    id: "midnight",
    label: "Midnight",
    icon: Rocket,
    swatchClassName: "bg-amber-400 text-slate-950",
  },
];

const GROUP_ORDER: SearchGroup[] = [
  "Site",
  "Sections",
  "Main Pages",
  "Projects",
  "Writing",
];

const getThemeLabel = (theme: ThemePreference) => {
  switch (theme) {
    case "light":
      return "light";
    case "dark":
      return "dark";
    case "system":
      return "system";
    case "midnight":
      return "midnight";
    default:
      return theme;
  }
};

const getThemeOptionIndex = (theme: ThemePreference) =>
  Math.max(
    0,
    THEME_OPTIONS.findIndex((option) => option.id === theme),
  );

const createThemeEntry = (
  themePreference: ThemePreference,
  resolvedTheme: "light" | "dark",
): SearchEntry => ({
  id: "theme",
  title: "Theme",
  description:
    themePreference === "system"
      ? `Follow your device. Currently ${resolvedTheme}.`
      : `Current theme: ${getThemeLabel(themePreference)}.`,
  group: "Site",
  icon:
    THEME_OPTIONS.find((option) => option.id === themePreference)?.icon ??
    MoonStar,
  keywords: ["theme", "appearance", "mode", "dark", "light", "midnight"],
  action: "open-theme-picker",
  kind: "action",
});

/** Lowercase and reduce punctuation to spaces: "Next.js" -> "next js". */
const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * Every whitespace-separated term in the query has to appear somewhere in the
 * entry, matched against both the spaced and the punctuation-collapsed form.
 * That makes "nextjs" find "Next.js", "type script" find "TypeScript", and
 * "rag mongo" find "Building RAG Apps Using MongoDB" — none of which a plain
 * substring test would catch.
 */
const matchesEntry = (entry: SearchEntry, query: string) => {
  if (!query) {
    return true;
  }

  const haystack = normalize(
    [entry.title, entry.description, ...entry.keywords].join(" "),
  );
  const collapsed = haystack.replace(/ /g, "");
  const terms = normalize(query).split(" ").filter(Boolean);

  if (!terms.length) {
    return true;
  }

  return terms.every(
    (term) => haystack.includes(term) || collapsed.includes(term),
  );
};

export default function SearchPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    closeSearch,
    isSearchOpen,
    resolvedTheme,
    setTheme,
    themePreference,
    toggleSearch,
  } = useAppUI();

  const [query, setQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(getThemeOptionIndex(themePreference));
  const [view, setView] = useState<SearchView>("search");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const hasActiveQuery = deferredQuery.length > 0;

  const entries = useMemo(
    () => [
      createThemeEntry(themePreference, resolvedTheme),
      TERMINAL_ENTRY,
      ...SECTION_ITEMS,
      ...PAGE_ITEMS,
      ...PROJECT_ITEMS,
      ...BLOG_ITEMS,
    ],
    [resolvedTheme, themePreference],
  );

  const filteredEntries = useMemo(
    () =>
      entries.filter((entry) => {
        if (
          !hasActiveQuery &&
          (entry.group === "Projects" || entry.group === "Writing")
        ) {
          return false;
        }

        return matchesEntry(entry, deferredQuery);
      }),
    [deferredQuery, entries, hasActiveQuery],
  );

  const groupedEntries = useMemo(() => {
    return GROUP_ORDER.map((group) => ({
      group,
      items: filteredEntries.filter((entry) => entry.group === group),
    })).filter((section) => section.items.length > 0);
  }, [filteredEntries]);

  const flatEntries = useMemo(
    () => groupedEntries.flatMap((section) => section.items),
    [groupedEntries],
  );

  const closePalette = useCallback(() => {
    closeSearch();
    setView("search");
    setQuery("");
  }, [closeSearch]);

  useEffect(() => {
    setThemeIndex(getThemeOptionIndex(themePreference));
  }, [themePreference]);

  useEffect(() => {
    if (!isSearchOpen) {
      setView("search");
      setQuery("");
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (view === "search") {
        inputRef.current?.focus();
      }
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isSearchOpen, view]);

  useEffect(() => {
    if (!flatEntries.length) {
      setSearchIndex(-1);
      return;
    }

    setSearchIndex((current) => {
      if (current < 0 || current >= flatEntries.length) {
        return 0;
      }

      return current;
    });
  }, [flatEntries.length]);

  const runEntry = useCallback(
    (entry: SearchEntry) => {
      if (entry.kind === "action") {
        if (entry.action === "open-terminal") {
          setView("terminal");
          return;
        }

        setView("theme");
        setThemeIndex(getThemeOptionIndex(themePreference));
        return;
      }

      setQuery("");
      closeSearch();
      setView("search");

      const [route, hash] = entry.href.split("#");
      const targetPath = route || "/";

      if (hash && pathname === targetPath) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", entry.href);
          return;
        }
      }

      router.push(entry.href);
    },
    [closeSearch, pathname, router, themePreference],
  );

  const chooseTheme = useCallback(
    (theme: ThemePreference, element?: HTMLElement | null) => {
      const rect = element?.getBoundingClientRect();
      setTheme(
        theme,
        rect
          ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
          : undefined,
      );
    },
    [setTheme],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggleSearch();
        return;
      }

      if (!isSearchOpen) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        if (view === "theme" || view === "terminal") {
          setView("search");
          return;
        }

        closePalette();
        return;
      }

      if (view === "terminal") {
        return;
      }

      if (view === "theme") {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          setThemeIndex((current) => (current + 1) % THEME_OPTIONS.length);
          return;
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          setThemeIndex((current) =>
            current <= 0 ? THEME_OPTIONS.length - 1 : current - 1,
          );
          return;
        }

        if (event.key === "Enter") {
          event.preventDefault();
          chooseTheme(
            THEME_OPTIONS[themeIndex].id,
            document.querySelector<HTMLElement>(
              `[data-theme-option="${THEME_OPTIONS[themeIndex].id}"]`,
            ),
          );
        }

        return;
      }

      if (!flatEntries.length) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSearchIndex((current) => (current + 1) % flatEntries.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSearchIndex((current) =>
          current <= 0 ? flatEntries.length - 1 : current - 1,
        );
        return;
      }

      if (event.key === "Enter" && searchIndex >= 0) {
        event.preventDefault();
        runEntry(flatEntries[searchIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    chooseTheme,
    closePalette,
    flatEntries,
    isSearchOpen,
    runEntry,
    searchIndex,
    themeIndex,
    toggleSearch,
    view,
  ]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          key="search-palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-black/25 px-4 pt-[12vh] backdrop-blur-[3px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePalette();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[var(--panel)] text-[var(--ink)] shadow-[var(--shadow-lift)]"
          >
            {view === "search" ? (
              <>
                <div className="flex items-center gap-2.5 border-b border-[var(--line)] px-3.5 py-2.5">
                  <Search className="h-3.5 w-3.5 shrink-0 text-[var(--dim)]" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="search sections, projects, notes…"
                    className="h-7 flex-1 bg-transparent text-[0.85rem] outline-none placeholder:text-[var(--dim)]"
                  />
                  <Kbd className="hidden border-[var(--line)] bg-[var(--hover)] text-[var(--dim)] sm:inline-flex">
                    esc
                  </Kbd>
                </div>

                <div className="max-h-[52vh] overflow-y-auto p-1.5">
                  {groupedEntries.length ? (
                    groupedEntries.map((section) => (
                      <div key={section.group} className="mb-1.5 last:mb-0">
                        <p className="meta px-2.5 pb-1 pt-1.5 lowercase">
                          {section.group}
                        </p>

                        <div className="space-y-0.5">
                          {section.items.map((entry) => {
                            const itemIndex = flatEntries.findIndex(
                              (item) => item.id === entry.id,
                            );
                            const isActive = itemIndex === searchIndex;
                            const Icon = entry.icon;

                            return (
                              <button
                                key={entry.id}
                                type="button"
                                onMouseEnter={() => setSearchIndex(itemIndex)}
                                onClick={() => runEntry(entry)}
                                className={`focus-ring relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-100 ${
                                  isActive ? "bg-[var(--hover)]" : ""
                                }`}
                              >
                                {isActive ? (
                                  <motion.span
                                    layoutId="palette-cursor"
                                    className="absolute inset-y-1 left-0 w-[2px] rounded-full bg-[var(--signal)]"
                                    transition={{ duration: 0.16 }}
                                  />
                                ) : null}

                                <span
                                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                    isActive
                                      ? "border-[var(--signal)]/40 bg-[var(--signal-soft)] text-[var(--signal)]"
                                      : "border-[var(--line)] bg-[var(--hover)] text-[var(--dim)]"
                                  }`}
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                </span>

                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-[0.85rem] font-semibold">
                                    {entry.title}
                                  </span>
                                  <span className="block truncate text-[0.75rem] text-[var(--muted-ink)]">
                                    {entry.description}
                                  </span>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                      <Search className="mb-3 h-6 w-6 text-[var(--dim)]" />
                      <p className="text-[0.9rem] font-semibold">No matches</p>
                      <p className="row-desc mt-1 max-w-xs">
                        Try projects, notes, stack, or theme.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-[var(--line)] px-3.5 py-2">
                  <span className="meta">navigate anywhere</span>
                  <div className="hidden items-center gap-1.5 sm:flex">
                    <Kbd className="border-[var(--line)] bg-[var(--hover)] text-[var(--dim)]">
                      ↑
                    </Kbd>
                    <Kbd className="border-[var(--line)] bg-[var(--hover)] text-[var(--dim)]">
                      ↓
                    </Kbd>
                    <Kbd className="border-[var(--line)] bg-[var(--hover)] text-[var(--dim)]">
                      ↵
                    </Kbd>
                  </div>
                </div>
              </>
            ) : view === "terminal" ? (
              <div className="bg-[#0e1013] text-zinc-100">
                <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => setView("search")}
                    aria-label="Back to search"
                    className="focus-ring flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                  <h2 className="text-[0.9rem] font-semibold text-white">
                    portfolio shell
                  </h2>
                </div>
                <TerminalView
                  onExit={() => setView("search")}
                  onNavigate={(href) => {
                    closePalette();
                    router.push(href);
                  }}
                  onSetTheme={setTheme}
                />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 border-b border-[var(--line)] px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => setView("search")}
                    aria-label="Back to search"
                    className="focus-ring flex h-7 w-7 items-center justify-center rounded-md text-[var(--dim)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--ink)]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <h2 className="text-[0.9rem] font-semibold">Theme</h2>
                  <span className="meta">{getThemeLabel(themePreference)}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 p-2 sm:grid-cols-4">
                  {THEME_OPTIONS.map((option, index) => {
                    const Icon = option.icon;
                    const isSelected = themePreference === option.id;
                    const isKeyboardTarget = themeIndex === index;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-label={`Use ${option.label} theme`}
                        data-theme-option={option.id}
                        onMouseEnter={() => setThemeIndex(index)}
                        onClick={(event) =>
                          chooseTheme(option.id, event.currentTarget)
                        }
                        className={`focus-ring flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 transition-colors ${
                          isSelected || isKeyboardTarget
                            ? "border-[var(--signal)]/45 bg-[var(--signal-soft)]"
                            : "border-[var(--line)] hover:bg-[var(--hover)]"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            isSelected
                              ? "text-[var(--signal)]"
                              : "text-[var(--muted-ink)]"
                          }`}
                        />
                        <span className="text-[0.72rem] lowercase text-[var(--muted-ink)]">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="meta border-t border-[var(--line)] px-3.5 py-2">
                  saved to this browser
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
