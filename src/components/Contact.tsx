"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const contactLinks = [
  {
    href: "mailto:johncarl.santos@example.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://github.com/santosjohncarl",
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
        <div className="glass-panel rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid gap-8 lg:grid-cols-[1fr_auto]"
          >
            <div>
              <div className="section-kicker">
                <span className="section-rule" />
                Contact
              </div>
              <a
                href="mailto:johncarl.santos@example.com"
                className="text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1] tracking-[-0.06em] text-slate-950 transition-colors hover:text-primary dark:text-white dark:hover:text-primary"
              >
                johncarl.santos@example.com
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Link
                href="/JohnCarl_Resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
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
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-500 transition-all hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-primary/40 dark:hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
