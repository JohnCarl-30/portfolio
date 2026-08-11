"use client";

import Image from "next/image";
import Link from "@/components/providers/RouteTransition";
import { ArrowUpRight } from "lucide-react";

import { projectsData, type ProjectItem } from "@/app/data/Projects";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { usePreviewHandlers } from "./HoverPreview";

function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  const handlers = usePreviewHandlers({
    title: project.name,
    body: project.desc,
    image: project.url || undefined,
    meta: `${project.role} · ${project.timeline}`,
  });

  return (
    <Reveal as="li" delay={index * 0.055}>
      <Link
        href={`/projects/${project.id}`}
        className="group/row focus-ring -mx-3 block rounded-lg px-3 py-3 transition-colors hover:bg-[var(--hover)]"
        {...handlers}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="row-title inline-flex items-center gap-1 transition-colors group-hover/row:text-[var(--signal)]">
            {project.name}
            <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover/row:translate-x-px group-hover/row:-translate-y-px group-hover/row:opacity-100" />
          </h3>
          <span className="meta shrink-0">{project.timeline}</span>
        </div>

        <p className="row-desc mt-1 max-w-[44rem]">{project.desc}</p>

        {project.url ? (
          <span className="row-thumb relative mt-3 aspect-[16/9] w-full overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel-soft)]">
            <Image
              src={project.url}
              alt={`${project.name} screenshot`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 44rem"
              className="object-cover object-top"
            />
          </span>
        ) : null}

        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((tech) => (
            <span key={tech} className="chip">
              {tech.toLowerCase()}
            </span>
          ))}
        </div>
      </Link>
    </Reveal>
  );
}

export default function Projects() {
  const featured = projectsData.slice(0, 4);

  return (
    <section className="pb-16">
      <SectionHead id="projects" label="projects" num="02" count={projectsData.length} viewAll={{ href: "/projects" }} />

      <ul className="divide-y divide-[var(--line)]">
        {featured.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </ul>
    </section>
  );
}
