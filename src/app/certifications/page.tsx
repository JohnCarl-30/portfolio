"use client";

import { ArrowUpRight } from "lucide-react";

import { certifications } from "@/app/data/Certifications";
import PageHeader from "@/components/home/PageHeader";
import Reveal from "@/components/home/Reveal";

export default function CertificationsPage() {
  return (
    <main className="shell flex-1 pb-20">
      <PageHeader
        label="credentials"
        title="Credentials, in full."
        description="Cloud, generative AI, and retrieval coursework — with verification links where the issuer provides one."
      />

      <ul className="divide-y divide-[var(--line)]">
        {certifications.map((cert, index) => {
          const linked = Boolean(cert.credentialUrl);

          const body = (
            <>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="row-title inline-flex items-center gap-1 transition-colors group-hover/row:text-[var(--signal)]">
                  {cert.title}
                  {linked ? (
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover/row:opacity-100" />
                  ) : null}
                </h2>
                <span className="meta shrink-0">
                  {cert.issueDate}
                  {cert.expiryDate ? ` — ${cert.expiryDate}` : ""}
                </span>
              </div>

              <p className="row-desc mt-1 max-w-[44rem]">{cert.description}</p>
              <p className="meta mt-2">{cert.issuer}</p>
            </>
          );

          const rowClass =
            "group/row focus-ring -mx-3 block rounded-lg px-3 py-3.5 transition-colors hover:bg-[var(--hover)]";

          return (
            <Reveal key={cert.id} as="li" delay={Math.min(index, 6) * 0.05}>
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
    </main>
  );
}
