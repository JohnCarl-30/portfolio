"use client";

import Link from "@/components/providers/RouteTransition";

import { getAllPosts, type BlogPost } from "@/app/data/Blog";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { usePreviewHandlers } from "./HoverPreview";

function NoteRow({ post, index }: { post: BlogPost; index: number }) {
  const handlers = usePreviewHandlers({
    title: post.title,
    body: post.excerpt,
    meta: `${post.readingTime} · ${post.tags.join(", ").toLowerCase()}`,
  });

  return (
    <Reveal as="li" delay={index * 0.055}>
      <Link
        href={`/blog/${post.slug}`}
        className="group/row focus-ring -mx-3 block rounded-lg px-3 py-3 transition-colors hover:bg-[var(--hover)]"
        {...handlers}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="row-title transition-colors group-hover/row:text-[var(--signal)]">
            {post.title}
          </h3>
          <span className="meta shrink-0">{post.readingTime}</span>
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

export default function Notes() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="pb-16">
      <SectionHead id="writing" label="writing" num="01" count={getAllPosts().length} viewAll={{ href: "/blog" }} />

      <ul className="divide-y divide-[var(--line)]">
        {posts.map((post, index) => (
          <NoteRow key={post.slug} post={post} index={index} />
        ))}
      </ul>
    </section>
  );
}
