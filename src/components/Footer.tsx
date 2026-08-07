'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { EMAIL, RESUME_URL, socialLinks } from "@/app/data/Social";

const footerSections = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/skills", label: "Skills" },
    ],
  },
  {
    title: "Work",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/certifications", label: "Certifications" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      { href: RESUME_URL, label: "Resume", external: true },
      { href: `mailto:${EMAIL}`, label: "Email", external: true },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="site-footer relative z-10 mt-auto w-full border-t border-[var(--footer-border)] bg-[var(--footer-bg)] py-12 text-[var(--footer-foreground)] transition-colors duration-200">
      <div className="page-shell flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]"
        >
          <div className="max-w-xs">
            <Link
              href="/"
              className="focus-ring font-mono text-sm font-semibold tracking-tight transition-colors hover:text-[var(--footer-hover)]"
            >
              JC.
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--footer-muted)]">
              AI &amp; full-stack engineer building RAG systems, web apps, and
              automation tools.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={item.label}
                    className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--footer-border)] text-[var(--footer-muted)] transition-[color,border-color,transform] duration-150 hover:border-[var(--footer-hover)] hover:text-[var(--footer-hover)] active:scale-[0.98]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--footer-muted)]">
                {section.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      className="focus-ring text-sm font-medium transition-colors duration-150 hover:text-[var(--footer-hover)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex flex-col items-center justify-between gap-4 border-t border-[var(--footer-border)] pt-6 text-xs text-[var(--footer-muted)] sm:flex-row"
        >
          <p>Copyright © {new Date().getFullYear()} John Carl Santos.</p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "auto"
                  : "smooth",
              })
            }
            className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--footer-border)] px-4 py-2 font-medium transition-[color,border-color,transform] duration-150 hover:border-[var(--footer-hover)] hover:text-[var(--footer-hover)] active:scale-[0.98]"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
