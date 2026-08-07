import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  UserCircle,
} from "lucide-react";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.name,
    description: project.desc,
    openGraph: {
      title: `${project.name} | John Carl Santos`,
      description: project.desc,
      images: project.url ? [{ url: project.url, alt: project.name }] : [],
    },
  };
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
    <div className="flex min-h-screen flex-col pt-6 pb-20">
      <main className="page-shell mt-4 flex-1">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
                  sizes="(min-width: 1024px) 52vw, 100vw"
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
            <h1 className="text-4xl font-semibold tracking-[-0.06em] text-foreground md:text-5xl">
              {project.name}
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed soft-text">
              {project.longDescription.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="mt-8 rounded-2xl border border-border/70 bg-card/60 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Build highlights
                </p>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground"
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
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md"
                >
                  Live demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-6 py-3 text-sm font-medium text-muted-foreground">
                  Live demo coming soon
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-8">
            <div className="glass-panel rounded-[1.75rem] p-6">
              <h2 className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                Project details
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-accent p-3 text-accent-foreground">
                    <UserCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/70">
                      Role
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {project.role || "Developer"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-accent p-3 text-accent-foreground">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/70">
                      Timeline
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
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
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
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
                      <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
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
                className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
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
