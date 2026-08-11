"use client";

import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { profile } from "@/app/data/Profile";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

/**
 * `standalone` is for /contact, where PageHeader already names the section —
 * rendering SectionHead too would stack two identical headings.
 */
export default function SayHi({ standalone = false }: { standalone?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <section className="pb-16">
      {standalone ? null : <SectionHead id="contact" label="contact" />}

      <Reveal className="max-w-[44rem]">
        <p className="row-desc">
          Open to conversations about AI engineering, retrieval systems, and
          products that need to work after the demo. Best reached by email or
          LinkedIn.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="ink-link font-mono text-[0.85rem]"
          >
            {profile.email}
          </a>

          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="focus-ring relative inline-flex h-6 w-6 items-center justify-center rounded border border-[var(--line)] text-[var(--dim)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
          >
            <motion.span
              key={copied ? "done" : "idle"}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              {copied ? (
                <Check className="h-3 w-3 text-[var(--signal)]" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </motion.span>
          </button>
        </div>
      </Reveal>
    </section>
  );
}
