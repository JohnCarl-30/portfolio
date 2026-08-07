"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { EMAIL, RESUME_URL, socialLinks } from "@/app/data/Social";

const Contact = () => {
  return (
    <section id="contact" className="section-band section-band--slate">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div className="min-w-0">
            <p className="section-eyebrow">Contact</p>
            <a
              href={`mailto:${EMAIL}`}
              className="focus-ring block break-words text-[clamp(1.25rem,3.5vw,3rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground transition-colors duration-150 hover:text-primary"
            >
              {EMAIL}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={RESUME_URL}
              target="_blank"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
            >
              Resume
              <ArrowRight className="h-4 w-4" />
            </Link>

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
                  className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-[color,border-color,transform] duration-150 hover:border-primary/40 hover:text-foreground active:scale-[0.98]"
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
