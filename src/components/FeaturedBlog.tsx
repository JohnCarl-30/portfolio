"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { getAllPosts } from "@/app/data/Blog";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

const FeaturedBlog = () => {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="section-band section-band--paper">
      <div className="page-shell">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              Writing
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
              Blog.
            </h2>
          </div>

          <Link
            href="/blog"
            className="group hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <motion.div
          className="mt-14 flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {posts.map((post) => (
            <motion.div
              key={post.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 border-t border-border/60 py-8 transition-colors duration-150 last:border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs text-muted-foreground">
                    {formatDate(post.date)}
                    <span className="mx-2 text-border">·</span>
                    {post.readingTime}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-foreground transition-colors duration-150 group-hover:text-primary sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-foreground">
                  Read
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            View all posts
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
