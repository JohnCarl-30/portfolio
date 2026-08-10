"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "@/components/providers/RouteTransition";
import { ArrowUpRight, ExternalLink, Search } from "lucide-react";

import { projectsButton, projectsData, type ProjectItem } from "@/app/data/Projects";
import FilterChips from "@/components/home/FilterChips";
import PageHeader from "@/components/home/PageHeader";
import Reveal from "@/components/home/Reveal";
import {
  PreviewProvider,
  usePreviewHandlers,
} from "@/components/home/HoverPreview";

function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  const handlers = usePreviewHandlers({
    title: project.name,
    body: project.desc,
    image: project.url || undefined,
    meta: `${project.role} · ${project.timeline}`,
  });

  return (
    <Reveal as="li" delay={Math.min(index, 6) * 0.05}>
      <div
        className="group/row -mx-3 rounded-lg px-3 py-3.5 transition-colors hover:bg-[var(--hover)]"
        {...handlers}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="row-title">
            <Link
              href={`/projects/${project.id}`}
              className="focus-ring inline-flex items-center gap-1 transition-colors hover:text-[var(--signal)]"
            >
              {project.name}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover/row:translate-x-px group-hover/row:-translate-y-px group-hover/row:opacity-100" />
            </Link>
          </h2>

          <span className="meta shrink-0">
            {project.category.toLowerCase()} · {project.timeline}
          </span>
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

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {project.tech.map((tech) => (
            <span key={tech} className="chip">
              {tech.toLowerCase()}
            </span>
          ))}

          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring ml-1 inline-flex items-center gap-1 text-[0.72rem] text-[var(--dim)] transition-colors hover:text-[var(--signal)]"
            >
              live
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return projectsData.filter((project) => {
      const matchesQuery =
        !needle ||
        project.name.toLowerCase().includes(needle) ||
        project.desc.toLowerCase().includes(needle) ||
        project.tech.some((tech) => tech.toLowerCase().includes(needle));

      const matchesTab = activeTab === "All" || project.category === activeTab;

      return matchesQuery && matchesTab;
    });
  }, [activeTab, query]);

  return (
    <PreviewProvider>
      <main className="shell flex-1 pb-20">
        <PageHeader
          label="projects"
          title="Builds across AI, fintech, and civic tooling."
          description="Each one shipped end to end — the model layer, the backend, and the interface on top."
        />

        <Reveal className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <FilterChips
            label="Filter by category"
            options={projectsButton}
            active={activeTab}
            onChange={setActiveTab}
          />

          <label className="flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 transition-colors focus-within:border-[var(--line-strong)] sm:w-56">
            <Search className="h-3.5 w-3.5 shrink-0 text-[var(--dim)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="search"
              aria-label="Search projects"
              className="w-full bg-transparent text-[0.8rem] outline-none placeholder:text-[var(--dim)]"
            />
          </label>
        </Reveal>

        {filtered.length ? (
          <ul className="divide-y divide-[var(--line)]">
            {filtered.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </ul>
        ) : (
          <p className="row-desc py-10">
            Nothing matches that. Try a different category or keyword.
          </p>
        )}
      </main>
    </PreviewProvider>
  );
}
