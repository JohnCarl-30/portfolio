"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import Heading from "./sub/Heading";

const About = () => {
  return (
    <section id="about" className="section-band section-band--paper">
      <div className="page-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(260px,0.92fr)_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-panel overflow-hidden rounded-[1.75rem]"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/img/pic.jpg"
                alt="John Carl Santos portrait"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="md:pl-6"
          >
            <div className="section-kicker">
              <span className="section-rule" />
              About
            </div>
            <Heading text="About Me." />

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 px-5 py-3 text-sm font-medium text-slate-700 transition-all hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-primary/40 dark:hover:text-primary"
            >
              Open page
              <span className="text-base">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
