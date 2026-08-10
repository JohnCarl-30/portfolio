import Image from "next/image";
import Link from "@/components/providers/RouteTransition";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { projectsData } from "@/app/data/Projects";

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
  const project = projectsData.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const facts = [
    { key: "role", value: project.role || "Developer" },
    { key: "timeline", value: project.timeline || "—" },
    { key: "category", value: project.category.toLowerCase() },
  ];

  return (
    <main className="shell flex-1 pb-20 pt-10">
      <Link
        href="/projects"
        className="group/back focus-ring inline-flex items-center gap-1.5 text-[0.78rem] text-[var(--dim)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover/back:-translate-x-0.5" />
        all projects
      </Link>

      <article className="mt-8">
        <header className="max-w-[42rem] border-b border-[var(--line)] pb-7">
          <h1 className="text-[1.5rem] font-bold leading-[1.22] tracking-[-0.028em] sm:text-[1.9rem]">
            {project.name}
          </h1>
          <p className="row-desc mt-3">{project.desc}</p>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {project.tech.map((tech) => (
              <span key={tech} className="chip">
                {tech.toLowerCase()}
              </span>
            ))}
          </div>

          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-5 inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-3.5 py-1.5 text-[0.8rem] transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
            >
              live demo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </header>

        {project.url ? (
          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel-soft)]">
            <Image
              src={project.url}
              alt={project.name}
              fill
              priority
              sizes="(min-width: 1024px) 62rem, 100vw"
              className="object-cover object-top"
            />
          </div>
        ) : null}

        <dl className="mt-8 grid grid-cols-1 divide-y divide-[var(--line)] border-y border-[var(--line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {facts.map((fact) => (
            <div key={fact.key} className="px-0 py-3 sm:px-4 sm:first:pl-0">
              <dt className="meta">{fact.key}</dt>
              <dd className="row-title mt-1">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-9 max-w-[42rem] space-y-4">
          {project.longDescription.split("\n\n").map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-[0.925rem] leading-[1.72] text-[var(--muted-ink)]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {project.highlights?.length ? (
          <section className="mt-10 max-w-[42rem]">
            <p className="section-label pb-3">highlights</p>
            <ul className="divide-y divide-[var(--line)]">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="row-desc py-2.5">
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.keyFeatures.length ? (
          <section className="mt-10 max-w-[42rem]">
            <p className="section-label pb-3">key features</p>
            <ul className="divide-y divide-[var(--line)]">
              {project.keyFeatures.map((feature) => (
                <li key={feature.title} className="py-3">
                  <h2 className="row-title">{feature.title}</h2>
                  <p className="row-desc mt-1">{feature.description}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <Link
          href="/projects"
          className="group/more focus-ring mt-10 inline-flex items-center gap-1.5 text-[0.82rem] text-[var(--muted-ink)] transition-colors hover:text-[var(--ink)]"
        >
          more projects
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/more:translate-x-0.5" />
        </Link>
      </article>
    </main>
  );
}
