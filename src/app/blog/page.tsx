"use client";

import { useMemo, useState } from "react";
import Link from "@/components/providers/RouteTransition";

import { getAllPosts, getBlogTags, type BlogPost } from "@/app/data/Blog";
import FilterChips from "@/components/home/FilterChips";
import PageHeader from "@/components/home/PageHeader";
import Reveal from "@/components/home/Reveal";
import {
  PreviewProvider,
  usePreviewHandlers,
} from "@/components/home/HoverPreview";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function NoteRow({ post, index }: { post: BlogPost; index: number }) {
  const handlers = usePreviewHandlers({
    title: post.title,
    body: post.excerpt,
    meta: `${formatDate(post.date)} · ${post.readingTime}`,
  });

  return (
    <Reveal as="li" delay={Math.min(index, 6) * 0.05}>
      <Link
        href={`/blog/${post.slug}`}
        className="group/row focus-ring -mx-3 block rounded-lg px-3 py-3.5 transition-colors hover:bg-[var(--hover)]"
        {...handlers}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="row-title transition-colors group-hover/row:text-[var(--signal)]">
            {post.title}
          </h2>
          <span className="meta shrink-0">
            {formatDate(post.date)} · {post.readingTime}
          </span>
        </div>

        <p className="row-desc mt-1 max-w-[44rem]">{post.excerpt}</p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag.toLowerCase()}
            </span>
          ))}
        </div>
      </Link>
    </Reveal>
  );
}

export default function BlogPage() {
  const posts = useMemo(() => getAllPosts(), []);
  const tags = useMemo(() => getBlogTags(), []);
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? posts
        : posts.filter((post) => post.tags.includes(activeTag)),
    [activeTag, posts],
  );

  return (
    <PreviewProvider>
      <main className="shell flex-1 pb-20">
        <PageHeader
          label="writing"
          title="Working notes on shipping AI and full-stack work."
          description="Short writing on product decisions, LLM workflows, and the systems behind the demos."
        />

        <Reveal className="pb-6">
          <FilterChips
            label="Filter by tag"
            options={["All", ...tags]}
            active={activeTag}
            onChange={setActiveTag}
          />
        </Reveal>

        {filtered.length ? (
          <ul className="divide-y divide-[var(--line)]">
            {filtered.map((post, index) => (
              <NoteRow key={post.slug} post={post} index={index} />
            ))}
          </ul>
        ) : (
          <p className="row-desc py-10">
            No posts under that tag yet.{" "}
            <button
              type="button"
              onClick={() => setActiveTag("All")}
              className="ink-link"
            >
              Show all
            </button>
            .
          </p>
        )}
      </main>
    </PreviewProvider>
  );
}
