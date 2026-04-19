import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  UserCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import { projectsData } from "@/app/data/Projects";

const placeholderStyles = [
  "from-sky-500/30 via-blue-500/15 to-slate-900/80",
  "from-emerald-500/25 via-cyan-500/15 to-slate-900/80",
  "from-violet-500/25 via-indigo-500/15 to-slate-900/80",
];

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectIndex = projectsData.findIndex((project) => project.id === id);
  const project = projectsData[projectIndex];

  if (!project) {
    notFound();
  }

  const placeholderTone =
    placeholderStyles[
      (projectIndex >= 0 ? projectIndex : 0) % placeholderStyles.length
    ];

  return (
    <div className="flex min-h-screen flex-col pt-24 pb-20">
      <div className="fixed left-0 right-0 top-0 z-50">
        <Navbar />
      </div>

      <main className="page-shell mt-4 flex-1">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <section className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:items-center">
          <div className="glass-panel overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[4/3]">
              {project.url ? (
                <Image
                  src={project.url}
                  alt={project.name}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div
                  className={`flex h-full w-full flex-col justify-between bg-gradient-to-br ${placeholderTone} p-8 text-white`}
                >
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                    <span>{project.category}</span>
                    <span>{project.timeline}</span>
                  </div>
                  <div>
                    <p className="text-4xl font-semibold tracking-[-0.06em]">
                      {project.name}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                      {project.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="section-kicker">
              <span className="section-rule" />
              {project.category}
            </div>
            <h1 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 dark:text-white md:text-5xl">
              {project.name}
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed soft-text">
              {project.longDescription.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200/80 bg-white/75 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8">
              {project.liveDemoUrl ? (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                >
                  Live demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 px-6 py-3 text-sm font-medium text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  Live demo coming soon
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-8">
            <div className="glass-panel rounded-[1.75rem] p-6">
              <h2 className="text-xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">
                Project details
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-slate-950/5 p-3 text-slate-600 dark:bg-white/10 dark:text-slate-200">
                    <UserCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                      Role
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                      {project.role || "Developer"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-slate-950/5 p-3 text-slate-600 dark:bg-white/10 dark:text-slate-200">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                      Timeline
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                      {project.timeline || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="section-kicker">
              <span className="section-rule" />
              Key features
            </div>

            {project.keyFeatures.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {project.keyFeatures.map((feature, index) => (
                  <article
                    key={feature.title}
                    className="glass-panel overflow-hidden rounded-[1.5rem]"
                  >
                    <div className="relative aspect-[4/3]">
                      {feature.image ? (
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className={`flex h-full w-full items-end bg-gradient-to-br ${
                            placeholderStyles[index % placeholderStyles.length]
                          } p-5 text-white`}
                        >
                          <p className="text-2xl font-semibold tracking-[-0.05em]">
                            {feature.title}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed soft-text">
                        {feature.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="glass-panel rounded-[1.75rem] px-6 py-10 text-center">
                <p className="text-sm soft-text">
                  Key features details are coming soon.
                </p>
              </div>
            )}

            <div className="mt-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 transition-colors hover:text-primary dark:text-slate-100 dark:hover:text-primary"
              >
                Explore more projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
