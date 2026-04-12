"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import { useAppUI } from "@/components/providers/AppUIProvider";
import { Kbd } from "@/components/ui/kbd";

const Navbar = () => {
  const { isSearchOpen, openSearch } = useAppUI();

  return (
    <nav className="w-full border-b border-blue-100/70 bg-white/85 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:pl-6">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-gray-800 dark:text-white"
          >
            JC<span className="text-blue-500">.</span>
          </Link>

          <div className="flex items-center gap-5 md:gap-8">
            <Link
              href="/about"
              className="text-sm text-gray-500 transition-colors hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              About
            </Link>
            <Link
              href="/skills"
              className="text-sm text-gray-500 transition-colors hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Skills
            </Link>
            <Link
              href="/projects"
              className="text-sm text-gray-500 transition-colors hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-500 transition-colors hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={openSearch}
              aria-expanded={isSearchOpen}
              aria-haspopup="dialog"
              aria-label="Open global search"
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-left shadow-sm transition-all hover:border-blue-300 hover:bg-blue-100 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-400/50 dark:hover:bg-slate-800"
            >
              <Search className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              <span className="text-sm text-blue-600 dark:text-blue-300">
                Search...
              </span>
              <div className="ml-auto hidden items-center gap-1 sm:flex">
                <Kbd className="border-blue-200 bg-white text-blue-500 dark:border-white/10 dark:bg-slate-800 dark:text-blue-300">
                  ⌘
                </Kbd>
                <Kbd className="border-blue-200 bg-white text-blue-500 dark:border-white/10 dark:bg-slate-800 dark:text-blue-300">
                  K
                </Kbd>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
