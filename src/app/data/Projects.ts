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
  keyFeatures: KeyFeature[];
  liveDemoUrl?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "alphaexplora",
    name: "Alphaexplora",
    category: "Web",
    desc: "A fintech workflow platform empowering modern fintech teams to scale with confidence through real-time visibility and automated multi-entity control.",
    longDescription: "Alphaexplora is a premium fintech workflow platform designed to build trust from the first scroll. It provides financial institutions with comprehensive tools for real-time visibility across multi-entity operations and automated workflow management. The platform prioritizes user experience with smooth interactions and an intuitive interface tailored for finance professionals.",
    url: "",
    tech: [],
    role: "Web Developer",
    timeline: "2024",
    keyFeatures: [
      {
        title: "Real-time Visibility",
        description: "Monitor fintech operations across multiple entities with live dashboards and instant updates.",
        image: "",
      },
      {
        title: "Automated Multi-Entity Control",
        description: "Streamline workflow management across your entire fintech infrastructure with advanced automation.",
        image: "",
      },
      {
        title: "Enterprise-Grade Security",
        description: "Built with financial-grade security standards to protect sensitive transaction data.",
        image: "",
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
    url: "",
    tech: ["React", "JavaScript", "Soroban SDK", "Stellar", "Rust", "TailwindCSS"],
    role: "Full-stack Developer",
    timeline: "2024",
    keyFeatures: [
      {
        title: "Stellar Blockchain Integration",
        description: "Leverages the Stellar network for fast, low-cost transactions and cryptocurrency payments.",
        image: "",
      },
      {
        title: "Smart Contract Execution",
        description: "Uses Soroban smart contracts to ensure secure and automated task completion verification and payment settlement.",
        image: "",
      },
      {
        title: "Decentralized Task Marketplace",
        description: "A trustless peer-to-peer platform where users can post tasks and earn cryptocurrency upon completion.",
        image: "",
      }
    ],
    liveDemoUrl: "https://taskspay.vercel.app/"
  },

];

export const projectsButton: string[] = [
  "All",
  "Web",
  "Mobile",
  "UI/UX"
];
