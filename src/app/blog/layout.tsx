import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from John Carl Santos on shipping AI features, full-stack systems, and product decisions.",
  openGraph: {
    title: "Blog | John Carl Santos",
    description:
      "Notes on shipping AI features, full-stack systems, and product decisions.",
    url: "/blog",
  },
  twitter: {
    title: "Blog | John Carl Santos",
    description:
      "Notes on shipping AI features, full-stack systems, and product decisions.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
