import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import BlogPostFooter from "@/components/BlogPostFooter";
import PagerNav from "@/components/PagerNav";
import ReadingProgress from "@/components/ReadingProgress";
import Reveal from "@/components/Reveal";
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
  const postIndex = posts.findIndex((entry) => entry.slug === slug);
  const newerPost = postIndex > 0 ? posts[postIndex - 1] : undefined;
  const olderPost =
    postIndex >= 0 && postIndex < posts.length - 1
      ? posts[postIndex + 1]
      : undefined;

  return (
    <div className="flex min-h-screen flex-col pt-6 pb-20">
      <ReadingProgress />
      <main className="page-shell mt-4 flex-1">
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <article className="mx-auto mt-10 max-w-3xl">
          <Reveal>
          <header className="border-b border-border/60 pb-10">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              Blog
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              {formatDate(post.date)}
              <span className="mx-2 text-border">·</span>
              {post.readingTime}
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-foreground md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
          </Reveal>

          <Reveal delay={0.08}>
          <div className="mt-10 space-y-6">
            {post.content.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-base leading-relaxed text-foreground/90"
              >
                {paragraph}
              </p>
            ))}
          </div>
          </Reveal>

          <BlogPostFooter title={post.title} slug={post.slug} />

          <PagerNav
            prev={
              olderPost && {
                href: `/blog/${olderPost.slug}`,
                kicker: "Older post",
                title: olderPost.title,
              }
            }
            next={
              newerPost && {
                href: `/blog/${newerPost.slug}`,
                kicker: "Newer post",
                title: newerPost.title,
              }
            }
          />
        </article>
      </main>
    </div>
  );
}
