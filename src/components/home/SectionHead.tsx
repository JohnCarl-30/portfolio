"use client";

import Link from "@/components/providers/RouteTransition";
import { ArrowUpRight } from "lucide-react";

import Reveal from "./Reveal";

type SectionHeadProps = {
  /** Lowercase label, e.g. "projects". */
  label: string;
  /** Scroll anchor id, also used by SectionDock and the command palette. */
  id: string;
  /** Total items in the section, shown as a zero-padded index mark. */
  count?: number;
  viewAll?: { href: string; label?: string };
};

/**
 * Lowercase section label with a hairline that draws itself across the
 * remaining width when the section scrolls into view.
 */
export default function SectionHead({ label, id, count, viewAll }: SectionHeadProps) {
  return (
    <div id={id} className="flex scroll-mt-20 items-center gap-4 pb-4">
      <h2 className="section-label shrink-0">{label}</h2>

      {typeof count === "number" ? (
        <span aria-hidden="true" className="meta -ml-2 shrink-0">
          {String(count).padStart(2, "0")}
        </span>
      ) : null}

      <Reveal
        as="span"
        variant="rule"
        aria-hidden="true"
        className="h-px flex-1 bg-[var(--line-strong)]"
      >
        {null}
      </Reveal>

      {viewAll ? (
        <Link
          href={viewAll.href}
          className="group/all focus-ring inline-flex shrink-0 items-center gap-1 text-[0.78rem] text-[var(--dim)] transition-colors hover:text-[var(--ink)]"
        >
          {viewAll.label ?? "view all"}
          <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/all:translate-x-px group-hover/all:-translate-y-px" />
        </Link>
      ) : null}
    </div>
  );
}
