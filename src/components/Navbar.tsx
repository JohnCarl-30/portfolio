"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { useAppUI } from "@/components/providers/AppUIProvider";
import { Kbd } from "@/components/ui/kbd";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { isSearchOpen, openSearch } = useAppUI();

  return (
    <nav className="w-full py-4">
      <div className="page-shell">
        <div className="glass-panel flex h-16 items-center justify-between rounded-full px-4 sm:px-6">
          <Link
            href="/"
            className="text-lg font-semibold tracking-[-0.04em] text-slate-900 dark:text-white"
          >
            John <span className="font-serif text-primary italic">Carl</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                      : "text-slate-500 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={openSearch}
            aria-expanded={isSearchOpen}
            aria-haspopup="dialog"
            aria-label="Open global search"
            className="flex cursor-pointer items-center gap-3 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-left transition-all hover:border-primary/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:border-primary/40 dark:hover:bg-white/10"
          >
            <Search className="h-4 w-4 text-primary" />
            <span className="hidden text-sm text-slate-600 sm:inline dark:text-slate-300">
              Search
            </span>
            <div className="ml-auto hidden items-center gap-1 md:flex">
              <Kbd className="border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
                ⌘
              </Kbd>
              <Kbd className="border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
                K
              </Kbd>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
