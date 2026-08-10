"use client";

import Link from "@/components/providers/RouteTransition";
import { ArrowLeft, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { useAppUI } from "@/components/providers/AppUIProvider";
import { profile } from "@/app/data/Profile";

/**
 * Sub-page chrome only. The home page deliberately has no top bar — the
 * identity row is the first thing on screen, and SectionDock carries
 * navigation and search from the bottom.
 */
export default function TopRail() {
  const pathname = usePathname();
  const { openSearch } = useAppUI();

  if (pathname === "/") return null;

  return (
    <div className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--paper)]/80 backdrop-blur-xl">
      <div className="shell flex h-12 items-center justify-between">
        <Link
          href="/"
          className="group/back focus-ring inline-flex items-center gap-1.5 text-[0.8rem] text-[var(--muted-ink)] transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover/back:-translate-x-0.5" />
          {profile.name.toLowerCase()}
        </Link>

        <button
          type="button"
          onClick={openSearch}
          aria-label="Open search"
          className="focus-ring flex items-center gap-1.5 rounded-full px-2 py-1 text-[var(--dim)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--ink)]"
        >
          <Search className="h-3.5 w-3.5" />
          <kbd className="hidden font-mono text-[0.68rem] sm:inline">⌘K</kbd>
        </button>
      </div>
    </div>
  );
}
