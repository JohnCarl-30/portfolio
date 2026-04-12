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
  Rocket,
  Search,
  SunMedium,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  type ThemePreference,
  useAppUI,
} from "@/components/providers/AppUIProvider";
import { Kbd } from "@/components/ui/kbd";

type SearchView = "search" | "theme";
type SearchGroup = "Site" | "Main Pages";

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
      action: "open-theme-picker";
      href?: never;
      kind: "action";
    }
);

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
];

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

const GROUP_ORDER: SearchGroup[] = ["Site", "Main Pages"];

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
  title: "Choose a Theme",
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

const matchesEntry = (entry: SearchEntry, query: string) => {
  if (!query) {
    return true;
  }

  return [entry.title, entry.description, ...entry.keywords]
    .join(" ")
    .toLowerCase()
    .includes(query);
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

  const entries = useMemo(
    () => [createThemeEntry(themePreference, resolvedTheme), ...PAGE_ITEMS],
    [resolvedTheme, themePreference],
  );

  const filteredEntries = useMemo(
    () => entries.filter((entry) => matchesEntry(entry, deferredQuery)),
    [deferredQuery, entries],
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
    (theme: ThemePreference) => {
      setTheme(theme);
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
        if (view === "theme") {
          setView("search");
          return;
        }

        closePalette();
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
          chooseTheme(THEME_OPTIONS[themeIndex].id);
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
      {isSearchOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-950/45 px-4 pt-[12vh] backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePalette();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-auto w-full max-w-3xl overflow-hidden rounded-[1.4rem] border border-blue-500/60 bg-[#141110]/95 text-white shadow-[0_24px_90px_rgba(15,23,42,0.55)]"
          >
            {view === "search" ? (
              <>
                <div className="flex items-center gap-3 border-b border-blue-500/70 px-5 py-4">
                  <Search className="h-4 w-4 text-blue-400" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search pages or theme..."
                    className="h-10 flex-1 bg-transparent text-base text-white outline-none placeholder:text-zinc-500"
                  />
                  <div className="hidden items-center gap-2 md:flex">
                    <Kbd className="bg-white/10 text-white/80">Esc</Kbd>
                  </div>
                </div>

                <div className="max-h-[65vh] overflow-y-auto px-3 py-3">
                  {groupedEntries.length ? (
                    groupedEntries.map((section) => (
                      <div key={section.group} className="mb-3 last:mb-0">
                        <p className="px-3 pb-2 text-xs font-semibold tracking-wide text-zinc-400">
                          {section.group}
                        </p>
                        <div className="space-y-1">
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
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                                  isActive
                                    ? "bg-white/10 text-white"
                                    : "text-zinc-100 hover:bg-white/6"
                                }`}
                              >
                                <div
                                  className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                                    isActive
                                      ? "border-blue-400/60 bg-blue-500/15 text-blue-300"
                                      : "border-white/10 bg-white/5 text-zinc-300"
                                  }`}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-base font-medium">
                                    {entry.title}
                                  </p>
                                  <p className="truncate text-sm text-zinc-400">
                                    {entry.description}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                      <Search className="mb-4 h-10 w-10 text-zinc-600" />
                      <p className="text-lg font-medium text-white">
                        No matches found
                      </p>
                      <p className="mt-2 max-w-sm text-sm text-zinc-400">
                        Try searching for home, about, projects, or theme.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-zinc-400">
                  <span>Global search and appearance controls.</span>
                  <div className="hidden items-center gap-2 md:flex">
                    <Kbd className="bg-white/10 text-white/80">↑</Kbd>
                    <Kbd className="bg-white/10 text-white/80">↓</Kbd>
                    <Kbd className="bg-white/10 text-white/80">Enter</Kbd>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 px-6 pt-8 pb-4">
                  <button
                    type="button"
                    onClick={() => setView("search")}
                    aria-label="Back to search"
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-zinc-300 transition hover:bg-white/6 hover:text-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <div className="flex items-center gap-4">
                    <h2 className="text-[2rem] font-semibold tracking-tight text-white">
                      Choose a Theme
                    </h2>
                    <span className="rounded-xl bg-white/8 px-3 py-1 text-sm font-semibold lowercase text-zinc-200">
                      {getThemeLabel(themePreference)}
                    </span>
                  </div>
                </div>

                <div className="px-7 pb-8">
                  <div className="flex flex-wrap gap-4">
                    {THEME_OPTIONS.map((option, index) => {
                      const Icon = option.icon;
                      const isSelected = themePreference === option.id;
                      const isKeyboardTarget = themeIndex === index;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-label={`Use ${option.label} theme`}
                          title={option.label}
                          onMouseEnter={() => setThemeIndex(index)}
                          onClick={() => chooseTheme(option.id)}
                          className={`flex h-14 w-16 items-center justify-center rounded-2xl transition ${
                            option.swatchClassName
                          } ${
                            isSelected || isKeyboardTarget
                              ? "ring-4 ring-blue-500/90 ring-offset-0"
                              : "ring-1 ring-white/8 hover:ring-white/20"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-5 text-sm text-zinc-400">
                    Pick a theme and the preference will be saved globally for
                    your portfolio.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
