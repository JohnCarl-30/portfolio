"use client";

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
  setTheme: (theme: ThemePreference) => void;
  toggleSearch: () => void;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = "portfolio-theme";

const AppUIContext = createContext<AppUIContextValue | null>(null);

const isThemePreference = (value: string | null): value is ThemePreference =>
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

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    setThemePreference(nextTheme);
  }, []);

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
