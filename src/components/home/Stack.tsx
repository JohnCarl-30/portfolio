"use client";

import { useState } from "react";

import { stack } from "@/app/data/Profile";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

/**
 * Grouped tool list. Hovering a group dims the others so a reader can
 * isolate one part of the stack without any clicking.
 */
export default function Stack() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section className="pb-12">
      <SectionHead
        id="toolkit"
        label="toolkit"
        viewAll={{ href: "/skills", label: "all tools" }}
      />

      <div className="divide-y divide-[var(--line)]">
        {stack.map((group, index) => {
          const dimmed = focused !== null && focused !== group.group;

          return (
            <Reveal
              key={group.group}
              delay={index * 0.055}
              onPointerEnter={() => setFocused(group.group)}
              onPointerLeave={() => setFocused(null)}
              className="-mx-3 grid grid-cols-1 gap-2 rounded-lg px-3 py-3 hover:bg-[var(--hover)] sm:grid-cols-[5rem_1fr] sm:gap-4"
              style={{
                opacity: dimmed ? 0.38 : undefined,
                transitionProperty: "opacity, transform, filter, background-color",
              }}
            >
              <span className="meta pt-1">{group.group}</span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
