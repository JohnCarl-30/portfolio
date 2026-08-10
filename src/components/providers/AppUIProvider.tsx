"use client";

import { flushSync } from "react-dom";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system" | "midnight";

type AppUIContextValue = {
  resolvedTheme: ThemeMode;
  theme: ThemeMode;
  themePreference: ThemePreference;
  isSearchOpen: boolean;
  closeSearch: () => void;
  openSearch: () => void;
  setTheme: (theme: ThemePreference, origin?: { x: number; y: number }) => void;
  toggleSearch: () => void;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = "portfolio-theme";

const AppUIContext = createContext<AppUIContextValue | null>(null);

const isThemePreference = (
  value: string | null | undefined,
): value is ThemePreference =>
  value === "light" ||
  value === "dark" ||
  value === "system" ||
  value === "midnight";

const getSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const resolveTheme = (
  preference: ThemePreference,
  systemTheme: ThemeMode,
): ThemeMode => {
  if (preference === "system") {
    return systemTheme;
  }

  if (preference === "midnight") {
    return "dark";
  }

  return preference;
};

const getThemeFromDocument = (): ThemePreference => {
  if (typeof document === "undefined") {
    return "system";
  }

  const theme = document.documentElement.dataset.themeSelection;
  return isThemePreference(theme) ? theme : "system";
};

const getPreferredTheme = (): ThemePreference => {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (isThemePreference(storedTheme)) {
    return storedTheme;
  }

  return "system";
};

const applyTheme = (
  preference: ThemePreference,
  resolvedTheme: ThemeMode,
) => {
  const root = document.documentElement;
  root.classList.toggle("dark", resolvedTheme === "dark");
  root.dataset.theme = resolvedTheme;
  root.dataset.themeSelection = preference;
  root.dataset.themeVariant = preference === "midnight" ? "midnight" : "default";
  root.style.colorScheme = resolvedTheme;
  window.localStorage.setItem(THEME_STORAGE_KEY, preference);
};

/**
 * Circular reveal of the new theme, expanding from wherever the user clicked.
 *
 * The DOM write happens synchronously inside the view-transition callback so
 * the browser snapshots the new palette; `flushSync` keeps React's own state
 * in step within the same frame. Falls back to a plain swap when the API is
 * missing (Firefox) or the user asked for reduced motion.
 */
const revealTheme = (
  commit: () => void,
  origin: { x: number; y: number } | undefined,
) => {
  const calm =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof document === "undefined" || !document.startViewTransition || calm) {
    commit();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  // Scopes the CSS so this reads as a clip reveal, not the route fade.
  document.documentElement.dataset.transition = "theme";

  const transition = document.startViewTransition(() => {
    flushSync(commit);
  });

  transition.finished.finally(() => {
    delete document.documentElement.dataset.transition;
  });

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 520,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      /* Transition was skipped; the theme is already applied. */
    });
};

export function AppUIProvider({ children }: { children: ReactNode }) {
  const [themePreference, setThemePreference] =
    useState<ThemePreference>(getThemeFromDocument);
  const [systemTheme, setSystemTheme] = useState<ThemeMode>(getSystemTheme);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const resolvedTheme = useMemo(
    () => resolveTheme(themePreference, systemTheme),
    [systemTheme, themePreference],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = (matchesDark: boolean) => {
      setSystemTheme(matchesDark ? "dark" : "light");
    };

    syncSystemTheme(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncSystemTheme(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    setThemePreference(getPreferredTheme());
  }, []);

  useEffect(() => {
    applyTheme(themePreference, resolvedTheme);
  }, [resolvedTheme, themePreference]);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((current) => !current);
  }, []);

  const setTheme = useCallback(
    (nextTheme: ThemePreference, origin?: { x: number; y: number }) => {
      if (nextTheme === themePreference) return;

      revealTheme(() => {
        // Write the DOM directly so the snapshot sees the new palette; the
        // effect below re-applies the same values harmlessly afterwards.
        applyTheme(nextTheme, resolveTheme(nextTheme, systemTheme));
        setThemePreference(nextTheme);
      }, origin);
    },
    [systemTheme, themePreference],
  );

  const toggleTheme = useCallback(() => {
    setThemePreference((current) => {
      const nextResolvedTheme =
        resolveTheme(current, systemTheme) === "dark" ? "light" : "dark";
      return nextResolvedTheme;
    });
  }, [systemTheme]);

  const value = useMemo(
    () => ({
      resolvedTheme,
      theme: resolvedTheme,
      themePreference,
      isSearchOpen,
      closeSearch,
      openSearch,
      setTheme,
      toggleSearch,
      toggleTheme,
    }),
    [
      closeSearch,
      isSearchOpen,
      openSearch,
      resolvedTheme,
      setTheme,
      themePreference,
      toggleSearch,
      toggleTheme,
    ],
  );

  return (
    <AppUIContext.Provider value={value}>{children}</AppUIContext.Provider>
  );
}

export function useAppUI() {
  const context = useContext(AppUIContext);

  if (!context) {
    throw new Error("useAppUI must be used within AppUIProvider");
  }

  return context;
}
