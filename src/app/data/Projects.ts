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
  /** Public source, for work whose evidence is the code rather than a deploy. */
  repoUrl?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "auto-learn",
    name: "auto-learn",
    category: "Web",
    desc: "An ESL writing tool where the explanation is a gate, not a receipt: the better word is withheld until you open the card that teaches it.",
    longDescription: "auto-learn fixes a sentence and teaches the word that fixed it. Typos, spacing, and punctuation are corrected inline and never discussed. Anything that is a real choice \u2014 grammar, word choice, register, wordiness \u2014 is marked but held back: the API drops the replacement from its response and keeps it server-side, so the only way to read the stronger word is to open the card that explains it.\n\nThe withholding is the product, so it is enforced where it cannot be walked around. The field is absent from the payload rather than flagged inside it, which means it is not sitting in the network tab either. Accepting a word banks it, and the next request tells the model which words the writer has already met so it reaches for one they have not.\n\nMost of the work went into knowing whether the model was any good. An eval harness scores both model calls against a committed baseline using deterministic checks and an LLM judge, and the judge was validated against hand-labelled cases before it was trusted \u2014 Cohen\u2019s kappa, not impressions. It paid for itself by catching a prompt change that raised one score while quietly lowering another.",
    url: "/projects/auto-learn.png",
    tech: ["NextJS", "TypeScript", "NestJS", "PostgreSQL", "Redis", "OpenAI API", "ElevenLabs", "Auth.js", "Zod", "WordNet", "Jest", "Vitest", "Playwright"],
    role: "Full-stack Developer",
    timeline: "2026 - Present",
    repoUrl: "https://github.com/JohnCarl-30/auto-learn",
    highlights: [
      "Enforced the gate on the server: the replacement is dropped from the proposal and released only when a card is opened, so it never reaches the browser early.",
      "Validated the LLM judge against hand-labelled cases before trusting it, then held every prompt change to a committed baseline at six runs per case.",
      "Grounded word senses in a local WordNet database rather than a dictionary API, so the part the cards are built on needs no network and no key.",
      "Measured the voice path instead of estimating it \u2014 setting the synthesis output format cut each spoken word from 15,090 bytes to 3,989.",
      "Split tests across three runners by filename to keep an ESM-only AI SDK and a CommonJS API in one repository: 498 tests across the three packages.",
      "Synced the word bank to an account without uploading the writing: the sentence a word was met in has no column on the server and never leaves the browser.",
    ],
    keyFeatures: [
      {
        title: "The Gate",
        description: "Tier-two suggestions arrive as a mark and a teaser. The replacement stays on the server until the reader opens the card that teaches it.",
        image: "",
      },
      {
        title: "Evaluated, Not Assumed",
        description: "Deterministic scorers and a validated LLM judge run both model calls against a committed baseline, so a prompt change has to prove it helped.",
        image: "",
      },
      {
        title: "A Bank That Earns Its Reward",
        description: "Words are banked only when chosen, and the product congratulates reuse rather than attendance \u2014 it fires on evidence the writer used the word again unprompted.",
        image: "",
      }
    ],
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
