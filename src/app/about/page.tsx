'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

const AboutPage = () => {
  const stats = [
    { num: '10', label: 'Projects Shipped', suffix: '+' },
    { num: '3', label: 'Years Building', suffix: '+' },
    { num: '2', label: 'Cloud Certifications', suffix: '' },
    { num: '15', label: 'Technologies Used', suffix: '+' },
  ];

  const facts = [
    {
      key: 'education',
      val: 'BS Computer Science — AI Specialization',
      sub: 'Philippine Christian University · Bulacan · Year 3'
    },
    {
      key: 'current role',
      val: 'Software Engineering Intern',
      sub: 'Express.js · actively targeting AI Engineer roles'
    },
    {
      key: 'certifications',
      tags: ['☁️ Oracle GenAI', '🟠 AWS', '🤖 Claude Code']
    },
    {
      key: 'specialization',
      val: 'RAG · Multi-agent · Full Stack AI',
      accent: true
    },
    {
      key: 'building now',
      val: 'PraktikAI — AI OJT journal for Filipino CS/IT students',
      accent: true
    },
    {
      key: 'availability',
      val: 'Open to remote opportunities globally',
      accent: true,
      mono: true
    },
  ];

  const timeline = [
    {
      date: '2024 — Now',
      title: 'AI Engineer path · PraktikAI, LeadPilot, StudyAI',
      desc: 'Vertex AI, Gemini 2.5 Pro, LangGraph multi-agent systems, pgvector RAG pipelines, GCP Cloud Run deployments.'
    },
    {
      date: '2024',
      title: 'Oracle GenAI & AWS Certified',
      desc: 'Validated cloud and AI knowledge formally alongside hands-on project work.'
    },
    {
      date: '2024',
      title: 'Software Engineering Internship',
      desc: 'Express.js backend development in a production environment.'
    },
    {
      date: '2023',
      title: 'First full-stack AI projects',
      desc: 'StudyAI (originally Pinecone, migrated to pgvector), ApplyAI, early PraktikAI. LangChain, LlamaIndex, FastAPI foundations.'
    },
    {
      date: '2022',
      title: 'BS CS starts · Philippine Christian University',
      desc: 'PHP/Laravel, assembly (8086), Android Java, Flask. The beginning of building things that actually run.'
    }
  ];

  const hobbies = [
    { icon: '🎮', name: 'ML / COD' },
    { icon: '🎱', name: 'Billiards' },
    { icon: '🏃', name: 'Running' },
    { icon: '🎵', name: 'Music' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* HERO STRIP */}
        <section className="pt-24 pb-12 border-b border-gray-100 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-[1px] bg-blue-500" />
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-500 font-semibold">about me</p>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              John Carl<br />
              <span className="text-gray-400 italic font-light">Santos.</span>
            </h1>
            <p className="max-w-md text-gray-500 leading-relaxed text-lg">
              <strong className="text-gray-900 font-semibold">Aspiring AI Engineer & Full Stack Developer</strong> based in the Philippines. I build RAG systems, multi-agent pipelines, and full-stack products — mostly for people who don&apos;t have enough tools yet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-3 pb-2"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-100 bg-gray-50/50">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">open to remote roles</span>
            </div>
            <div className="text-[10px] font-mono text-gray-400 border border-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
              📍 Philippines
            </div>
          </motion.div>
        </section>

        {/* PHOTO + QUICK FACTS */}
        <section className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 py-16 border-b border-gray-100">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gray-100 group">
              <Image
                src="/personal.jpg"
                alt="John Carl Santos"
                fill
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg border border-gray-100 text-[10px] font-mono text-gray-500 text-center">
                John Carl Santos · 2024
              </div>
            </div>
            <p className="text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest pt-2">
              CJ · dyeyc · @johncarlsantos
            </p>
          </div>

          <div className="flex flex-col justify-center divide-y divide-gray-100">
            {facts.map((fact, i) => (
              <div key={i} className="grid grid-cols-[120px_1fr] gap-6 py-4 items-start first:pt-0 last:pb-0">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider pt-1">{fact.key}</span>
                <div>
                  <p className={`text-sm ${fact.accent ? 'text-blue-600 font-semibold' : 'text-gray-900'} ${fact.mono ? 'font-mono' : ''}`}>
                    {fact.val}
                  </p>
                  {fact.sub && <p className="text-xs text-gray-400 mt-1">{fact.sub}</p>}
                  {fact.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {fact.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-gray-100 text-gray-500 bg-gray-50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS BAR */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-0 py-12 border-b border-gray-100">
          {stats.map((stat, i) => (
            <div key={i} className="px-6 lg:border-r border-gray-100 last:border-0 first:pl-0 flex flex-col gap-1">
              <div className="text-4xl font-bold tracking-tighter">
                {stat.num}<span className="text-blue-500 ml-0.5">{stat.suffix}</span>
              </div>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.15em]">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* STORY SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-16 py-20 border-b border-gray-100 relative">
          <aside className="hidden lg:block sticky top-24 self-start space-y-8 pt-2">
            <div>
              <p className="text-[10px] font-mono text-gray-300 uppercase tracking-widest mb-4">{/* // sections */}</p>
              <nav className="flex flex-col gap-3">
                {['Origin', 'Approach', 'Journey', 'Outside Code'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-[11px] font-mono text-gray-400 hover:text-blue-500 border-l-2 border-transparent hover:border-blue-500 pl-4 transition-all"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-24">
            {/* Origin */}
            <div id="origin" className="max-w-2xl group">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-mono text-blue-500 border border-blue-100 px-2 py-0.5 rounded">01</span>
                <h2 className="text-2xl font-bold tracking-tight">Why I build what I build</h2>
              </div>
              <div className="space-y-6 text-gray-500 leading-relaxed text-sm">
                <p>
                  I started coding because I wanted to fix problems I saw around me. Filipino CS/IT students spending hours formatting OJT journals by hand. Students cramming with no good digital study tools. <strong className="text-gray-900 font-semibold italic">That&apos;s where PraktikAI and StudyAI came from — not tutorials, not trends.</strong>
                </p>
                <p>
                  There&apos;s something that drives me about building for people who don&apos;t have enough resources. The Philippines has brilliant developers, but the tooling built <em className="text-blue-600">for</em> us, <em className="text-blue-600">by</em> us, is still limited. I want to change that — one shipped product at a time.
                </p>
              </div>
            </div>

            {/* Approach */}
            <div id="approach" className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-mono text-blue-500 border border-blue-100 px-2 py-0.5 rounded">02</span>
                <h2 className="text-2xl font-bold tracking-tight">How I work</h2>
              </div>
              <div className="space-y-6 text-gray-500 leading-relaxed text-sm">
                <p>
                  I learn by shipping. Not by finishing courses or collecting certificates — I mean <strong className="text-gray-900 font-semibold">actually deploying things</strong>, watching them break in production, and fixing them. My StudyAI benchmark work, the RAG retrieval improvements, the SSE streaming optimizations — none of that happened in a classroom.
                </p>
                <p>
                  I care deeply about the full picture: the AI layer, the backend architecture, the DevOps, and the UI. I want to understand <strong className="text-gray-900 font-semibold">why</strong> a system behaves the way it does, not just make it work.
                </p>
              </div>
            </div>

            {/* Journey (Timeline) */}
            <div id="journey" className="max-w-2xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-mono text-blue-500 border border-blue-100 px-2 py-0.5 rounded">03</span>
                <h2 className="text-2xl font-bold tracking-tight">How I got here</h2>
              </div>
              <div className="relative pl-8 border-l border-gray-100 space-y-12">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[37px] top-1 w-[11px] h-[11px] rounded-full bg-white border-2 border-blue-500" />
                    <p className="text-[10px] font-mono text-blue-500 uppercase tracking-wider mb-2">{item.date}</p>
                    <h3 className="text-base font-bold text-gray-900 mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-lg">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Outside Code */}
            <div id="outside-code" className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-mono text-blue-500 border border-blue-100 px-2 py-0.5 rounded">04</span>
                <h2 className="text-2xl font-bold tracking-tight">Outside the terminal</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                I play Mobile Legends and COD when I need to turn my brain off. Billiards and basketball when I need to move. I go to the gym and run — both keep me sharp. I also write music; I have an original song called <strong className="text-blue-600 font-semibold">Superposition</strong>.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hobbies.map((hobby, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 p-6 rounded-xl text-center group hover:border-blue-200 transition-all cursor-default">
                    <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{hobby.icon}</span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{hobby.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="py-24 flex flex-col md:flex-row items-center justify-between gap-12 group">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-4">
              Want to work<br />
              together<span className="text-blue-500 group-hover:italic transition-all">?</span>
            </h2>
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">{/* // open to remote AI & full-stack roles */}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-mono text-[12px] uppercase tracking-wider hover:bg-gray-800 hover:translate-y-[-2px] transition-all text-center"
            >
              Get in touch →
            </Link>
            <Link
              href="/JohnCarl_Resume.pdf"
              className="px-8 py-4 rounded-lg border border-gray-100 font-mono text-[12px] uppercase tracking-wider text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:translate-y-[-2px] transition-all text-center"
            >
              ↓ Resume
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 rounded-lg border border-gray-100 font-mono text-[12px] uppercase tracking-wider text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:translate-y-[-2px] transition-all text-center"
            >
              View Projects
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AboutPage;
