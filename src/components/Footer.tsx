'use client'

import { useCallback } from "react";

const Footer = () => {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <footer className="site-footer mt-auto w-full border-t border-[var(--footer-border)] bg-[var(--footer-bg)] py-10 text-[var(--footer-foreground)] transition-colors duration-200">
      <div className="page-shell flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-row gap-6 items-center">
            <button
              onClick={() => scrollToSection('hero')}
              className="cursor-pointer text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="cursor-pointer text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="cursor-pointer text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
            >
              Skills
            </button>
            
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
