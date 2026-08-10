"use client";

import Link from "@/components/providers/RouteTransition";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import NotFoundGame from "@/components/NotFoundGame";

const ease = [0.23, 1, 0.32, 1] as const;

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="shell flex flex-1 flex-col items-center justify-center gap-10 py-16 text-center">
      <div>
        <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span
            initial={shouldReduceMotion ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="block font-mono text-[clamp(5rem,18vw,9rem)] font-semibold leading-none tracking-[-0.06em] text-[var(--ink)]"
          >
            404
          </motion.span>
        </span>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[var(--muted-ink)]"
        >
          This page doesn&apos;t exist — or it shipped to prod and never came
          back. While you&apos;re here, beat the high score.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.32 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-[color,transform] duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back home
          </Link>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-ink)] transition-colors duration-150 hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Browse projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.45 }}
        className="flex w-full max-w-2xl justify-center rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] md:p-8"
      >
        <NotFoundGame />
      </motion.div>
    </div>
  );
}
