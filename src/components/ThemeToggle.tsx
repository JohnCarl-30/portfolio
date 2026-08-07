"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Moon, Sparkles, Sun } from "lucide-react";

import {
  useAppUI,
  type ThemePreference,
} from "@/components/providers/AppUIProvider";

const themeOptions: {
  value: ThemePreference;
  label: string;
  icon: typeof Sun;
}[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "midnight", label: "Midnight", icon: Sparkles },
  { value: "system", label: "System", icon: Monitor },
];

/**
 * Visible theme switcher. The palette (Cmd+K) can also change themes, but that
 * is keyboard-only — this is the discoverable entry point, and the only one
 * that works on touch devices.
 */
const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { themePreference, setTheme } = useAppUI();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const active =
    themeOptions.find((option) => option.value === themePreference) ??
    themeOptions[3];
  const ActiveIcon = active.icon;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Change theme (current: ${active.label})`}
        className="focus-ring inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-card/70 text-muted-foreground transition-[color,background-color,border-color,transform] duration-150 hover:border-primary/40 hover:text-foreground active:scale-[0.98]"
      >
        <ActiveIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Theme"
          className="animate-fade-up absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
        >
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = option.value === themePreference;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={`focus-ring flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-accent ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {option.label}
                {isActive && <Check className="ml-auto h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
