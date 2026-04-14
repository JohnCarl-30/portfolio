"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

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
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900 dark:bg-zinc-950 dark:text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* HERO STRIP */}
        <section className="grid grid-cols-1 items-end gap-8 border-b border-gray-100 pt-24 pb-12 dark:border-white/10 md:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-[1px] bg-blue-500" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold">
                More about me
              </p>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              John Carl
              <br />
              <span className="italic font-light text-gray-400 dark:text-gray-500">Santos.</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-gray-500 dark:text-gray-300">
              <strong className="font-semibold text-gray-900 dark:text-white">
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
            <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50/50 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                open to remote roles
              </span>
            </div>
            <div className="rounded-full border border-gray-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:border-white/10 dark:text-gray-400">
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
          className="grid grid-cols-1 gap-12 border-b border-gray-100 py-16 dark:border-white/10 md:grid-cols-[320px_1fr]"
        >
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gray-100 group">
              <Image
                src="/personal.jpg"
                alt="John Carl Santos"
                fill
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg border border-gray-100 text-[10px] text-gray-500 text-center font-semibold">
                John Carl Santos · 2024
              </div>
            </div>
            <p className="pt-2 text-center text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              CJ · dyeyc · @johncarlsantos
            </p>
          </div>

          <div className="flex flex-col justify-center divide-y divide-gray-100 dark:divide-white/10">
            {facts.map((fact, i) => (
              <div
                key={i}
                className="grid grid-cols-[120px_1fr] gap-6 py-4 items-start first:pt-0 last:pb-0"
              >
                <span className="pt-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {fact.key}
                </span>
                <div>
                  <p
                    className={`text-sm ${fact.accent ? "font-semibold text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"}`}
                  >
                    {fact.val}
                  </p>
                  {fact.sub && (
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{fact.sub}</p>
                  )}
                  {fact.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {fact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
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
        <section className="relative grid grid-cols-1 gap-16 border-b border-gray-100 py-20 dark:border-white/10 lg:grid-cols-[200px_1fr]">
          <aside className="hidden lg:block sticky top-24 self-start space-y-8 pt-2">
            <div>
              <p className="text-[10px] text-gray-300 uppercase tracking-widest mb-4 font-bold">
                {/* // sections */}
              </p>
              <nav className="flex flex-col gap-3">
                {["Origin", "Approach", "Journey", "Outside Code"].map(
                  (link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace(" ", "-")}`}
                      className="text-[11px] text-gray-400 hover:text-blue-500 border-l-2 border-transparent hover:border-blue-500 pl-4 transition-all font-semibold"
                    >
                      {link}
                    </a>
                  ),
                )}
              </nav>
            </div>
          </aside>

          <div className="space-y-24">
            {/* Origin */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id="origin"
              className="max-w-2xl group"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-mono text-blue-500 border border-blue-100 px-2 py-0.5 rounded">
                  01
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  Why I build what I build
                </h2>
              </div>
              <div className="space-y-6 text-gray-500 leading-relaxed text-sm">
                <p>
                  I started coding because I wanted to fix problems I saw around
                  me. Filipino CS/IT students spending hours formatting OJT
                  journals by hand. Students cramming with no good digital study
                  tools.{" "}
                  <strong className="text-gray-900 font-semibold italic">
                    That&apos;s where PraktikAI and StudyAI came from — not
                    tutorials, not trends.
                  </strong>
                </p>
                <p>
                  There&apos;s something that drives me about building for
                  people who don&apos;t have enough resources. The Philippines
                  has brilliant developers, but the tooling built{" "}
                  <em className="text-blue-600">for</em> us,{" "}
                  <em className="text-blue-600">by</em> us, is still limited. I
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
                <span className="text-[10px] font-mono text-blue-500 border border-blue-100 px-2 py-0.5 rounded">
                  02
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  How I work
                </h2>
              </div>
              <div className="space-y-6 text-gray-500 leading-relaxed text-sm">
                <p>
                  I learn by shipping. Not by finishing courses or collecting
                  certificates — I mean{" "}
                  <strong className="text-gray-900 font-semibold">
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
                  <strong className="text-gray-900 font-semibold">why</strong> a
                  system behaves the way it does, not just make it work.
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
                <span className="text-[10px] text-blue-500 border border-blue-100 px-2 py-0.5 rounded font-bold">
                  03
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  How I got here
                </h2>
              </div>
              <div className="relative pl-8 border-l border-gray-100 space-y-12">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[37px] top-1 w-[11px] h-[11px] rounded-full bg-white border-2 border-blue-500" />
                    <p className="text-[10px] text-blue-500 uppercase tracking-wider mb-2 font-bold">
                      {item.date}
                    </p>
                    <h3 className="text-base font-bold text-gray-900 mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
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
                <span className="text-[10px] font-mono text-blue-500 border border-blue-100 px-2 py-0.5 rounded">
                  04
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  Outside the terminal
                </h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                I play Mobile Legends and COD when I need to turn my brain off.
                Billiards and basketball when I need to move. I go to the gym
                and run.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hobbies.map((hobby, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-100 p-6 rounded-xl text-center group hover:border-blue-200 transition-all cursor-default"
                  >
                    <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">
                      {hobby.icon}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
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
