"use client";

import Reveal from "./Reveal";
import { GlossaryParagraph, GlossaryTerm } from "./HoverPreview";
import { introGlossary } from "@/app/data/Profile";

export default function Intro() {
  return (
    <Reveal as="section" className="max-w-[46rem] space-y-3.5 pb-16">
      <h2 className="pb-3 text-[clamp(1.6rem,4.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[var(--ink)]">
        I build it, ship it,
        <br />
        and make it hold up after the demo.
      </h2>

      <GlossaryParagraph className="text-[0.95rem] leading-[1.65] text-[var(--muted-ink)]">
        I build{" "}
        <GlossaryTerm {...introGlossary["full-stack products"]}>
          full-stack products
        </GlossaryTerm>{" "}
        with an AI layer that has to hold up outside the demo —{" "}
        <GlossaryTerm {...introGlossary["RAG pipelines"]}>
          RAG pipelines
        </GlossaryTerm>
        , backend systems, and the interfaces on top of them.
      </GlossaryParagraph>

      <GlossaryParagraph className="text-[0.95rem] leading-[1.65] text-[var(--muted-ink)]">
        Currently an AI Engineer at SOFI AI Tech Solutions, working on training
        data, annotation standards, and{" "}
        <GlossaryTerm {...introGlossary["LLM evaluation"]}>
          LLM evaluation
        </GlossaryTerm>
        , while finishing a CS degree at Philippine Christian University.
      </GlossaryParagraph>

      <GlossaryParagraph className="text-[0.95rem] leading-[1.65] text-[var(--muted-ink)]">
        Most of that work shows up as small bets — study tools, resume tooling,
        civic apps — shipped end to end and measured after launch.
      </GlossaryParagraph>
    </Reveal>
  );
}
