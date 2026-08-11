export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type ExperienceItem = {
  id: string;
  role: string;
  org: string;
  period: string;
  summary: string;
  href?: string;
  kind: "work" | "education" | "note";
};

export const profile = {
  name: "John Carl Santos",
  role: "AI Full Stack Engineer",
  location: "Philippines",
  email: "johncarlsantos30@gmail.com",
  resumeHref: "/JohnCarl_Santoss_Resume%20(2).pdf",
  photo: "/img/pic2.jpeg",
  availability: "open to remote roles",
};

export const socials: SocialLink[] = [
  { label: "github", href: "https://github.com/JohnCarl-30", handle: "JohnCarl-30" },
  { label: "linkedin", href: "https://linkedin.com/in/santosjohncarl", handle: "santosjohncarl" },
  { label: "x", href: "https://x.com/dyeyyyccc", handle: "dyeyyyccc" },
  { label: "instagram", href: "https://instagram.com/santosjohncarl", handle: "santosjohncarl" },
  { label: "facebook", href: "https://facebook.com/santosjohncarl", handle: "santosjohncarl" },
];

/**
 * Inline glossary entries for the intro paragraph. Each key is a phrase that
 * gets a hover preview instead of a link, so the prose stays uninterrupted.
 */
export const introGlossary: Record<string, { title: string; body: string }> = {
  "RAG pipelines": {
    title: "RAG pipelines",
    body: "Parsing, chunking, embedding, retrieval, and the evaluation set that tells you whether any of it actually helped.",
  },
  "LLM evaluation": {
    title: "LLM evaluation",
    body: "Small, real, hand-checked test sets beat endless prompt rewriting. I build the harness before I tune the prompt.",
  },
  "full-stack products": {
    title: "Full-stack products",
    body: "Next.js and TypeScript on the surface, Python and Postgres underneath, containers and queues where the work gets heavy.",
  },
};

export const experience: ExperienceItem[] = [
  {
    id: "sofi",
    role: "AI Engineer",
    org: "SOFI AI Tech Solutions",
    period: "Present",
    summary:
      "Curating training datasets, defining annotation standards, and building evaluation sets for LLM and machine learning systems.",
    kind: "work",
  },
  {
    id: "flyrank",
    role: "Backend Engineer Intern",
    org: "FlyRank AI",
    period: "2 months",
    summary:
      "Built a RAG pipeline with vector search and LLM APIs, added JWT authorization, and containerized a multi-service backend.",
    kind: "work",
  },
  {
    id: "alphaexplora-role",
    role: "Software Engineering Intern",
    org: "Alphaexplora",
    period: "3 months",
    summary:
      "Developed RESTful APIs, delivered backend features, and optimized application performance in an agile environment.",
    kind: "work",
  },
  {
    id: "pytorch",
    role: "PyTorch Data Scientist",
    org: "Campus Student Program",
    period: "Ongoing",
    summary:
      "Building and evaluating deep learning models for classification and regression with PyTorch.",
    kind: "work",
  },
  {
    id: "pcu",
    role: "BS Computer Science",
    org: "Philippine Christian University",
    period: "2023 — 2027",
    summary:
      "Consistent Dean's Lister with a 1.15 GWA. Coursework across software engineering, algorithms, linear algebra, and AWS cloud computing.",
    kind: "education",
  },
];

export const stack: { group: string; items: string[] }[] = [
  {
    group: "ai",
    items: ["Python", "PyTorch", "TensorFlow", "LangChain", "LangGraph", "pgvector", "OpenAI API"],
  },
  {
    group: "web",
    items: ["TypeScript", "Next.js", "React", "TailwindCSS", "Framer Motion", "Vite"],
  },
  {
    group: "backend",
    items: ["FastAPI", "Node.js", "PostgreSQL", "MongoDB", "Supabase", "Redis", "Celery"],
  },
  {
    group: "infra",
    items: ["Docker", "AWS", "Vercel", "Digital Ocean", "Git", "Postman"],
  },
];
