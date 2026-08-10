"use client";

import Reveal from "./Reveal";

/** Shared header for the "view all" pages so they read as the same document. */
export default function PageHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <Reveal as="header" className="pt-12 pb-8">
      <p className="section-label">{label}</p>
      <h1 className="mt-3 max-w-[34rem] text-[1.6rem] font-bold leading-[1.2] tracking-[-0.028em] sm:text-[2rem]">
        {title}
      </h1>
      <p className="row-desc mt-3 max-w-[38rem]">{description}</p>
    </Reveal>
  );
}
