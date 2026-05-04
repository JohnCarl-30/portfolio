'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full py-6">
      <div className="page-shell">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-tight text-slate-900 dark:text-white"
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
                  className={`group relative text-sm font-medium transition-colors ${
                    isActive
                      ? "text-slate-950 dark:text-white"
                      : "text-slate-400 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-slate-950 transition-all duration-300 dark:bg-white ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <Link
            href="/JohnCarl_Resume.pdf"
            target="_blank"
            className="group relative overflow-hidden rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 dark:border-white/10 dark:bg-transparent dark:text-slate-200 dark:hover:border-white/30"
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
    </nav>
  );
};

export default Navbar;
