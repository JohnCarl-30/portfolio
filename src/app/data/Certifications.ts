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

export const certifications: Certification[] = [
  {
    id: "oracle-genai",
    title: "OCI 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    issueDate: "Oct 2025",
    expiryDate: "Oct 2027",
    description:
      "Professional certification covering OCI Generative AI services, LLM concepts, and RAG-based application design.",
    credentialUrl:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=8C65A309492DCFF0D7D5DF965715BA394BFEFA0DD13C8C16CB9AF5B121FCEDC1",
  },
  {
    id: "mongodb-rag",
    title: "Building RAG Apps Using MongoDB",
    issuer: "MongoDB",
    issueDate: "Sep 2025",
    description:
      "Validates skills in building Retrieval-Augmented Generation applications using MongoDB vector search workflows.",
    credentialUrl:
      "https://www.credly.com/badges/8d3ca020-cdee-4060-9561-947a52902865/linked_in_profile",
  },
  {
    id: "claude-code",
    title: "Claude Code in Action",
    issuer: "Anthropic Education",
    issueDate: "Mar 2026",
    description:
      "Demonstrates applied proficiency using Claude Code workflows for real-world development tasks.",
    credentialUrl: "https://verify.skilljar.com/c/grtqqw6cmtvp",
  },
  {
    id: "aws-ai-practitioner",
    title: "AWS AI Practitioner Challenge",
    issuer: "Udacity",
    issueDate: "Mar 2026",
    description:
      "Verified course completion focused on practical AI fundamentals and AWS-oriented practitioner knowledge.",
    credentialUrl:
      "https://www.udacity.com/certificate/e/11e1ed62-2c16-11f1-9f1c-ab3f0e6eec2a",
  },
  {
    id: "aws-networking",
    title: "AWS Educate: Getting Started with Networking",
    issuer: "Amazon Web Services",
    issueDate: "Oct 2025",
    description:
      "Confirms foundational networking knowledge including AWS VPC concepts and core network management patterns.",
    credentialUrl:
      "https://www.credly.com/badges/2fed5e8f-f7f8-49aa-a950-aa85359098b1",
  },
  {
    id: "testdome-python",
    title: "Python Certificate",
    issuer: "TestDome",
    issueDate: "Mar 2026",
    description:
      "Public Python certification with top 25% ranking based on a practical work-sample assessment.",
    credentialUrl:
      "https://www.testdome.com/certificates/3648b0a32b3043d29b6affdf3a45c8e3",
  },
  {
    id: "databricks",
    title: "Databricks Credential",
    issuer: "Databricks",
    issueDate: "2026",
    description: "Verified Databricks credential published through Databricks Credentials.",
    credentialUrl:
      "https://credentials.databricks.com/5e635c80-e18d-4450-98e0-a67e3aa3d4ff",
  },
  {
    id: "gen-ai-to-z",
    title: "GEN AI TO Z: A Career Summit in an AI-driven World",
    issuer: "Vibe Coders PH · EMC² Fraternity UP",
    issueDate: "Mar 2026",
    description:
      "Certificate of participation for the career summit on AI-driven careers, held at UP Diliman.",
  },
  {
    id: "ai-career-paths",
    title: "Exploring Career Paths in the AI Space",
    issuer: "CISCO · AI Pilipinas · GDG USC",
    issueDate: "Mar 2026",
    description:
      "Active engagement certificate for industry-level insights into AI career trajectories and technical demands.",
  },
];
