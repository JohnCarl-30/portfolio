"use client";

import type { CSSProperties } from "react";

import Reveal from "./Reveal";
import { GlossaryParagraph, GlossaryTerm } from "./HoverPreview";
import { introGlossary } from "@/app/data/Profile";

/** The hero statement, word by word. `serif` words switch to the italic
 *  accent voice. */
const HERO_WORDS: { text: string; serif?: boolean }[] = [
  { text: "I" },
  { text: "build" },
  { text: "it," },
  { text: "ship", serif: true },
  { text: "it." },
];

export default function Intro() {
  return (
    <Reveal as="section" className="max-w-[46rem] space-y-3.5 pb-16">
      <h2 className="pb-3 text-[clamp(1.6rem,4.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[var(--ink)]">
        {HERO_WORDS.map((word, index) => (
          <span key={`${word.text}-${index}`}>
            <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
              <span
                className={`word-rise inline-block ${
                  word.serif ? "font-serif-accent pr-[0.04em]" : ""
                }`}
                style={
                  {
                    "--word-delay": `${Math.round((0.15 + index * 0.08) * 1000)}ms`,
                  } as CSSProperties
                }
              >
                {word.text}
              </span>
            </span>
            {index < HERO_WORDS.length - 1 ? " " : null}
          </span>
        ))}
      </h2>

      <GlossaryParagraph className="max-w-[68ch] text-[0.95rem] leading-[1.65] text-[var(--muted-ink)]">
        I build{" "}
        <GlossaryTerm {...introGlossary["full-stack products"]}>
          full-stack products
        </GlossaryTerm>{" "}
        with AI inside —{" "}
        <GlossaryTerm {...introGlossary["RAG pipelines"]}>
          RAG pipelines
        </GlossaryTerm>
        , the backends behind them, and the interfaces on top.
      </GlossaryParagraph>

      <GlossaryParagraph className="max-w-[68ch] text-[0.95rem] leading-[1.65] text-[var(--muted-ink)]">
        Right now I&apos;m an AI Engineer at SOFI AI Tech Solutions, working on
        training data and{" "}
        <GlossaryTerm {...introGlossary["LLM evaluation"]}>
          LLM evaluation
        </GlossaryTerm>
        , while finishing computer science at Philippine Christian University as
        a consistent Dean&apos;s Lister.
      </GlossaryParagraph>
    </Reveal>
  );
}
