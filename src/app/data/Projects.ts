export interface KeyFeature {
  title: string;
  description: string;
  image: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: "Web" | "Mobile" | "UI/UX" | "None";
  desc: string;
  url: string;
  tech: string[];
  role: string;
  timeline: string;
  longDescription: string;
  highlights?: string[];
  keyFeatures: KeyFeature[];
  liveDemoUrl?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "ccdv-f-study-lab",
    name: "CCDV-F Study Lab",
    category: "Web",
    desc: "A study site for Anthropic's Claude Certified Developer exam, with practice questions checked against the official docs and tests scored by exam objective.",
    longDescription: "CCDV-F Study Lab is how I'm preparing for Anthropic's Claude Certified Developer – Foundations exam. Its bank holds 313 practice questions, each written from a page of Anthropic's docs and stored with the exact quote that backs the answer. A weekly GitHub Actions job fetches every source page and fails if a quote is gone, so questions don't go stale as the docs change.\n\nThe public site is a static Next.js export on GitHub Pages: knowledge checks, a 53-question mock exam weighted like the real one, custom tests scored by the exam's 25 objectives, a mistakes deck and a study plan, with progress kept in the browser. Run locally, the same codebase is a playground where Claude Code works on sample projects through the Claude Agent SDK, with 27 challenges checked automatically.",
    url: "/projects/ccdv-f-study-lab.png",
    tech: ["NextJS", "TypeScript", "Claude Agent SDK", "TailwindCSS", "Supabase", "GitHub Actions", "Jest"],
    role: "Full-stack Developer",
    timeline: "2026 - Present",
    highlights: [
      "Wrote a 313-question bank where every answer carries a quote from the official docs, re-checked weekly in CI.",
      "Built mock exams and custom tests that spread questions across the exam's 25 objectives and score each one, like the real score report.",
      "Published the study track as a static export with every API route left out of the build, redeployed to GitHub Pages on each push.",
      "Added optional GitHub sign-in that syncs progress through Supabase, with row-level security limiting each user to their own row.",
      "Covered the app with 720 Jest tests, including a local practice Claude API so the coding challenges run without an API key.",
    ],
    keyFeatures: [
      {
        title: "Objective-Scored Practice Tests",
        description: "Pick a length and the objectives to cover; results show percent correct per objective, with weak ones flagged.",
        image: "/projects/ccdv-f-study-lab.png",
      },
      {
        title: "Doc-Checked Question Bank",
        description: "Every question links to its source page and stores the quote behind its answer; a weekly job checks each quote is still there.",
        image: "/projects/ccdv-f-study-lab.png",
      },
      {
        title: "Agent Playground",
        description: "Locally, Claude Code edits a sample project through the Agent SDK while each tool call, permission prompt and message shows up live.",
        image: "/projects/ccdv-f-study-lab.png",
      }
    ],
    liveDemoUrl: "https://johncarl-30.github.io/claude-code-playground/"
  },
  {
    id: "resumae",
    name: "Resumae",
    category: "Web",
    desc: "An AI-powered resume analyzer and builder that compares resumes with job postings and pinpoints missing keywords, weak bullets, and hard-to-scan layouts.",
    longDescription: "Resumae helps job seekers tailor their resumes to the roles they want. It compares a resume with a target job posting and returns focused, line-by-line feedback on missing language, bullet impact, and readability so users know exactly what to improve.\n\nThe platform also includes a clean resume builder that works without signing in, keeping drafts in the browser until the user chooses to save them.",
    url: "/projects/resumae.png",
    tech: ["NextJS", "TypeScript", "TailwindCSS", "Clerk", "AI Integration", "Vercel"],
    role: "Full-stack Developer",
    timeline: "2026 - Present",
    highlights: [
      "Built job-post-aligned resume analysis with actionable, line-level feedback.",
      "Created focused checks for missing keywords, bullet strength, and six-second scan readability.",
      "Added a no-sign-in resume builder with browser-based draft persistence.",
    ],
    keyFeatures: [
      {
        title: "Job-Aligned Analysis",
        description: "Compare a resume directly with a target job post to uncover missing keywords and gaps in positioning.",
        image: "/projects/resumae.png",
      },
      {
        title: "Actionable Resume Feedback",
        description: "Get focused notes on bullet strength, measurable outcomes, layout, and six-second scan readability.",
        image: "/projects/resumae.png",
      },
      {
        title: "No-Sign-In Resume Builder",
        description: "Create a clean resume immediately, with drafts kept in the browser until the user chooses to save one.",
        image: "/projects/resumae.png",
      }
    ],
    liveDemoUrl: "https://resumae.tech"
  },
  {
    id: "alphaexplora",
    name: "Alphaexplora",
    category: "Web",
    desc: "A fintech workflow platform for teams that run several legal entities, with live dashboards and automated controls.",
    longDescription: "Alphaexplora is a workflow platform for fintech teams that manage several legal entities at once. The site walks through the product, pricing paths, and interface sections that compliance-heavy teams ask about.\n\nThe build itself came down to fast landing-page loads, layouts that hold up on any screen, and a visual system consistent enough for a finance buyer to take seriously.",
    url: "/projects/alphaexplora.png",
    tech: ["NextJS", "TypeScript", "TailwindCSS", "Framer Motion", "Vercel"],
    role: "Web Developer",
    timeline: "2024",
    highlights: [
      "Designed a fintech landing experience with enterprise-oriented messaging and conversion paths.",
      "Built responsive sections for features, pricing, testimonials, and beta sign-up flows.",
      "Used motion and visual hierarchy to make a trust-heavy product feel fast and modern.",
    ],
    keyFeatures: [
      {
        title: "Real-time Visibility",
        description: "Live dashboards show operations across every entity as they happen.",
        image: "/projects/alphaexplora.png",
      },
      {
        title: "Automated Multi-Entity Control",
        description: "Automation rules handle repeated workflow steps across entities.",
        image: "/projects/alphaexplora.png",
      },
      {
        title: "Enterprise-Grade Security",
        description: "Transaction data sits behind role-based access and audit logging.",
        image: "/projects/alphaexplora.png",
      }
    ],
    liveDemoUrl: "https://fintech-nine-psi.vercel.app/"
  },
  {
    id: "study-ai",
    name: "StudyAI (autocards.app)",
    category: "Web",
    desc: "A study platform that turns notes and PDFs into flashcards and summaries.",
    longDescription: "StudyAI (autocards.app) turns study materials into flashcards and short summaries. Upload notes or a PDF and an LLM splits the content into question-and-answer cards; photos of handwritten notes go through OCR first.\n\nA study workspace keeps decks, progress, and recent sessions in one place, and study sessions adapt to which cards a user keeps missing.",
    url: "/projects/autocards.png",
    tech: ["NextJS", "TypeScript", "OpenAI API", "TailwindCSS", "Framer Motion", "Supabase", "Docker", "Digital Ocean", "Redis", "Celery", "pgvector"],
    role: "Lead Developer",
    timeline: "2024 - Present",
    highlights: [
      "Built the AI generation workflow for turning notes and PDFs into flashcards and summaries.",
      "Designed asynchronous processing with Redis and Celery for heavier document jobs.",
      "Integrated Supabase and pgvector to support searchable study content and user workspaces.",
    ],
    keyFeatures: [
      {
        title: "AI Flashcard Generation",
        description: "An LLM splits any text or PDF into structured question-and-answer cards.",
        image: "/projects/autocards.png",
      },
      {
        title: "Intelligent Study Workspace",
        description: "A centralized hub to manage decks, track progress, and jump back into recent study sessions.",
        image: "/projects/autocards.png",
      },
      {
        title: "OCR Integration",
        description: "Photograph handwritten or printed notes and OCR turns them into study material.",
        image: "/projects/autocards.png",
      }
    ],
    liveDemoUrl: "https://autocards.app"
  },
  {
    id: "taskspay",
    name: "TasksPay",
    category: "Web",
    desc: "A task marketplace on the Stellar network where finished tasks pay out instantly in stablecoins.",
    longDescription: "TasksPay is a task marketplace on Stellar. A Soroban smart contract holds the payment while a task is open and releases it once the work is verified, so poster and worker never have to trust each other.\n\nUsers post tasks, pick up someone else's, and get paid in stablecoins the moment the contract settles.",
    url: "/projects/taskspay.png",
    tech: ["React", "JavaScript", "Soroban SDK", "Stellar", "Rust", "TailwindCSS"],
    role: "Full-stack Developer",
    timeline: "2024",
    highlights: [
      "Built a wallet-connected escrow interface for creating and tracking milestone-based tasks.",
      "Integrated Stellar and Soroban concepts into a web workflow for automated settlement.",
      "Designed a focused product interface around trust, payment status, and task progress.",
    ],
    keyFeatures: [
      {
        title: "Stellar Blockchain Integration",
        description: "Payments run over the Stellar network, so transactions settle in seconds for fractions of a cent.",
        image: "/projects/taskspay.png",
      },
      {
        title: "Smart Contract Execution",
        description: "Soroban smart contracts verify task completion and settle payment without a middleman.",
        image: "/projects/taskspay.png",
      },
      {
        title: "Decentralized Task Marketplace",
        description: "Post a task, or finish someone else's and earn cryptocurrency.",
        image: "/projects/taskspay.png",
      }
    ],
    liveDemoUrl: "https://taskspay.vercel.app/"
  },
  {
    id: "sociatech",
    name: "SociaTech",
    category: "Web",
    desc: "A social learning platform connecting students and educators with real-time collaboration tools, resource sharing, and interactive study groups.",
    longDescription: "SociaTech is a social learning platform where students and educators share resources, run study groups, and collaborate in real time. Sign-in works with email and password or Google, backed by Firebase.",
    url: "",
    tech: ["React", "PHP", "Firebase", "XAMPP", "phpMyAdmin"],
    role: "Project Lead & Backend Developer",
    timeline: "2024",
    highlights: [
      "Led the build across authentication, content workflows, and student collaboration features.",
      "Implemented Firebase sign-in and backend API endpoints for user and content management.",
      "Coordinated frontend and backend decisions for a practical classroom collaboration tool.",
    ],
    keyFeatures: [
      {
        title: "Firebase Authentication",
        description: "Secure sign-in with email/password and Google OAuth integration.",
        image: "",
      },
      {
        title: "Real-time Collaboration",
        description: "Interactive study groups and live resource sharing between students.",
        image: "",
      },
      {
        title: "REST API Backend",
        description: "Scalable backend with JWT-secured endpoints for user and content management.",
        image: "",
      }
    ],
  },
  {
    id: "civireport",
    name: "CiviReport",
    category: "Mobile",
    desc: "A barangay issue tracking mobile app that enables citizens to file complaints, track their status, and send emergency alerts to local officials.",
    longDescription: "CiviReport is a mobile app for barangay governance. Residents file complaints, follow the status as officials act on them, and send emergency alerts that attach their location automatically.",
    url: "",
    tech: ["Java", "FastAPI", "Firebase"],
    role: "Mobile Developer",
    timeline: "2025",
    highlights: [
      "Built mobile complaint filing flows for citizens to report barangay concerns.",
      "Connected report tracking to backend services for status visibility.",
      "Added emergency reporting patterns with location-aware response context.",
    ],
    keyFeatures: [
      {
        title: "File a Complaint",
        description: "File a complaint from the app in a few taps.",
        image: "",
      },
      {
        title: "Check Complaint Status",
        description: "Track the progress of filed complaints in real-time with status updates.",
        image: "",
      },
      {
        title: "Emergency Report",
        description: "Send urgent alerts to barangay officials with automatic location and report details included.",
        image: "",
      }
    ],
  },

];

export const projectsButton: string[] = [
  "All",
  "Web",
  "Mobile",
  "UI/UX"
];
