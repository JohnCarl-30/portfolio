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
            <p className="section-eyebrow">Work</p>
            <h2 className="section-title">Projects.</h2>
          </div>

          <Link
            href="/projects"
            className="focus-ring group hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
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
                    transition: { duration: 0.35, ease: "easeOut" },
                  },
                }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="card-surface focus-ring group block overflow-hidden rounded-2xl transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="relative aspect-[4/3]">
                    {project.url ? (
                      <Image
                        src={project.url}
                        alt={project.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent p-5 pt-16">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                        {project.category}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-4">
                        <p className="text-lg font-semibold tracking-[-0.02em] text-white">
                          {project.name}
                        </p>
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>

                      <div className="reveal-on-hover">
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/70">
                          {project.desc}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
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
            className="focus-ring group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
