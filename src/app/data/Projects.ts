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
    url: "/projects/alphaexplora.jpg",
    tech: ["NextJS", "TypeScript", "TailwindCSS", "Framer Motion"],
    role: "Web Developer",
    timeline: "2024",
    keyFeatures: [
      {
        title: "Real-time Visibility",
        description: "Monitor fintech operations across multiple entities with live dashboards and instant updates.",
        image: "/projects/alphaexplora.jpg",
      },
      {
        title: "Automated Multi-Entity Control",
        description: "Streamline workflow management across your entire fintech infrastructure with advanced automation.",
        image: "/projects/alphaexplora.jpg",
      },
      {
        title: "Enterprise-Grade Security",
        description: "Built with financial-grade security standards to protect sensitive transaction data.",
        image: "/projects/alphaexplora.jpg",
      }
    ],
    liveDemoUrl: "https://fintech-nine-psi.vercel.app/#pricing"
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
    id: "sparkle-grove",
    name: "SparkleGrove.com",
    category: "Web",
    desc: "A lifestyle blog featuring DIY crafts, home decor ideas, and inspiration for creating a cozy and stylish living space.",
    longDescription: "SparkleGrove is a comprehensively designed lifestyle blog focusing on DIY content. The project aimed to create a vibrant, cozy digital space where users can find home decor inspiration. Built with a focus on performance and seamless content discovery, the platform features dynamic category filtering and highly optimized image delivery.",
    url: "/projects/image-1.jpg",
    tech: ["Figma", "Photoshop", "HTML"],
    role: "Lead Front-end Developer",
    timeline: "Jan 2024 - Mar 2024",
    keyFeatures: [
      {
        title: "Dynamic Content Delivery",
        description: "Optimized content loading providing instantaneous page transitions and a seamless user experience.",
        image: "/projects/image-1.jpg",
      },
      {
        title: "Responsive Craft Galleries",
        description: "Custom masonry layouts designed specifically for showcasing DIY crafts across all device sizes.",
        image: "/projects/image-2.jpg",
      }
    ],
    liveDemoUrl: "https://example.com"
  },
  {
    id: "tech-trekker",
    name: "TechTrekker.net",
    category: "UI/UX",
    desc: "A technology news and review site covering the latest gadgets, software updates, and trends in the tech industry.",
    longDescription: "TechTrekker provides in-depth technology reviews with a minimalist and futuristic UI. The design system prioritizes readability and high-contrast elements suitable for a tech-savvy audience, ensuring that hardware specs and software comparisons are easy to digest.",
    url: "/projects/image-2.jpg",
    tech: ["Figma", "Photoshop"],
    role: "UI/UX Designer",
    timeline: "Nov 2023 - Jan 2024",
    keyFeatures: [
      {
        title: "Dark Mode Optimized",
        description: "A meticulously crafted dark theme that reduces eye strain during long reading sessions.",
        image: "/projects/image-2.jpg",
      }
    ],
    liveDemoUrl: "https://example.com"
  },
  {
    id: "cozy-nest-homes",
    name: "CozyNestHomes.org",
    category: "Web",
    desc: "A resource for homeowners and renters alike, offering tips on interior design, home improvement projects, and sustainable living practices.",
    longDescription: "CozyNestHomes is an interactive portal for home improvement enthusiasts. It integrates rich media articles with community discussion boards, all wrapped in a warm, inviting design language.",
    url: "/projects/image-3.jpg",
    tech: ["HTML", "CSS", "JavaScript"],
    role: "Fullstack Developer",
    timeline: "Aug 2023 - Nov 2023",
    keyFeatures: [],
  },
  {
    id: "wander-luxe",
    name: "WanderLuxeTravels.co",
    category: "Web",
    desc: "A travel website that provides luxury travel guides, destination reviews, and tips for planning unforgettable vacations.",
    longDescription: "WanderLuxe offers a premium digital experience matching the luxury destinations it features. High-resolution imagery combined with smooth parallax scrolling creates an immersive pre-travel experience for users.",
    url: "/projects/image-4.jpg",
    tech: ["HTML", "CSS", "JavaScript", "TailwindCSS"],
    role: "Front-end Developer",
    timeline: "Jun 2023 - Aug 2023",
    keyFeatures: [],
  },
  {
    id: "byte-boosters",
    name: "ByteBoosters.io",
    category: "Mobile",
    desc: "A tech startup specializing in software development, offering innovative solutions and services for businesses looking to enhance their digital presence.",
    longDescription: "ByteBoosters needed a portfolio app that highlighted their fast-paced, cutting-edge approach to software solutions. The mobile application utilizes native-like gestures and rapid navigation to impress potential enterprise clients.",
    url: "/projects/image-5.jpg",
    tech: ["Figma", "ReactJS", "TailwindCSS", "CSS"],
    role: "Mobile App Developer",
    timeline: "Apr 2023 - Jun 2023",
    keyFeatures: [],
  },
  {
    id: "green-leaf",
    name: "GreenLeafGardens.biz",
    category: "Web",
    desc: "An online store and community hub for gardening enthusiasts, featuring a wide range of plants, gardening tools, and expert advice.",
    longDescription: "An e-commerce platform built for the green-thumbed community. GreenLeaf Gardens features an intricate filtering system for plant types, care difficulty algorithms, and a real-time community forum.",
    url: "/projects/image-6.jpg",
    tech: ["ReactJS", "TailwindCSS", "CSS", "FramerMotion"],
    role: "Lead Engineer",
    timeline: "Feb 2023 - Apr 2023",
    keyFeatures: [],
  },
  {
    id: "pixel-perfect",
    name: "PixelPerfectDesigns.info",
    category: "UI/UX",
    desc: "A graphic design portfolio showcasing the work of a freelance designer, including branding, web design, and illustration projects.",
    longDescription: "A distinct, highly creative portfolio site that breaks grid rules to stand out. It features custom cursor interactions, horizontal scrolling sections, and WebGL elements to captivate potential clients.",
    url: "/projects/image-7.jpg",
    tech: ["NextJS", "FramerMotion"],
    role: "Creative Developer",
    timeline: "Dec 2022 - Feb 2023",
    keyFeatures: [],
  },
  {
    id: "harmony-health",
    name: "HarmonyHealthHub.com",
    category: "Mobile",
    desc: "A wellness website focused on holistic health, offering articles on nutrition, fitness, mental health, and alternative therapies.",
    longDescription: "HarmonyHealthHub is a mobile-first wellness tracking application. It connects users with mental health resources and provides daily actionable health insights with a soothing, accessible design.",
    url: "/projects/image-8.jpg",
    tech: ["NextJS", "ReactJS", "FramerMotion"],
    role: "Frontend Developer",
    timeline: "Oct 2022 - Dec 2022",
    keyFeatures: [],
  },
  {
    id: "stellar-skies",
    name: "StellarSkiesAstronomy.org",
    category: "Web",
    desc: "An educational site dedicated to astronomy, providing resources for amateur astronomers, star maps, and information on celestial events.",
    longDescription: "StellarSkies uses complex ThreeJS visualizations to render real-time star maps in the browser. The educational platform allows users to explore constellations with interactive 3D models and augmented reality features.",
    url: "/projects/image-9.jpg",
    tech: ["ReactJS", "JavaScript", "ThreeJS"],
    role: "3D Web Developer",
    timeline: "Aug 2022 - Oct 2022",
    keyFeatures: [],
  },
  {
    id: "urban-eats",
    name: "UrbanEatsDelights.com",
    category: "Mobile",
    desc: "A food and dining guide covering the best urban restaurants, street food, and culinary experiences around the world.",
    longDescription: "UrbanEats acts as a local culinary compass. The mobile progressive web app utilizes geolocation APIs to suggest nearby high-rated street food vendors, presented in a mouth-watering, image-forward interface.",
    url: "/projects/image-10.jpg",
    tech: ["NextJS", "ThreeJS"],
    role: "Mobile/Web Engineer",
    timeline: "Jun 2022 - Aug 2022",
    keyFeatures: [],
  },
];

export const projectsButton: string[] = [
  "All",
  "Web",
  "Mobile",
  "UI/UX"
];
