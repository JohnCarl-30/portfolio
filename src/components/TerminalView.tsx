"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import type { ThemePreference } from "@/components/providers/AppUIProvider";
import { Kbd } from "@/components/ui/kbd";

type TerminalLine = {
  id: number;
  kind: "input" | "output" | "error";
  text: string;
};

type TerminalViewProps = {
  onExit: () => void;
  onNavigate: (href: string) => void;
  onSetTheme: (theme: ThemePreference) => void;
};

const PROMPT = "guest@dyeyc:~$";

const WELCOME_LINES = [
  "Welcome to the portfolio shell.",
  "Type 'help' to see what you can do.",
];

const HELP_LINES = [
  "Available commands:",
  "  help              show this list",
  "  whoami            about John Carl",
  "  projects          open the projects page",
  "  blog              open the blog",
  "  skills            open the stack section",
  "  open github       open the GitHub profile",
  "  theme <name>      light | dark | system | midnight",
  "  clear             clear the screen",
  "  exit              back to search",
];

const isThemePreference = (value: string): value is ThemePreference =>
  value === "light" ||
  value === "dark" ||
  value === "system" ||
  value === "midnight";

function TypewriterLine({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [visibleChars, setVisibleChars] = useState(
    shouldReduceMotion ? text.length : 0,
  );

  useEffect(() => {
    if (shouldReduceMotion || visibleChars >= text.length) return;

    const interval = window.setInterval(() => {
      setVisibleChars((current) => {
        if (current >= text.length) {
          window.clearInterval(interval);
          return current;
        }
        return current + 2;
      });
    }, 12);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion, text.length, visibleChars]);

  return (
    <p className={`whitespace-pre-wrap ${className}`}>
      {text.slice(0, visibleChars)}
    </p>
  );
}

export default function TerminalView({
  onExit,
  onNavigate,
  onSetTheme,
}: TerminalViewProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextLineId = useRef(0);
  const [lines, setLines] = useState<TerminalLine[]>(() =>
    WELCOME_LINES.map((text, index) => ({
      id: index,
      kind: "output",
      text,
    })),
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    nextLineId.current = WELCOME_LINES.length;
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const pushLines = (kind: TerminalLine["kind"], texts: string[]) => {
    setLines((current) => [
      ...current,
      ...texts.map((text) => ({ id: nextLineId.current++, kind, text })),
    ]);
  };

  const runCommand = (raw: string) => {
    const [cmd = "", ...args] = raw.trim().split(/\s+/);

    switch (cmd.toLowerCase()) {
      case "help":
        return pushLines("output", HELP_LINES);
      case "whoami":
        return pushLines("output", [
          "John Carl Santos — aspiring AI engineer & full-stack developer.",
          "Builds AI-powered web apps, backend systems, and automation tools.",
        ]);
      case "projects":
        pushLines("output", ["Opening /projects..."]);
        return onNavigate("/projects");
      case "blog":
        pushLines("output", ["Opening /blog..."]);
        return onNavigate("/blog");
      case "skills":
        pushLines("output", ["Opening /skills..."]);
        return onNavigate("/skills");
      case "open":
        if (args[0]?.toLowerCase() === "github") {
          window.open(
            "https://github.com/JohnCarl-30",
            "_blank",
            "noopener,noreferrer",
          );
          return pushLines("output", ["Opening GitHub..."]);
        }
        return pushLines("error", [
          `open: unknown target '${args[0] ?? ""}' — try 'open github'`,
        ]);
      case "theme": {
        const theme = args[0]?.toLowerCase() ?? "";
        if (isThemePreference(theme)) {
          onSetTheme(theme);
          return pushLines("output", [`Theme set to ${theme}.`]);
        }
        return pushLines("error", [
          "usage: theme <light|dark|system|midnight>",
        ]);
      }
      case "clear":
        return setLines([]);
      case "exit":
        return onExit();
      case "":
        return;
      default:
        return pushLines("error", [
          `zsh: command not found: ${cmd}. This is a portfolio, not prod. Try 'help'.`,
        ]);
    }
  };

  const handleSubmit = () => {
    const value = input;
    pushLines("input", [value]);
    if (value.trim()) {
      setHistory((current) => [...current, value]);
    }
    setHistoryIndex(null);
    setDraft("");
    setInput("");
    runCommand(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;

      setHistoryIndex((current) => {
        const nextIndex =
          current === null ? history.length - 1 : Math.max(0, current - 1);
        if (current === null) setDraft(input);
        setInput(history[nextIndex]);
        return nextIndex;
      });
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;

      setHistoryIndex((current) => {
        if (current === null) return null;
        const nextIndex = current + 1;
        if (nextIndex >= history.length) {
          setInput(draft);
          return null;
        }
        setInput(history[nextIndex]);
        return nextIndex;
      });
    }
  };

  return (
    <div className="font-mono text-[13px]">
      <div
        ref={scrollRef}
        className="max-h-[46vh] min-h-[240px] overflow-y-auto px-4 py-4"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) =>
          line.kind === "input" ? (
            <p key={line.id} className="whitespace-pre-wrap text-zinc-100">
              <span className="text-emerald-400">{PROMPT}</span> {line.text}
            </p>
          ) : (
            <TypewriterLine
              key={line.id}
              text={line.text}
              className={line.kind === "error" ? "text-red-400" : "text-zinc-300"}
            />
          ),
        )}

        <div className="flex items-center gap-2">
          <span className="shrink-0 text-emerald-400">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal command input"
            className="h-6 flex-1 bg-transparent text-zinc-100 caret-emerald-400 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 text-[11px] text-zinc-400">
        <span>Portfolio shell — nothing here is a real server. Probably.</span>
        <div className="hidden items-center gap-2 md:flex">
          <Kbd className="bg-white/10 text-white/80">↑</Kbd>
          <span>history</span>
          <Kbd className="bg-white/10 text-white/80">Esc</Kbd>
          <span>back</span>
        </div>
      </div>
    </div>
  );
}
