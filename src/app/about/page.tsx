"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutPage = () => {
  const facts = [
    {
      key: "education",
      val: "BS Computer Science — AI Specialization",
      sub: "Philippine Christian University · Bulacan · Year 3",
    },
    {
      key: "current role",
      val: "Software Engineering Intern",
      sub: "Express.js · actively targeting AI Engineer roles",
    },
    {
      key: "certifications",
      tags: ["☁️ Oracle GenAI", "🟠 AWS", "🤖 Claude Code"],
    },
    {
      key: "specialization",
      val: "RAG · Full Stack AI",
      accent: true,
    },
    {
      key: "availability",
      val: "Open to remote opportunities globally",
      accent: true,
    },
  ];

  const timeline = [
    {
      date: "2026",
      title: "Software Engineering Internship",
      desc: "Express.js backend development in a production environment.",
    },
    {
      date: "2023",
      title: "BS CS starts · Philippine Christian University",
      desc: "First line of code using Java",
    },
  ];

  const hobbies = [
    { icon: "🎮", name: "ML / COD" },
    { icon: "🎱", name: "Billiards" },
    { icon: "🏃", name: "Running" },
    { icon: "🎵", name: "Music" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="page-shell max-w-5xl">
        {/* HERO STRIP */}
        <section className="grid grid-cols-1 items-end gap-8 border-b border-slate-200 pt-24 pb-12 dark:border-white/10 md:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-6">
              More about me
            </p>
            <h1 className="text-6xl font-semibold tracking-[-0.06em] leading-[0.9] mb-8 md:text-8xl">
              John Carl
              <br />
              <span className="font-serif text-primary italic">Santos.</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              <strong className="font-semibold text-slate-950 dark:text-white">
                Aspiring Software Engineer and AI enthusiast
              </strong>{" "}
              based in the Philippines. Currently exploring{" "}
              <span className="whitespace-nowrap">tech stack</span> (Python,
              TypeScript, and learning Rust).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-start gap-3 pb-2 md:items-end"
          >
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/50 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                open to remote roles
              </span>
            </div>
            <div className="rounded-full border border-slate-200 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:border-white/10 dark:text-slate-400">
              📍 Philippines
            </div>
          </motion.div>
        </section>

        {/* PHOTO + QUICK FACTS */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-12 border-b border-slate-200 py-16 dark:border-white/10 md:grid-cols-[320px_1fr]"
        >
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200/60 group dark:border-white/10">
              <Image
                src="/img/pic2.jpeg"
                alt="John Carl Santos"
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-100 text-[10px] text-slate-500 text-center font-semibold dark:bg-black/80 dark:border-white/10 dark:text-slate-300">
                John Carl Santos · 2024
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center divide-y divide-slate-100 dark:divide-white/10">
            {facts.map((fact, i) => (
              <div
                key={i}
                className="grid grid-cols-[120px_1fr] gap-6 py-4 items-start first:pt-0 last:pb-0"
              >
                <span className="pt-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {fact.key}
                </span>
                <div>
                  <p
                    className={`text-sm ${fact.accent ? "font-semibold text-primary" : "text-slate-950 dark:text-white"}`}
                  >
                    {fact.val}
                  </p>
                  {fact.sub && (
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{fact.sub}</p>
                  )}
                  {fact.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {fact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* STORY SECTION */}
        <section className="relative grid grid-cols-1 gap-16 border-b border-slate-200 py-20 dark:border-white/10 lg:grid-cols-[200px_1fr]">
          <aside className="hidden lg:block sticky top-24 self-start space-y-8 pt-2">
            <nav className="flex flex-col gap-3">
              {["Origin", "Approach", "Journey", "Outside Code"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="font-mono text-[11px] text-slate-400 hover:text-primary border-l-2 border-transparent hover:border-primary pl-4 transition-all font-semibold"
                  >
                    {link}
                  </a>
                ),
              )}
            </nav>
          </aside>

          <div className="space-y-24">
            {/* Origin */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id="origin"
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] text-primary border border-primary/20 px-2 py-0.5 rounded">
                  01
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  Why I build what I build
                </h2>
              </div>
              <div className="space-y-6 text-slate-500 leading-relaxed text-sm dark:text-slate-400">
                <p>
                  I started coding because I wanted to fix problems I saw around
                  me. Filipino CS/IT students spending hours formatting OJT
                  journals by hand. Students cramming with no good digital study
                  tools.{" "}
                  <strong className="text-slate-950 font-semibold italic dark:text-white">
                    That&apos;s where PraktikAI and StudyAI came from — not
                    tutorials, not trends.
                  </strong>
                </p>
                <p>
                  There&apos;s something that drives me about building for
                  people who don&apos;t have enough resources. The Philippines
                  has brilliant developers, but the tooling built{" "}
                  <em className="text-primary">for</em> us,{" "}
                  <em className="text-primary">by</em> us, is still limited. I
                  want to change that — one shipped product at a time.
                </p>
              </div>
            </motion.div>

            {/* Approach */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id="approach"
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] text-primary border border-primary/20 px-2 py-0.5 rounded">
                  02
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  How I work
                </h2>
              </div>
              <div className="space-y-6 text-slate-500 leading-relaxed text-sm dark:text-slate-400">
                <p>
                  I learn by shipping. Not by finishing courses or collecting
                  certificates — I mean{" "}
                  <strong className="text-slate-950 font-semibold dark:text-white">
                    actually deploying things
                  </strong>
                  , watching them break in production, and fixing them. My
                  StudyAI benchmark work, the RAG retrieval improvements, the
                  SSE streaming optimizations — none of that happened in a
                  classroom.
                </p>
                <p>
                  I care deeply about the full picture: the AI layer, the
                  backend architecture, the DevOps, and the UI. I want to
                  understand{" "}
                  <strong className="text-slate-950 font-semibold dark:text-white">why</strong>{" "}
                  a system behaves the way it does, not just make it work.
                </p>
              </div>
            </motion.div>

            {/* Journey (Timeline) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id="journey"
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[10px] text-primary border border-primary/20 px-2 py-0.5 rounded font-bold">
                  03
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  How I got here
                </h2>
              </div>
              <div className="relative pl-8 border-l border-slate-100 space-y-12 dark:border-white/10">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[37px] top-1 w-[11px] h-[11px] rounded-full bg-background border-2 border-primary" />
                    <p className="font-mono text-[10px] text-primary uppercase tracking-wider mb-2 font-bold">
                      {item.date}
                    </p>
                    <h3 className="text-base font-bold text-slate-950 mb-2 tracking-tight dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-lg dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Outside Code */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id="outside-code"
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] text-primary border border-primary/20 px-2 py-0.5 rounded">
                  04
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  Outside the terminal
                </h2>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-8 dark:text-slate-400">
                I play Mobile Legends and COD when I need to turn my brain off.
                Billiards and basketball when I need to move. I go to the gym
                and run.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hobbies.map((hobby, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-100 p-6 rounded-xl text-center group hover:border-primary/30 transition-all cursor-default dark:bg-white/5 dark:border-white/10"
                  >
                    <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">
                      {hobby.icon}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold dark:text-slate-500">
                      {hobby.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
