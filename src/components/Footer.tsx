import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="site-footer mt-auto w-full border-t border-[var(--footer-border)] bg-[var(--footer-bg)] py-10 text-[var(--footer-foreground)] transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Logo or Brand */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link href="/" className="text-xl font-bold tracking-tight text-[var(--footer-foreground)]">
                        John Carl Santos<span className="text-[var(--footer-muted)]">.</span>
                    </Link>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-5">
                    <a href="https://github.com/santosjohncarl" target="_blank" rel="noopener noreferrer" className="text-[var(--footer-muted)] transition-colors hover:text-[var(--footer-hover)]">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/santosjohncarl" target="_blank" rel="noopener noreferrer" className="text-[var(--footer-muted)] transition-colors hover:text-[var(--footer-hover)]">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:johncarl.santos@example.com" className="text-[var(--footer-muted)] transition-colors hover:text-[var(--footer-hover)]">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="mx-auto mt-8 flex w-full max-w-6xl items-center justify-center border-t border-[var(--footer-border)] px-6 pt-8 text-center">
                <p className="text-xs text-[var(--footer-muted)]">
                    Copyright © {new Date().getFullYear()} John Carl Santos. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
