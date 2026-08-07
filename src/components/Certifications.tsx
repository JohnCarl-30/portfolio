"use client";

import React from "react";
import { motion } from "framer-motion";
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
    },
    {
      id: "8",
      title: "GEN AI TO Z: A Career Summit in an AI-driven World",
      issuer: "Vibe Coders PH · EMC² Fraternity UP",
      issueDate: "Mar 2026",
      description: "Certificate of participation for the career summit focused on AI-driven careers, held at UP Diliman.",
    },
    {
      id: "9",
      title: "Exploring Career Paths in the AI Space",
      issuer: "CISCO · AI Pilipinas · GDG USC",
      issueDate: "Mar 2026",
      description: "Active engagement certificate for acquiring industry-level insights into AI career trajectories and technical demands.",
    }
  ]
}) => {
  const visibleCertifications = showAllByDefault ? certifications : certifications.slice(0, 4);

  return (
    <section id="certifications" className="py-16 sm:py-20 lg:py-24">
      <div className="page-shell">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
          className="section-eyebrow"
        >
          Credentials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="section-title mb-12"
        >
          Certifications.
        </motion.h2>
        
        <motion.div
          className="grid gap-4 md:grid-cols-1 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {visibleCertifications.map((cert) => (
            <motion.a
              key={cert.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.35, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -2 }}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface focus-ring group relative overflow-hidden rounded-xl p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <Award className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 text-base font-semibold tracking-[-0.01em] text-foreground">
                    {cert.title}
                  </h3>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>

                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground/80">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-muted-foreground/70">
                      {cert.issueDate}
                    </span>
                    {cert.expiryDate && (
                      <span className="font-mono text-muted-foreground/70">
                        — {cert.expiryDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {showViewMoreButton && certifications.length > 4 && !showAllByDefault && (
          <div className="relative z-10 mt-8 flex justify-center">
            <a
              href="/certifications"
              aria-label="View all certifications"
              className="card-surface focus-ring rounded-full px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
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
