import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="site-footer mt-auto w-full border-t border-[var(--footer-border)] bg-[var(--footer-bg)] py-10 text-[var(--footer-foreground)] transition-colors duration-200">
      <div className="page-shell flex flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Link
              href="/"
              className="text-2xl font-semibold tracking-[-0.05em] text-[var(--footer-foreground)]"
            >
              John <span className="font-serif italic">Carl</span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--footer-muted)]">
              Software engineering, AI workflows, and interfaces built with a
              calm, practical point of view.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/santosjohncarl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--footer-muted)] transition-colors hover:text-[var(--footer-hover)]"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/santosjohncarl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--footer-muted)] transition-colors hover:text-[var(--footer-hover)]"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:johncarl.santos@example.com"
              className="text-[var(--footer-muted)] transition-colors hover:text-[var(--footer-hover)]"
            >
              <Mail className="h-5 w-5" />
            </a>
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
