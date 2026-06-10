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
    id: "alphaexplora",
    name: "Alphaexplora",
    category: "Web",
    desc: "A fintech workflow platform empowering modern fintech teams to scale with confidence through real-time visibility and automated multi-entity control.",
    longDescription: "Alphaexplora is a premium fintech workflow platform designed to build trust from the first scroll. It presents a finance-grade product story with confident positioning, clear pricing paths, and crisp interface sections for compliance-heavy teams.\n\nThe build focuses on fast landing-page performance, responsive presentation, and a polished visual system that feels credible for fintech buyers.",
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
        description: "Monitor fintech operations across multiple entities with live dashboards and instant updates.",
        image: "/projects/alphaexplora.png",
      },
      {
        title: "Automated Multi-Entity Control",
        description: "Streamline workflow management across your entire fintech infrastructure with advanced automation.",
        image: "/projects/alphaexplora.png",
      },
      {
        title: "Enterprise-Grade Security",
        description: "Built with financial-grade security standards to protect sensitive transaction data.",
        image: "/projects/alphaexplora.png",
      }
    ],
    liveDemoUrl: "https://fintech-nine-psi.vercel.app/"
  },
  {
    id: "study-ai",
    name: "StudyAI (autocards.app)",
    category: "Web",
    desc: "An AI-powered study platform that automatically generates flashcards and summaries from study materials to enhance learning efficiency.",
    longDescription: "StudyAI (autocards.app) is an advanced educational platform designed to streamline the learning process. By leveraging AI, it transforms complex study materials, notes, and PDFs into interactive flashcards and concise summaries. The platform features a sophisticated study workspace, OCR capabilities for image-based notes, and personalized study sessions to maximize information retention.",
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
        description: "Automatically transform any text or PDF into structured flashcards using advanced LLMs.",
        image: "/projects/autocards.png",
      },
      {
        title: "Intelligent Study Workspace",
        description: "A centralized hub to manage decks, track progress, and jump back into recent study sessions.",
        image: "/projects/autocards.png",
      },
      {
        title: "OCR Integration",
        description: "Capture handwritten or printed notes and convert them into digital study materials instantly.",
        image: "/projects/autocards.png",
      }
    ],
    liveDemoUrl: "https://autocards.app"
  },
  {
    id: "taskspay",
    name: "TasksPay",
    category: "Web",
    desc: "A blockchain-based task payment platform built on the Stellar network, enabling secure and instant payments for completed tasks using smart contracts.",
    longDescription: "TasksPay is a decentralized task marketplace powered by the Stellar blockchain. It leverages Soroban smart contracts for secure task execution and payment settlement. Users can post tasks, complete assignments, and receive instant payments in stablecoins on the Stellar network. The platform combines modern web frontend with blockchain technology to create a trustless peer-to-peer task economy.",
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
        description: "Leverages the Stellar network for fast, low-cost transactions and cryptocurrency payments.",
        image: "/projects/taskspay.png",
      },
      {
        title: "Smart Contract Execution",
        description: "Uses Soroban smart contracts to ensure secure and automated task completion verification and payment settlement.",
        image: "/projects/taskspay.png",
      },
      {
        title: "Decentralized Task Marketplace",
        description: "A trustless peer-to-peer platform where users can post tasks and earn cryptocurrency upon completion.",
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
    longDescription: "SociaTech is a social learning platform designed to bridge the gap between students and educators. It features real-time collaboration tools, resource sharing, interactive study groups, and Firebase authentication with Google Sign-In for seamless access.",
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
    longDescription: "CiviReport is a civic engagement mobile application designed to bridge the gap between citizens and their local barangay officials. The app provides an intuitive interface for filing complaints, tracking their resolution progress, and sending emergency alerts with automatic location sharing for immediate response.",
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
        description: "Submit new reports directly through the app with an easy-to-use complaint filing system.",
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
