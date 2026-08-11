"use client";

import { ArrowUpRight } from "lucide-react";

import { certifications } from "@/app/data/Certifications";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Credentials() {
  const featured = certifications.slice(0, 5);

  return (
    <section className="pb-16">
      <SectionHead
        id="credentials"
        label="credentials"
        count={certifications.length}
        viewAll={{ href: "/certifications" }}
      />

      <ul className="divide-y divide-[var(--line)]">
        {featured.map((cert, index) => {
          const linked = Boolean(cert.credentialUrl);

          const body = (
            <>
              <span className="min-w-0">
                <span className="row-title block transition-colors group-hover/row:text-[var(--signal)]">
                  {cert.title}
                </span>
                <span className="row-desc mt-0.5 block text-[0.8rem]">
                  {cert.issuer}
                </span>
              </span>

              <span className="meta inline-flex shrink-0 items-center gap-1">
                {cert.issueDate}
                {linked ? (
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover/row:opacity-100" />
                ) : null}
              </span>
            </>
          );

          const rowClass =
            "group/row focus-ring -mx-3 flex items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--hover)]";

          return (
            <Reveal key={cert.id} as="li" delay={index * 0.05}>
              {linked ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                >
                  {body}
                </a>
              ) : (
                <div className={rowClass}>{body}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
