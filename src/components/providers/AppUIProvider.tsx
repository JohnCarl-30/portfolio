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

type AppUIContextValue = {
  theme: ThemeMode;
  isSearchOpen: boolean;
  closeSearch: () => void;
  openSearch: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleSearch: () => void;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = "portfolio-theme";

const AppUIContext = createContext<AppUIContextValue | null>(null);

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === "light" || value === "dark";

const getThemeFromDocument = (): ThemeMode => {
  if (typeof document === "undefined") {
    return "light";
  }

  const theme = document.documentElement.dataset.theme;
  return isThemeMode(theme) ? theme : "light";
};

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (isThemeMode(storedTheme)) {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme: ThemeMode) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export function AppUIProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeMode] = useState<ThemeMode>(getThemeFromDocument);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setThemeMode(preferredTheme);
    applyTheme(preferredTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((current) => !current);
  }, []);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeMode(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isSearchOpen,
      closeSearch,
      openSearch,
      setTheme,
      toggleSearch,
      toggleTheme,
    }),
    [closeSearch, isSearchOpen, openSearch, setTheme, theme, toggleSearch, toggleTheme],
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
