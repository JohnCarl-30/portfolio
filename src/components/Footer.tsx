'use client'

import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative z-10 site-footer mt-auto w-full border-t border-[var(--footer-border)] bg-[var(--footer-bg)] py-10 text-[var(--footer-foreground)] transition-colors duration-200">
      <div className="page-shell flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center justify-center gap-6"
        >
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
            <Link
              href="/blog"
              className="text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
            >
              Blog
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex justify-center items-center gap-3 border-t border-[var(--footer-border)] pt-6 text-xs text-[var(--footer-muted)]"
        >
          <p>Copyright © {new Date().getFullYear()} John Carl Santos.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
