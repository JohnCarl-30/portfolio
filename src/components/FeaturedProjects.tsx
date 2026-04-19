"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { projectsData } from "@/app/data/Projects";
import Heading from "./sub/Heading";

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
        <div className="grid gap-8 md:grid-cols-[0.9fr_auto] md:items-end">
          <div className="md:pl-6">
            <div className="section-kicker">
              <span className="section-rule" />
              Work
            </div>
            <Heading text="Projects." />
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 self-start text-sm font-medium text-primary transition-transform hover:translate-x-1"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          className="mt-14 grid gap-6 md:pl-6 lg:grid-cols-3"
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
                  className="group block overflow-hidden rounded-[1.85rem] border border-slate-200/80 bg-white/60 shadow-[0_28px_90px_-42px_rgba(15,23,42,0.34)] transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="relative aspect-[4/5]">
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
                        <p className="text-3xl font-semibold tracking-[-0.05em]">
                          {project.name}
                        </p>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/82 via-slate-950/18 to-transparent p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                        {project.category} • {project.timeline}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-4">
                        <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                          {project.name}
                        </p>
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform group-hover:translate-x-1">
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
