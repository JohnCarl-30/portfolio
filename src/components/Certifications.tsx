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
}

const Certifications: React.FC<CertificationsProps> = ({ 
  certifications = [
    {
      id: "1",
      title: "Full Stack Web Development",
      issuer: "Professional Development Institute",
      issueDate: "2024",
      description: "Comprehensive certification covering modern web development practices, frameworks, and best practices.",
      credentialUrl: "#"
    },
    {
      id: "2",
      title: "Cloud Architecture Fundamentals",
      issuer: "Cloud Technology Academy",
      issueDate: "2023",
      description: "Master cloud architecture principles and deployment strategies.",
      credentialUrl: "#"
    },
    {
      id: "3",
      title: "Advanced TypeScript",
      issuer: "Programming Experts Network",
      issueDate: "2024",
      description: "Deep dive into TypeScript advanced features and type system mastery.",
      credentialUrl: "#"
    }
  ]
}) => {
  return (
    <section id="certifications" className="py-20 px-4 md:px-0">
      <div className="page-shell">
        <h2 className="mb-12 text-4xl font-bold tracking-[-0.02em] text-[var(--foreground)]">
          Certifications
        </h2>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {certifications.map((cert) => (
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
      </div>
    </section>
  );
};

export default Certifications;
