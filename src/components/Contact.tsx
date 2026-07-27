"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const contactLinks = [
  {
    href: "mailto:johncarlsantos30@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://github.com/JohnCarl-30",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/santosjohncarl",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section-band section-band--slate">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div className="min-w-0">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-6">
              Contact
            </p>
            <a
              href="mailto:johncarlsantos30@gmail.com"
              className="block break-words text-[clamp(1.25rem,3.5vw,3rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-slate-950 transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-white dark:hover:text-primary"
            >
              johncarlsantos30@gmail.com
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/JohnCarl_Resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-[color,transform] duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] dark:bg-white dark:text-slate-950"
            >
              Resume
              <ArrowRight className="h-4 w-4" />
            </Link>

            {contactLinks.map((item) => {
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
                  title={item.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/60 text-slate-500 transition-[color,border-color,transform] duration-150 hover:border-slate-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] dark:border-white/10 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
