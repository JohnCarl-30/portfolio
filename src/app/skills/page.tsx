"use client";

import Image from "next/image";

import { skillsData } from "@/app/data/HeroIcons";
import { stack } from "@/app/data/Profile";
import PageHeader from "@/components/home/PageHeader";
import Reveal from "@/components/home/Reveal";

export default function SkillsPage() {
  return (
    <main className="shell flex-1 pb-20">
      <PageHeader
        label="toolkit"
        title="Everything I reach for."
        description="Grouped by where it sits in a build — model layer, interface, service, and the infrastructure underneath."
      />

      <div className="divide-y divide-[var(--line)]">
        {stack.map((group, index) => (
          <Reveal
            key={group.group}
            delay={index * 0.05}
            className="grid grid-cols-1 gap-2 py-3.5 sm:grid-cols-[5rem_1fr] sm:gap-4"
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
        ))}
      </div>

      <Reveal className="pt-10">
        <p className="section-label pb-4">daily drivers</p>

        <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-5 lg:grid-cols-7">
          {skillsData.map((skill) => (
            <li
              key={skill.name}
              className="group/tool flex flex-col items-center gap-2 bg-[var(--panel)] px-2 py-4 transition-colors hover:bg-[var(--panel-soft)]"
            >
              {/* Next/Image mishandles some public SVGs; render those as <img>. */}
              {skill.icon.endsWith(".svg") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={skill.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain opacity-70 transition-opacity group-hover/tool:opacity-100"
                />
              ) : (
                <Image
                  src={skill.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain opacity-70 transition-opacity group-hover/tool:opacity-100"
                />
              )}
              <span className="meta text-center leading-tight">{skill.name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </main>
  );
}
