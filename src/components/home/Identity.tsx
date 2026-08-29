"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import Reveal from "./Reveal";
import { profile } from "@/app/data/Profile";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/\\<>*#";

/**
 * Decodes the role text one character at a time on mount. Short enough to
 * finish before it reads as a gimmick, and skipped entirely for calm users.
 */
function useDecodedText(text: string, enabled: boolean) {
  const [output, setOutput] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setOutput(text);
      return;
    }

    let settled = 0;
    const interval = window.setInterval(() => {
      settled += 1;
      if (settled > text.length) {
        setOutput(text);
        window.clearInterval(interval);
        return;
      }

      const scrambled = text
        .slice(settled)
        .split("")
        .map((char) =>
          char === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        )
        .join("");

      setOutput(text.slice(0, settled) + scrambled);
    }, 42);

    return () => window.clearInterval(interval);
  }, [text, enabled]);

  return output;
}

function useGreeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 5
        ? "up late?"
        : hour < 12
          ? "good morning"
          : hour < 18
            ? "good afternoon"
            : "good evening",
    );
  }, []);

  return greeting;
}

export default function Identity() {
  const calm = useReducedMotion();
  const role = useDecodedText(profile.role, !calm);
  const [waving, setWaving] = useState(false);
  const greeting = useGreeting();

  return (
    <header className="pt-14 pb-10 sm:pt-20">
      <p
        className={`meta mb-3 h-[1.1rem] transition-opacity duration-500 ${
          greeting ? "opacity-100" : "opacity-0"
        }`}
      >
        {greeting ? `${greeting}, you found me.` : " "}
      </p>

      <Reveal className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 items-center gap-3.5">
          <span
            className="relative shrink-0"
            onMouseEnter={() => setWaving(true)}
            onMouseLeave={() => setWaving(false)}
          >
            <AnimatePresence>
              {waving && (
                <motion.span
                  key="wave"
                  initial={{ opacity: 0, y: 6, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 text-[0.8rem] font-semibold text-[var(--ink)] shadow-[var(--shadow-soft)]"
                >
                  hi there{" "}
                  <span className="inline-block origin-[70%_70%] [animation:wave-hand_0.9s_ease-in-out_infinite]">
                    👋
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-[var(--line)] bg-[var(--panel)]"
                  />
                </motion.span>
              )}
            </AnimatePresence>

            <span
              aria-hidden="true"
              className="relative block h-[104px] w-[96px] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel-soft)] transition-transform duration-200 hover:scale-[1.03]"
            >
              <Image
                src={profile.photo}
                alt=""
                fill
                sizes="96px"
                priority
                className="object-cover object-top"
              />
            </span>
          </span>

          <div className="min-w-0">
            <h1 className="text-[1.05rem] font-bold leading-tight text-[var(--ink)]">
              {profile.name}
            </h1>
            <p className="mt-0.5 font-mono text-[0.8rem] text-[var(--muted-ink)]">
              {role}
            </p>
          </div>
        </div>

        <Link
          href={profile.resumeHref}
          target="_blank"
          className="group/cv focus-ring mt-1 inline-flex shrink-0 items-center gap-1 text-[0.8rem] text-[var(--dim)] transition-colors hover:text-[var(--ink)]"
        >
          resume
          <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/cv:translate-x-px group-hover/cv:-translate-y-px" />
        </Link>
      </Reveal>

      <Reveal
        delay={0.12}
        className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2"
      >
        <span className="meta">{profile.availability}</span>
        <span className="meta">{profile.location}</span>
      </Reveal>
    </header>
  );
}
