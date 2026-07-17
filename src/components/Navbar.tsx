'use client'

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
    <nav className="relative z-10 w-full py-6">
      <div className="page-shell">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-tight text-slate-900 transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-white"
          >
            JC.
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive
                      ? "text-slate-950 dark:text-white"
                      : "text-slate-400 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-slate-950 transition-[width] duration-200 ease-out dark:bg-white ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openSearch}
              aria-expanded={isSearchOpen}
              aria-haspopup="dialog"
              aria-label="Open global search"
              className="flex cursor-pointer items-center gap-3 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-left transition-[color,background-color,border-color,transform] duration-150 hover:border-primary/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:hover:border-primary/40 dark:hover:bg-white/10"
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

            <Link
              href="/JohnCarl_Resume.pdf"
              target="_blank"
              className="group relative overflow-hidden rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-[color,border-color,transform] duration-150 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] dark:border-white/10 dark:bg-transparent dark:text-slate-200 dark:hover:border-white/30"
            >
              <span className="relative z-10 inline-block transition-transform duration-200 group-hover:-translate-y-full">
                Resume
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-200 group-hover:translate-y-0">
                Resume
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
