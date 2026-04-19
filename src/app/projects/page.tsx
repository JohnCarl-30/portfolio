'use client'

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import { projectsButton, projectsData } from "@/app/data/Projects";

const placeholderStyles = [
  "from-sky-500/30 via-blue-500/15 to-slate-900/80",
  "from-emerald-500/25 via-cyan-500/15 to-slate-900/80",
  "from-violet-500/25 via-indigo-500/15 to-slate-900/80",
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const normalizedQuery = searchQuery.toLowerCase();
      const matchesSearch =
        project.name.toLowerCase().includes(normalizedQuery) ||
        project.desc.toLowerCase().includes(normalizedQuery);
      const matchesTab = activeTab === "All" || project.category === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col pt-24 pb-16">
      <div className="fixed left-0 right-0 top-0 z-50">
        <Navbar />
      </div>

      <main className="page-shell mt-4 flex flex-1 flex-col">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <Link
              href="/#featured-projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mt-6">
              <div className="section-kicker">
                <span className="section-rule" />
                Projects
              </div>
              <h1 className="text-5xl font-semibold tracking-[-0.06em] text-slate-950 dark:text-white md:text-6xl">
                Selected builds across AI, fintech, and product design.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed soft-text">
                Explore the portfolio by category or search for a project by
                name. Each one balances interface decisions with the system
                underneath it.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 md:p-7">
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  Search projects
                </span>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    className="block h-12 w-full rounded-full border border-slate-200/80 bg-white/75 py-3 pl-11 pr-4 text-sm text-slate-900 shadow-none outline-none transition-all placeholder:text-slate-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Search by name or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </label>

              <div className="flex flex-wrap gap-2">
                {projectsButton.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                        : "border border-slate-200/80 bg-white/75 text-slate-600 hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-primary/40 dark:hover:text-primary"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const placeholderTone =
                placeholderStyles[index % placeholderStyles.length];

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.22 }}
                  className="glass-panel group overflow-hidden rounded-[1.75rem]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {project.url ? (
                      <Image
                        src={project.url}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full flex-col justify-between bg-gradient-to-br ${placeholderTone} p-6 text-white`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                          <span>{project.category}</span>
                          <span>{project.timeline}</span>
                        </div>
                        <div>
                          <p className="text-3xl font-semibold tracking-[-0.05em]">
                            {project.name}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-white/80">
                            {project.desc}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/75">
                      <span>{project.category}</span>
                      <span className="h-px w-6 bg-primary/40" />
                      <span>{project.timeline}</span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">
                      {project.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed soft-text">
                      {project.desc}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200/80 bg-white/75 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="rounded-full border border-slate-200/80 bg-white/75 px-3 py-1.5 text-xs font-medium text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 text-slate-800 transition-colors hover:text-primary dark:text-slate-100 dark:hover:text-primary"
                      >
                        View project
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                        >
                          Live demo
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="glass-panel col-span-full rounded-[1.75rem] px-6 py-16 text-center">
              <p className="text-lg font-medium text-slate-800 dark:text-slate-100">
                No projects match your search yet.
              </p>
              <p className="mt-2 text-sm soft-text">
                Try a different keyword or switch the category filter.
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
