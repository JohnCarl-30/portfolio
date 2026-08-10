"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Link2, Linkedin } from "lucide-react";
import toast from "react-hot-toast";

type BlogPostFooterProps = {
  title: string;
  slug: string;
};

function getPostUrl(slug: string) {
  return `${window.location.origin}/blog/${slug}`;
}

export default function BlogPostFooter({ title, slug }: BlogPostFooterProps) {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getPostUrl(slug));
      setCopied(true);
      toast.success("Link copied");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      toast.error("Could not copy the link");
    }
  };

  const handleShareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      getPostUrl(slug),
    )}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mt-16 flex items-center justify-between gap-4 border-t border-border/60 pt-8">
      <Link
        href="/blog"
        className="font-mono text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {"<"} all posts
      </Link>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleShareLinkedIn}
          aria-label={`Share “${title}” on LinkedIn`}
          title="Share on LinkedIn"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-[color,border-color,transform] duration-150 hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
        >
          <Linkedin className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={copied ? "Link copied" : "Copy link to post"}
          title={copied ? "Copied" : "Copy link"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-[color,border-color,transform] duration-150 hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={
                  shouldReduceMotion ? undefined : { scale: 0.5, opacity: 0 }
                }
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="flex"
              >
                <Check className="h-4 w-4 text-primary" />
              </motion.span>
            ) : (
              <motion.span
                key="link"
                initial={shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={
                  shouldReduceMotion ? undefined : { scale: 0.5, opacity: 0 }
                }
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="flex"
              >
                <Link2 className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
