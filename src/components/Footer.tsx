'use client'

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 site-footer mt-auto w-full border-t border-[var(--footer-border)] bg-[var(--footer-bg)] py-10 text-[var(--footer-foreground)] transition-colors duration-200">
      <div className="page-shell flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-row gap-6 items-center">
            <Link
              href="/#hero"
              className="text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
            >
              About
            </Link>
            <Link
              href="/#skills"
              className="text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
            >
              Skills
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 border-t border-[var(--footer-border)] pt-6 text-xs text-[var(--footer-muted)]">
          <p>Copyright © {new Date().getFullYear()} John Carl Santos.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
