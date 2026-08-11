"use client";

import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import LifeGrid from "./LifeGrid";

export default function Playground() {
  return (
    <section className="pb-20">
      <SectionHead id="sandbox" label="sandbox" num="08" />

      <Reveal>
        <p className="row-desc mb-4 max-w-[44rem]">
          The page background is an 18px dot lattice. This panel runs Conway&apos;s
          Life on the same lattice — drag across it to seed cells and watch what
          survives.
        </p>

        <LifeGrid />
      </Reveal>
    </section>
  );
}
