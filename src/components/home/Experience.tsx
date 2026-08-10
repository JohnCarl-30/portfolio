"use client";

import { experience } from "@/app/data/Profile";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section className="pb-12">
      <SectionHead id="work" label="work" />

      <ol className="divide-y divide-[var(--line)]">
        {experience.map((item, index) => (
          <Reveal
            key={item.id}
            as="li"
            delay={index * 0.055}
            className="group/row -mx-3 rounded-lg px-3 py-3 transition-colors hover:bg-[var(--hover)]"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="row-title">
                {item.role}{" "}
                <span className="font-normal text-[var(--muted-ink)]">
                  @ {item.org}
                </span>
              </h3>
              <span className="meta shrink-0">{item.period}</span>
            </div>
            <p className="row-desc mt-1 max-w-[44rem]">{item.summary}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
