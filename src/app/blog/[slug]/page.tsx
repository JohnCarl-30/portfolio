import Link from "@/components/providers/RouteTransition";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import BlogPostFooter from "@/components/BlogPostFooter";
import PagerNav from "@/components/PagerNav";
import ScrollProgress from "@/components/home/ScrollProgress";
import { getAllPosts, getPostBySlug } from "@/app/data/Blog";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | John Carl Santos`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
    twitter: {
      title: `${post.title} | John Carl Santos`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index < posts.length - 1 ? posts[index + 1] : undefined;

  return (
    <main className="shell flex-1 pb-20 pt-10">
      <ScrollProgress />
      <Link
        href="/blog"
        className="group/back focus-ring inline-flex items-center gap-1.5 text-[0.78rem] text-[var(--dim)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover/back:-translate-x-0.5" />
        all notes
      </Link>

      <article className="mt-8 max-w-[42rem]">
        <header className="border-b border-[var(--line)] pb-7">
          <p className="meta">
            {formatDate(post.date)} · {post.readingTime}
          </p>
          <h1 className="mt-2.5 text-[1.5rem] font-bold leading-[1.22] tracking-[-0.028em] sm:text-[1.9rem]">
            {post.title}
          </h1>
          <p className="row-desc mt-3">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag.toLowerCase()}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-7 space-y-4">
          {post.content.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-[0.925rem] leading-[1.72] text-[var(--muted-ink)]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <BlogPostFooter title={post.title} slug={post.slug} />

        <PagerNav
          prev={
            newer && {
              href: `/blog/${newer.slug}`,
              kicker: "newer note",
              title: newer.title,
            }
          }
          next={
            older && {
              href: `/blog/${older.slug}`,
              kicker: "older note",
              title: older.title,
            }
          }
        />
      </article>
    </main>
  );
}
