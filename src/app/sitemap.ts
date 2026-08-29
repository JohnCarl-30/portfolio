import type { MetadataRoute } from "next";

import { getAllPosts } from "@/app/data/Blog";
import { projectsData } from "@/app/data/Projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dyeyc.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/projects", "/blog", "/skills", "/certifications", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const projects = projectsData.map((project) => ({
    url: `${siteUrl}/projects/${project.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...projects, ...posts];
}
