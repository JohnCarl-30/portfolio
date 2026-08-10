"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

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

export default function Identity() {
  const calm = useReducedMotion();
  const role = useDecodedText(profile.role, !calm);

  return (
    <header className="pt-14 pb-10 sm:pt-20">
      <Reveal className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 items-center gap-3.5">
          <span
            aria-hidden="true"
            className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full border border-[var(--line-strong)] bg-[var(--panel-soft)]"
          >
            <Image
              src={profile.photo}
              alt=""
              fill
              sizes="52px"
              priority
              className="object-cover"
            />
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
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[var(--signal)] [animation:pulse-dot_2.4s_ease-in-out_infinite]"
          />
          <span className="meta">{profile.availability}</span>
        </span>
        <span className="meta">{profile.location}</span>
      </Reveal>
    </header>
  );
}
