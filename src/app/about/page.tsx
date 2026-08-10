"use client";

import Image from "next/image";

import { experience, profile } from "@/app/data/Profile";
import PageHeader from "@/components/home/PageHeader";
import Reveal from "@/components/home/Reveal";

const facts: { key: string; value: string; sub?: string }[] = [
  {
    key: "education",
    value: "BS Computer Science",
    sub: "Philippine Christian University · expected 2027 · Dean's Lister, 1.15 GWA",
  },
  {
    key: "current",
    value: "AI Engineer at SOFI AI Tech Solutions",
    sub: "Training data, annotation standards, and model evaluation",
  },
  {
    key: "focus",
    value: "RAG pipelines · LLM evaluation · full-stack AI",
  },
  {
    key: "languages",
    value: "Python, TypeScript — currently learning Go",
  },
  {
    key: "availability",
    value: profile.availability,
    sub: profile.location,
  },
];

const chapters = [
  {
    number: "01",
    title: "Why I build what I build",
    paragraphs: [
      "I build practical systems around problems people actually hit. StudyAI turns documents into study material, Resumae helps job seekers tailor a resume to a specific role, and CiviReport gives residents a direct way to file and track barangay complaints.",
      "Across all of them I own the full path — data and AI pipelines, APIs, infrastructure, and the interface. Each system should solve one clear problem and stay reliable well past the demo.",
    ],
  },
  {
    number: "02",
    title: "How I work",
    paragraphs: [
      "I learn by shipping and measuring. StudyAI pushed me to benchmark retrieval latency and document throughput. Resumae grew into a tested monorepo with production deployments. CiviReport taught me to connect real-time updates, secure authentication, and a mobile client.",
      "I want to understand why a system behaves the way it does, not just make it work. That usually means building the evaluation harness before tuning the prompt.",
    ],
  },
];

const hobbies = ["Mobile Legends / COD", "Billiards", "Running", "Music"];

export default function AboutPage() {
  return (
    <main className="shell flex-1 pb-20">
      <PageHeader
        label="about"
        title="AI engineer and computer science student, based in the Philippines."
        description="I work across Python and TypeScript, mostly on systems where a model is one dependency among many."
      />

      <Reveal className="grid grid-cols-1 gap-8 border-t border-[var(--line)] pt-8 sm:grid-cols-[13rem_1fr]">
        <div className="relative aspect-[3/4] w-full max-w-[13rem] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel-soft)]">
          <Image
            src={profile.photo}
            alt={`${profile.name} portrait`}
            fill
            sizes="208px"
            className="object-cover grayscale-[25%] transition-all duration-500 hover:grayscale-0"
          />
        </div>

        <dl className="divide-y divide-[var(--line)]">
          {facts.map((fact) => (
            <div
              key={fact.key}
              className="grid grid-cols-1 gap-1 py-3 first:pt-0 sm:grid-cols-[6rem_1fr] sm:gap-4"
            >
              <dt className="meta pt-0.5">{fact.key}</dt>
              <dd>
                <p className="row-title font-semibold">{fact.value}</p>
                {fact.sub ? (
                  <p className="row-desc mt-0.5 text-[0.8rem]">{fact.sub}</p>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-14 space-y-12">
        {chapters.map((chapter, index) => (
          <Reveal key={chapter.number} delay={index * 0.05} className="max-w-[44rem]">
            <div className="flex items-baseline gap-3">
              <span className="meta">{chapter.number}</span>
              <h2 className="text-[1.05rem] font-bold tracking-[-0.02em]">
                {chapter.title}
              </h2>
            </div>

            <div className="mt-3 space-y-3">
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="row-desc">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal className="max-w-[44rem]">
          <div className="flex items-baseline gap-3">
            <span className="meta">03</span>
            <h2 className="text-[1.05rem] font-bold tracking-[-0.02em]">
              How I got here
            </h2>
          </div>

          <ol className="mt-3 divide-y divide-[var(--line)]">
            {experience.map((item) => (
              <li key={item.id} className="py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="row-title">
                    {item.role}{" "}
                    <span className="font-normal text-[var(--muted-ink)]">
                      @ {item.org}
                    </span>
                  </h3>
                  <span className="meta shrink-0">{item.period}</span>
                </div>
                <p className="row-desc mt-1">{item.summary}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="max-w-[44rem]">
          <div className="flex items-baseline gap-3">
            <span className="meta">04</span>
            <h2 className="text-[1.05rem] font-bold tracking-[-0.02em]">
              Outside the terminal
            </h2>
          </div>

          <p className="row-desc mt-3">
            Mobile Legends and COD when I need to switch off. Billiards and
            basketball when I need to move. Gym and running otherwise.
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {hobbies.map((hobby) => (
              <span key={hobby} className="chip">
                {hobby}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
