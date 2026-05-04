"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { projectsData } from "@/app/data/Projects";

const placeholderStyles = [
  "from-sky-500/30 via-blue-500/15 to-slate-900/80",
  "from-emerald-500/25 via-cyan-500/15 to-slate-900/80",
  "from-violet-500/25 via-indigo-500/15 to-slate-900/80",
];

const FeaturedProjects = () => {
  const featured = projectsData.slice(0, 3);

  return (
    <section id="featured-projects" className="section-band section-band--mist">
      <div className="page-shell">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-6">
              Work
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">
              Projects.
            </h2>
          </div>

          <Link
            href="/projects"
            className="group hidden items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950 sm:inline-flex dark:text-slate-400 dark:hover:text-white"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <motion.div
          className="mt-14 grid gap-6 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {featured.map((project, index) => {
            const placeholderTone =
              placeholderStyles[index % placeholderStyles.length];

            return (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: "easeOut" },
                  },
                }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-200/60 bg-white/50 transition-all hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="relative aspect-[4/3]">
                    {project.url ? (
                      <Image
                        src={project.url}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-end bg-gradient-to-br ${placeholderTone} p-6 text-white`}
                      >
                        <p className="text-2xl font-semibold tracking-[-0.04em]">
                          {project.name}
                        </p>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                        {project.category}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-4">
                        <p className="text-lg font-semibold tracking-[-0.02em] text-white">
                          {project.name}
                        </p>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
