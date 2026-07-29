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
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            className="flex flex-row gap-6 items-center"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/#hero"
                className="text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
              >
                Home
              </Link>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/about"
                className="text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
              >
                About
              </Link>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/#skills"
                className="text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
              >
                Skills
              </Link>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/blog"
                className="text-sm font-medium text-[var(--footer-foreground)] transition-colors hover:text-[var(--footer-hover)]"
              >
                Blog
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center items-center gap-3 border-t border-[var(--footer-border)] pt-6 text-xs text-[var(--footer-muted)]"
        >
          <p>Copyright © {new Date().getFullYear()} John Carl Santos.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
