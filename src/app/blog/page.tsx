"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllPosts, getBlogTags } from "@/app/data/Blog";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function BlogPage() {
  const posts = useMemo(() => getAllPosts(), []);
  const tags = useMemo(() => getBlogTags(), []);
  const [activeTag, setActiveTag] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeTag === "All") {
      return posts;
    }

    return posts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag, posts]);

  return (
    <div className="flex min-h-screen flex-col pt-6 pb-16">
      <main className="page-shell mt-4 flex flex-1 flex-col">
        <header className="max-w-3xl">
          <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Blog
          </p>
          <h1 className="text-5xl font-semibold tracking-[-0.06em] text-foreground md:text-6xl">
            Notes on shipping AI and full-stack work.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Short writing on product decisions, LLM workflows, and the systems
            behind the demos.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap gap-2">
          {["All", ...tags].map((tag) => {
            const isActive = activeTag === tag;

            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-[color,background-color,border-color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/70 bg-background text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-0">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border-t border-border/60 py-8 transition-colors duration-150 last:border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs text-muted-foreground">
                    {formatDate(post.date)}
                    <span className="mx-2 text-border">·</span>
                    {post.readingTime}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground transition-colors duration-150 group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-foreground">
                  Read
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border/70 bg-secondary/20 px-6 py-12 text-center">
              <p className="text-sm font-medium text-foreground">
                No posts in this tag
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try another tag or clear the filter to see every post.
              </p>
              <button
                type="button"
                onClick={() => setActiveTag("All")}
                className="mt-4 inline-flex min-h-11 items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-[color,transform] duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
