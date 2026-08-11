"use client";

import Reveal from "./Reveal";
import { GlossaryParagraph, GlossaryTerm } from "./HoverPreview";
import { introGlossary } from "@/app/data/Profile";

export default function Intro() {
  return (
    <Reveal as="section" className="max-w-[46rem] space-y-3.5 pb-16">
      <h2 className="pb-3 text-[clamp(1.6rem,4.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[var(--ink)]">
        I build it, ship it.
      </h2>

      <GlossaryParagraph className="text-[0.95rem] leading-[1.65] text-[var(--muted-ink)]">
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

      <GlossaryParagraph className="text-[0.95rem] leading-[1.65] text-[var(--muted-ink)]">
        Right now I&apos;m an AI Engineer at SOFI AI Tech Solutions, working on
        training data and{" "}
        <GlossaryTerm {...introGlossary["LLM evaluation"]}>
          LLM evaluation
        </GlossaryTerm>
        , while finishing computer science at Philippine Christian University as
        a consistent Dean&apos;s Lister.
      </GlossaryParagraph>

      <GlossaryParagraph className="text-[0.95rem] leading-[1.65] text-[var(--muted-ink)]">
        Along the way I led Sociatech, a social learning platform, shipped
        smaller tools end to end, and earned AI certifications from Oracle,
        AWS, and MongoDB.
      </GlossaryParagraph>
    </Reveal>
  );
}
