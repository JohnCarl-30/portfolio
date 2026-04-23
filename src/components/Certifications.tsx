import React from "react";
import { Award } from "lucide-react";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description: string;
}

interface CertificationsProps {
  certifications?: Certification[];
  showAllByDefault?: boolean;
  showViewMoreButton?: boolean;
}

const Certifications: React.FC<CertificationsProps> = ({ 
  showAllByDefault = false,
  showViewMoreButton = true,
  certifications = [
    {
      id: "1",
      title: "Building RAG Apps Using MongoDB",
      issuer: "MongoDB (via Credly)",
      issueDate: "Sep 2025",
      description: "Validates skills in building Retrieval-Augmented Generation applications using MongoDB vector search workflows.",
      credentialUrl: "https://www.credly.com/badges/8d3ca020-cdee-4060-9561-947a52902865/linked_in_profile"
    },
    {
      id: "2",
      title: "AWS AI Practitioner Challenge",
      issuer: "Udacity",
      issueDate: "Mar 2026",
      description: "Verified course completion focused on practical AI fundamentals and AWS-oriented practitioner knowledge.",
      credentialUrl: "https://www.udacity.com/certificate/e/11e1ed62-2c16-11f1-9f1c-ab3f0e6eec2a"
    },
    {
      id: "3",
      title: "Claude Code in Action",
      issuer: "Anthropic Education (via Skilljar)",
      issueDate: "Mar 2026",
      description: "Demonstrates applied proficiency using Claude Code workflows for real-world development tasks.",
      credentialUrl: "https://verify.skilljar.com/c/grtqqw6cmtvp"
    },
    {
      id: "4",
      title: "AWS Educate Getting Started with Networking",
      issuer: "Amazon Web Services Training and Certification (via Credly)",
      issueDate: "Oct 2025",
      description: "Confirms foundational networking knowledge including AWS VPC concepts and core network management patterns.",
      credentialUrl: "https://www.credly.com/badges/2fed5e8f-f7f8-49aa-a950-aa85359098b1"
    },
    {
      id: "5",
      title: "Python Certificate",
      issuer: "TestDome",
      issueDate: "Mar 2026",
      description: "Public Python certification with top 25% ranking based on practical work-sample style assessment.",
      credentialUrl: "https://www.testdome.com/certificates/3648b0a32b3043d29b6affdf3a45c8e3"
    },
    {
      id: "6",
      title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      issuer: "Oracle",
      issueDate: "Oct 2025",
      expiryDate: "Oct 2027",
      description: "Professional certification covering OCI Generative AI services, LLM concepts, and RAG-based application design.",
      credentialUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=8C65A309492DCFF0D7D5DF965715BA394BFEFA0DD13C8C16CB9AF5B121FCEDC1"
    },
    {
      id: "7",
      title: "Databricks Credential",
      issuer: "Databricks",
      issueDate: "2026",
      description: "Verified Databricks credential published through Databricks Credentials.",
      credentialUrl: "https://credentials.databricks.com/5e635c80-e18d-4450-98e0-a67e3aa3d4ff"
    }
  ]
}) => {
  const visibleCertifications = showAllByDefault ? certifications : certifications.slice(0, 4);

  return (
    <section id="certifications" className="py-20 px-4 md:px-0">
      <div className="page-shell">
        <h2 className="mb-12 text-4xl font-bold tracking-[-0.02em] text-[var(--foreground)]">
          Certifications
        </h2>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {visibleCertifications.map((cert) => (
            <div
              key={cert.id}
              className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-all hover:border-[var(--border-hover)] hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                  <Award className="h-6 w-6 text-blue-500" />
                </div>
                
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-semibold text-[var(--foreground)]">
                    {cert.title}
                  </h3>
                  <p className="mb-3 text-sm text-[var(--muted-foreground)]">
                    {cert.issuer}
                  </p>
                  
                  <p className="mb-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {cert.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-500">
                      {cert.issueDate}
                    </span>
                    {cert.expiryDate && (
                      <span className="rounded-full bg-orange-500/10 px-3 py-1 text-orange-500">
                        Expires: {cert.expiryDate}
                      </span>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-500 transition-colors hover:bg-emerald-500/20"
                      >
                        View Credential →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showViewMoreButton && certifications.length > 4 && !showAllByDefault && (
          <div className="relative z-10 mt-8 flex justify-center">
            <a
              href="/certifications"
              aria-label="View all certifications"
              className="rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-5 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--border-hover)]"
            >
              View more certs
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
