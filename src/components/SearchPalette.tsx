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
  FolderKanban,
  Home,
  MoonStar,
  Search,
  SunMedium,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  type ThemeMode,
  useAppUI,
} from "@/components/providers/AppUIProvider";
import { Kbd } from "@/components/ui/kbd";

type SearchGroup = "Site" | "Main Pages";

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
      action: "toggle-theme";
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

const GROUP_ORDER: SearchGroup[] = ["Site", "Main Pages"];

const createThemeItem = (theme: ThemeMode): SearchEntry => ({
  id: "theme",
  title: "Change theme",
  description:
    theme === "dark"
      ? "Currently dark. Switch back to light mode."
      : "Currently light. Switch to dark mode.",
  group: "Site",
  icon: theme === "dark" ? SunMedium : MoonStar,
  keywords: ["theme", "appearance", "mode", "dark", "light"],
  action: "toggle-theme",
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
  const { closeSearch, isSearchOpen, theme, toggleSearch, toggleTheme } =
    useAppUI();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const entries = useMemo(
    () => [createThemeItem(theme), ...PAGE_ITEMS],
    [theme],
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

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery("");
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!flatEntries.length) {
      setSelectedIndex(-1);
      return;
    }

    setSelectedIndex((current) => {
      if (current < 0 || current >= flatEntries.length) {
        return 0;
      }

      return current;
    });
  }, [flatEntries.length]);

  const runEntry = useCallback(
    (entry: SearchEntry) => {
      setQuery("");
      closeSearch();

      if (entry.kind === "action") {
        toggleTheme();
        return;
      }

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
    [closeSearch, pathname, router, toggleTheme],
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
        closeSearch();
        return;
      }

      if (!flatEntries.length) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) => (current + 1) % flatEntries.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) =>
          current <= 0 ? flatEntries.length - 1 : current - 1,
        );
        return;
      }

      if (event.key === "Enter" && selectedIndex >= 0) {
        event.preventDefault();
        runEntry(flatEntries[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    closeSearch,
    flatEntries,
    isSearchOpen,
    runEntry,
    selectedIndex,
    toggleSearch,
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
              closeSearch();
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
                        const isActive = itemIndex === selectedIndex;
                        const Icon = entry.icon;

                        return (
                          <button
                            key={entry.id}
                            type="button"
                            onMouseEnter={() => setSelectedIndex(itemIndex)}
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
