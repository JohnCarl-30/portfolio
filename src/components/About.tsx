"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import pic2 from "../../public/img/pic2.jpeg";

const About = () => {
  return (
    <section id="about" className="section-band section-band--paper">
      <div className="page-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.35 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-white/10">
              <div className="relative aspect-[4/5]">
                <Image
                  src={pic2}
                  alt="John Carl Santos portrait"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.35, delay: 0.06 }}
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-6">
              About
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">
              About Me.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-500 dark:text-slate-400">
              I&apos;m John Carl Santos, an aspiring AI Engineer and Software
              Developer from the Philippines. I build full-stack products with a
              focus on AI integration, backend systems, and thoughtful user
              experiences.
            </p>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-950 transition-colors hover:text-primary dark:text-white dark:hover:text-primary"
            >
              Read more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
